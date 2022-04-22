# BackendPanaderia

Este proyecto debe ser descargado y ejecutado localmente de la siguiente manera:

1. Clonar el repositorio en la branch master
2. Abrir la carpeta eitek-backend en la terminal
3. Ejecutar el comando npm i, de esta manera se instala todas las dependencias necesarias
4. Escribir en la terminal npm run dev, de esta manera se ejecuta el servidor en el puerto 3000, se usa nodemon para evitar reiniciar el servidor.

## Base de Datos 

Se utilizó Postgres para lo cual dentro del proyecto existe una carpeta llamada BaseDatos, dentro esta un backup de dicha base.
1. Crear una base en Postgres con el nombre "Backend"
2. Hacer un restore a la base del archivo que esta dentro de la carpeta BaseDatos con usuario postgres.
3. En la ruta del proyecto src/controllers/index.controller en la linea 8 cambiar la contraseña por la propia de su base de datos.

## Consumo de Rutas

Dentro de este proyecto existe un documento en Word indicando formatos y estructuras a consumir.

## Solución 

Se planteó un esquema comprendido de 9 tablas teniendo:
* Cajas
* DetallePedido
* Pedidos
* Direccion
* Persona
* DirecPers
* ImgProd
* Rol
* RolPersona

Personas se relaciona con Rol por medio de la tabla RolPersona, teniendo aqui los 3 tipos de usuario (Administrador, Cliente, Delivery).
Personas se relaciona con Direccion por medio de la tabla DirecPers, generando que una persona tenga varias direcciones.
Cajas se relaciona con ImgProd generando que una caja de productos pueda tener varias imagenes relacionadas.
Pedidos se relaciona con Persona y con DetallePedido, generando una cabecera con informacion global del pedido y teniendo un detalle del mismo a manera de hacer que un pedido puede tener varios productos.

Los servicios web permiten generar desde la base nuevos Roles, Pedidos, Cajas, Listar Pedidos, Cajas, Usuarios, etc.

Cuando el Delivery revisa los pedidos se habilitó un servicio que actualiza el estado del mismo de 'Pendiente' a 'Enviado'y así tener un mejor control de esta parte.

## Arquitectura

Se utilizó Node js con Express para el manejo de los webservices, se genero un enrutamiento de los mismos dentro de la casrpeta routes, el proceso de este enrutamiento se lo desarrollo 
en la carpeta controllers, por medio de consulktas SQL a Postgres que gracias al módulo pg se dio esta conexión, se pudo cargar y estrar la información necesaria.

Para generar las claves se utilizó UUID.

Con el fin de generar una mejor presentación en los formatos JSON, se realizaron procesos de agrupamiento de la información cuyo ID sea repetitivo dado el caso de pedidos con sus detalles, 
personas con sus direcciones, Productos con sus imágenes, etc.

La app esta escuchando en el puerto 3000 por lo tanto su conexion local seria localhost:3000

### Enfoque, Metodología y Mejoras

El enfoque está basado en la funcionalidad del sistema dejando paso a mejoras. Se utilizó una metodología Incremental y de Prototipado, ya que se realizó en corto tiempo dando paso a tener un entregable con tentativa a cambios y generar así actualizaciones de este proyecto y mejoras.
Entre las mejoras se realizaria un control de Loggin por token enlazado a una tabla de Sesiones, donde por medio de la caducidad del token se sabría si el usuario esta con su Sesión Iniciada o si cerro sesión.
De esta manera se valida que tenga privilegios y permisos para evitar que el Cliente ingrese nuevas cajas o que vea los pediso, de igual manera con el Delivery o que se realicen modificaciones sin iniciar sesión.

Se realizaria pruebas unitarias para medir el status de los webservices.
