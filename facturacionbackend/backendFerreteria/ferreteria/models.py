# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Categoria(models.Model):
    idcategoria = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=245, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categoria'


class Cliente(models.Model):
    idcliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    apellido = models.CharField(max_length=45, blank=True, null=True)
    ruc = models.CharField(max_length=45, blank=True, null=True)
    telefono = models.CharField(max_length=45, blank=True, null=True)
    direccion = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cliente'


class Compras(models.Model):
    idcompras = models.AutoField(primary_key=True)
    numerofactura = models.CharField(max_length=45, blank=True, null=True)
    fechacompra = models.DateField(blank=True, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=0)
    estado = models.IntegerField()
    proveedor_idproveedor = models.ForeignKey('Proveedor', models.DO_NOTHING, db_column='proveedor_idproveedor')
    saldo = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    nombreproveedor = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'compras'
        unique_together = (('idcompras', 'proveedor_idproveedor'),)


class DetalleVenta(models.Model):
    ventas_idventas = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='ventas_idventas')
    producto_idproducto = models.ForeignKey('Producto', models.DO_NOTHING, db_column='producto_idproducto')
    cantidad = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    iva5 = models.DecimalField(db_column='IVA5', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    iva10 = models.DecimalField(db_column='IVA10', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    precioventa = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'detalle_venta'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Pagos(models.Model):
    idpagos = models.AutoField(primary_key=True)
    montopago = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    fechapago = models.DateField(blank=True, null=True)
    numerofactura = models.CharField(max_length=45, blank=True, null=True)
    compras_idcompras = models.ForeignKey(Compras, models.DO_NOTHING, db_column='compras_idcompras')
    nombreproveedor = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pagos'
        unique_together = (('idpagos', 'compras_idcompras'),)


class Producto(models.Model):
    idproducto = models.AutoField(primary_key=True)
    codigobarra = models.CharField(db_column='codigoBarra', unique=True, max_length=250)  # Field name made lowercase.
    preciocompra = models.DecimalField(db_column='precioCompra', max_digits=10, decimal_places=2)  # Field name made lowercase.
    precioventa = models.DecimalField(db_column='PrecioVenta', max_digits=10, decimal_places=2)  # Field name made lowercase.
    stock = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    descripcion = models.CharField(max_length=45)
    categoria_idcategoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='categoria_idcategoria')
    proveedor_idproveedor = models.ForeignKey('Proveedor', models.DO_NOTHING, db_column='proveedor_idproveedor')
    unidad_de_medida_idunidadmedida = models.ForeignKey('UnidadDeMedida', models.DO_NOTHING, db_column='unidad_de_medida_idunidadMedida')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'producto'
        unique_together = (('idproducto', 'categoria_idcategoria', 'proveedor_idproveedor', 'unidad_de_medida_idunidadmedida'),)


class Proveedor(models.Model):
    idproveedor = models.AutoField(primary_key=True)
    nombre = models.CharField(db_column='Nombre', max_length=245, blank=True, null=True)  # Field name made lowercase.
    telefono = models.CharField(max_length=45, blank=True, null=True)
    ruc = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'proveedor'


class UnidadDeMedida(models.Model):
    idunidadmedida = models.AutoField(db_column='idunidadMedida', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'unidad_de_medida'


class Usuarios(models.Model):
    idusuarios = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=45, blank=True, null=True)
    correo = models.CharField(max_length=45, blank=True, null=True)
    nombre = models.CharField(max_length=45, blank=True, null=True)
    apellido = models.CharField(max_length=45, blank=True, null=True)
    numeroci = models.CharField(max_length=45, blank=True, null=True)
    passwd = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'


class Ventas(models.Model):
    idventas = models.AutoField(primary_key=True)
    numerofactura = models.CharField(max_length=45, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    cliente_idcliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='cliente_idcliente')
    totaliva5 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    totaliva10 = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ventas'
        unique_together = (('idventas', 'cliente_idcliente'),)
