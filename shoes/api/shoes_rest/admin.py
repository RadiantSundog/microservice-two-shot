from django.contrib import admin
from .models import Shoe, BinVO
# Register your models here.


@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "bin",
    )

@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    list_display = (
        "import_href",
        "closet_name",
        "id",
    )
