from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from rest_framework.decorators import api_view, action
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.db.transaction import atomic

from ferreteria.models import Categoria, UnidadDeMedida, Proveedor, Producto, Cliente, Ventas, DetalleVenta, Compras, Pagos
from ferreteria.serializers import CategoriaSerializer, UnidadMedidaSerializer, ProveedorSerializer, ProductoSerilizer, ClienteSerializer, ComprasSerializer, PagosSerializer, VentasSerializer, DetalleVentaSerializer
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

class ComprasViewSet(viewsets.ModelViewSet):
    queryset = Compras.objects.all()
    serializer_class = ComprasSerializer

class PagosViwewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.all()
    serializer_class = PagosSerializer

@method_decorator(atomic, name='dispatch')
class Vista_Ventas(APIView):    
    def post(self, request):
        cabecera = VentasSerializer(data=request.data['cabecera'])
        detalle = request.data['detalle']
                
        try:    
            if cabecera.is_valid():
                cabecera.save()
                for i in detalle:
                    if i['descripcion'] and i['SubTotal']:
                        i.pop('descripcion')
                        i.pop('SubTotal')
                        
                    i['ventas_idventas'] = Ventas.objects.last().idventas
                    Vista_Ventas.put(i, request)
                    detalleSerializer = DetalleVentaSerializer(data=i)
                    if detalleSerializer.is_valid():
                        detalleSerializer.save()
                    print(detalleSerializer.errors)
                
                return JsonResponse(detalleSerializer.data ,status=status.HTTP_201_CREATED)
            return JsonResponse(cabecera.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
                print('Rollback: ', e)
                return JsonResponse(cabecera.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(venta, request):
        request.method = 'PUT'
        producto = Producto.objects.get(pk=venta['producto_idproducto'])
        print(producto.stock, "-", venta['cantidad'])
        producto.stock = float(producto.stock) - float(venta['cantidad'])
        print(producto.stock)
        try:
            producto.save()
        except Exception as e:
            print("Error: ", e)
        # return JsonResponse(productoSerializer.errors, status=status.HTTP_400_BAD_REQUEST)