from django.urls import path

from .api_views import api_list_shoes, api_show_shoe

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),
]



    # path("locations/", api_locations, name="api_locations"),
    # path("locations/<int:pk>/", api_location, name="api_location"),
    # path("bins/", api_bins, name="api_bins"),
    # path("bins/<int:pk>/", api_bin, name="api_bin"),
