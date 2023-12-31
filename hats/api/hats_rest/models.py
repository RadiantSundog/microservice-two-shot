from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    closet_name = models.CharField(max_length=200)
    import_href = models.CharField(max_length=100, unique=True)



class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200)
    import_href = models.CharField(max_length=100, unique=True)




class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=200)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )
# def __str__(self):
#         return self.name

# def get_api_url(self):
#     return reverse("api_show_hat", kwargs={"pk": self.pk})
