from django.urls import path
from api.views import pay_views as views


urlpatterns = [
    path('', views.initKhalti, name='initKhalti'),
]