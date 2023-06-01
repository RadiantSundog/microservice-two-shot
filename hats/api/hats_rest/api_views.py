import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Hat, LocationVO



class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
    ]

    def get_extra_data(self, o):
        return {"location": o.location.name}


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
def api_list_hats(request, location_vo_id=None):

    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
            )


    else:
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
        try:
            hat_href = content["location"]
            location = LocationVO.objects.get(import_href=hat_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

def api_show_hat(request, pk):

    hat = Hat.objects.get(id=pk)
    return JsonResponse(
        hat,
        encoder=HatDetailEncoder,
        safe=False,
    )
