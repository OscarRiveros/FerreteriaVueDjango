from rest_framework import serializers
from ferreteria.models import Categoria, UnidadDeMedida, Proveedor, Producto, Cliente, Ventas, DetalleVenta, Compras, Pagos

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"

class UnidadMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadDeMedida
        fields = "__all__"

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = "__all__"

class ProductoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = "__all__"

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields= "__all__"

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = "__all__"

class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = "__all__"

class ComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compras
        fields= "__all__"

class PagosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagos
        fields= "__all__"