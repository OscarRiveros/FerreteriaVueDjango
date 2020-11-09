from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from ferreteria.models import Categoria, UnidadDeMedida, Proveedor, Producto, Cliente, Ventas, DetalleVenta, Compras, Pagos
from ferreteria.serializers import CategoriaSerializer, UnidadMedidaSerializer, ProveedorSerializer, ProductoSerilizer, ClienteSerializer, VentasSerializer, DetalleVentaSerializer, ComprasSerializer, PagosSerializer
from rest_framework import viewsets, permissions


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer
    print(serializer_class.data)

class UnidadMedidaViewSet(viewsets.ModelViewSet):
    queryset = UnidadDeMedida.objects.all()
    serializer_class = UnidadMedidaSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerilizer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class VentasViewSet(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = DetalleVentaSerializer

class ComprasViewSet(viewsets.ModelViewSet):
    queryset = Compras.objects.all()
    serializer_class = ComprasSerializer

class PagosViwewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.all()
    serializer_class = PagosSerializer