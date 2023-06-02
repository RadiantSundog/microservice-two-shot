import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Hat, LocationVO



class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "id",
        "color",
        "fabric",
        "location",



    ]
    encoders = {
        "closet_name": LocationVODetailEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "closet_name": o.location.closet_name,
            "location": o.location.import_href,
            }



class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",

    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }

    # def get_extra_data(self, o):
    #     count = AccountVO.objects.filter(email=o.email).count()
    #     return {"has_account": count > 0}


@require_http_methods(["GET", "POST"])
def api_list_hats(request):


    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False,
    )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_hat(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            hat = Hat.objects.get(id=pk)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatListEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            hat = Hat.objects.get(id=pk)
            props = [
                "fabric",
                "style_name",
                "color",
                "picture_url",
                "location",
            ]
            for prop in props:
                if prop in content:
                    setattr(hat, prop, content[prop])
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
