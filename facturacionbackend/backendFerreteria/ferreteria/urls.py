from django.conf.urls import url
from ferreteria import views

urlpatterns = [
    url(r'^ventas', views.Vista_Ventas.as_view()),
]