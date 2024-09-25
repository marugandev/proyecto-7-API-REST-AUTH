# Sistema de Gestión de Restaurantes y Menús - API REST AUTH

## Descripción

Ese proyecto es una API que permite gestionar los usuarios, menús, platos y pedidos de un restaurante. Está diseñada para ser utilizada tanto por administradores como por clientes. Los administradores pueden gestionar los usuarios, menús, platos y pedidos, mientras que los clientes pueden eliminarse a si mismos de la BBDD, ver los menús, platos, hacer pedidos y consultar el estado de los mismos.

---

## Arquitectura

### Colección 1: **Users (Usuarios)**

- Claves: `name`, `email`, `password`, `role` (cliente o administrador)
- Función: Los usuarios pueden ser clientes que realizan pedidos o administradores que gestionan el sistema.

### Colección 2: **Menus (Menús)**

- Claves: `name`, `description`, `price`, `dishes` (lista de platos asociados)
- Relación: Cada menú tiene varios platos asociados.

### Colección 3: **Dishes (Platos)**

- Claves: `name`, `description`, `price`
- Relación: Cada plato puede pertenecer a un menú específico.

### Colección 4: **Orders (Pedidos)**

- Claves: `userId` (usuario que realizó el pedido), `dishes` (lista de platos), `total`, `status`
- Relación: Los pedidos son realizados por un usuario e incluyen uno o varios platos.

---

## Endpoints

### 1. **Users (Usuarios)**

#### **POST /register**

- Descripción: Registro de un nuevo usuario.
- Cuerpo de la solicitud:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Respuesta: Detalles del usuario creado.

#### **POST /login**

- Descripción: login del usuario.
- Cuerpo de la solicitud:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Respuesta: Token de autenticación y detalles del usuario logueado.

#### **GET /getUsers (Sólo admin, autenticado con TOKEN)**

- Descripción: Mostrar usuarios.
- Respuesta: Detalles de los usuarios existentes.

#### **GET /getUserById (Sólo admin, autenticado con TOKEN)**

- Respuesta: Mostrar usuario.
- Parámetros:
  `id` (URL): ID del usuario.
- Descripción: Detalle del usuario existente.

#### **PUT /updateUser (Sólo admin, autenticado con TOKEN)**

- Descripción: Actualizar usuario existente.
- Parámetros:
  `id` (URL): ID del usuario.
- Cuerpo modificable:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Respuesta: Usuario actualizado.

#### **DELETE /deleteUser (user y admin, autenticados con TOKEN)**

\*Con autenticación de user sólo se puede eliminar a sí mismo.

- Descripción: Eliminar usuario.
- Parámetros:
  `id` (URL): ID del usuario.
- Respuesta: Detalle del usuario eliminado.

### 2. **Menus (Menus)**

#### **GET /getMenus**

- Descripción: Mostrar menus.
- Respuesta: Detalles de los menus existentes.

#### **GET /getMenusById**

- Descripción: Mostrar menu.
- Parámetros:
  `id` (URL): ID del menu.
- Respuesta: Detalles del menu existente.

#### **POST /postMenu (Sólo admin, autenticado con TOKEN)**

- Descripción: Crear menu.
- Cuerpo de la solicitud:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
  }
  ```
- Respuesta: Detalles del menu creado.

#### **PUT /updateMenu (Sólo admin, autenticado con TOKEN)**

- Descripción: Actualizar menu.
- Parámetros:
  `id` (URL): ID del menu.
- Cuerpo modificable:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
  }
  ```
- Respuesta: Detalles del menu actualizado.

#### **DELETE /deleteMenu (Sólo admin, autenticado con TOKEN)**

- Descripción: Eliminar menu.
- Parámetros:
  `id` (URL): ID del menu.
- Respuesta: Detalles del menu eliminado.

### 3. **Dishes (Platos)**

#### **GET /getDishes**

- Descripción: Mostrar platos.
- Respuesta: Detalles de los platos existentes.

#### **GET /getDishById**

- Descripción: Mostrar plato.
- Parámetros:
  `id` (URL): ID del plato.
- Respuesta: Detalles del plato existente.

#### **GET/getDishesByPrice**

- Descripción: Muestra los platos iguales o menores a los precios indicados.
- Parámetros:
  `price` (URL): precio máximo del plato.
- Respuesta: Detalles de los platos filtrados existentes.

#### **POST /postDish (Sólo admin, autenticado con TOKEN)**

- Descripción: Crear plato.
- Cuerpo de la solicitud:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
  }
  ```
- Respuesta: Detalles del plato creado.

#### **PUT /updateDish (Sólo admin, autenticado con TOKEN)**

- Descripción: Modificar plato.
- Parámetros:
  `id` (URL): ID del plato.
- Cuerpo de la modificable:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": number,
  }
  ```
- Respuesta: Detalles del plato modificado.

#### **DELETE /deleteDish (Sólo admin, autenticado con TOKEN)**

- Descripción: Eliminar plato.
- Parámetros:
  `id` (URL): ID del plato.
- Respuesta: Detalles del plato eliminado.

### 4. **Orders (Pedidos)**

#### **GET /getOrders (Sólo admin, autenticado con TOKEN)**

- Descripción: Mostrar pedidos.
- Respuesta: Detalles de los pedidos existentes.

#### **GET /getOrderByID (user y admin, autenticados con TOKEN)**

- Descripción: Mostrar pedido.
- Parámetros:
  `id` (URL): ID del pedido.
- Respuesta: Detalles del pedido existente.

#### **POST /postOrder (user y admin, autenticados con TOKEN)**

- Descripción: Crear pedido.
- Cuerpo de la solicitud:
  ```json
  {
    "userId": "mongoose.Types.ObjectId",
    "dishes": ["mongoose.Types.ObjectId"]
  }
  ```
- Respuesta: Detalles del pedido creado.

#### **PUT /updateDish (Sólo admin, autenticado con TOKEN)**

- Descripción: Modificar pedido.
- Cuerpo modificable:
  ```json
  {
    "userId": "mongoose.Types.ObjectId",
    "dishes": ["mongoose.Types.ObjectId"]
  }
  ```
- Respuesta: Detalles del pedido modificado.

#### **DELETE /deleteDishes (Sólo admin, autenticado con TOKEN)**

- Descripción: Eliminar pedido.
- Parámetros:
  `id` (URL): ID del pedido.
- Respuesta: Detalles del pedido eliminado.

---

## Scripts

- **Ejecutar la aplicación en modo de desarrollo**

```bash
npm run dev
```

- **Lanzar la semilla de datos para las colecciones de (users, menus, dishes)**

```bash
npm run mainSeed
```

- **Lanzar la semilla de datos sólo para la colección de users**

```bash
npm run usersSeed
```

---

## Librerías necesarias

Para que la aplicación funcione correctamente, debes instalar las siguientes dependencias:

- **Dependencias:**

  - `dotenv`: `^16.4.5` - Para manejar variables de entorno.
  - `express`: `^4.20.0` - Framework para construir la API.
  - `mongoose`: `^8.6.1` - Para interactuar con MongoDB.
  - `bcrypt`: `^5.1.1` - Para encriptar las contraseñas.
  - `jsonwebtoken`: `^^9.0.2` - Para crear y gestionar los token.

- **Dependencias de desarrollo:**
  - `nodemon`: `^3.1.4` - Para reiniciar la aplicación automáticamente durante el desarrollo.

Puedes instalar todas las dependencias necesarias ejecutando:

```bash
npm install
```

---

## Middleware

- **auth**
  - Descripción: Gestiona las autorizaciones de las rutas basadas en roles de user (isAuth) y admin (isAdmin).

---

## Conexión a la Base de Datos

La aplicación se conecta a una base de datos MongoDB. Asegúrate de que la conexión esté configurada correctamente en el archivo .env con la variable DB_URL.

---

## Ejemplo de uso

**1. Clonar el repositorio y configurar el entorno**

```bash
git clone https://github.com/tu_usuario/proyecto-7-api-rest-auth.git
cd proyecto-7-api-rest-auth
```

**2. Instalar las dependencias**

```bash
npm install
```

**3. Ejecutar la semilla de datos**

```bash
npm run mainSeed
```

**4. Cambiar el rol del usuario a "admin"**
Al ejecutar la semilla de datos, se crea un usuario con rol de "user". Ahora modificaremos este usuario directamente en la base de datos MongoDB para que tenga rol de "admin", lo que le permitirá gestionar menús, platos y pedidos.

**5. Ejecutar la API en modo de desarrollo**

```bash
npm run dev
```

**6. Probar los Endpoints como "admin"**
Ahora que ya tienes un usuario administrador, puedes interactuar con los demás endpoints para gestionar menús, platos y pedidos. También puedes autenticarte como un cliente para hacer pedidos.
Recuerda utilizar herramientas como Postman o Insomnia para facilitar la interacción con los endpoints.

## Conclusión

Este flujo te permite poner en marcha rápidamente el sistema de gestión de restaurantes, menús y platos. Tras la configuración inicial y la actualización del rol del usuario, tendrás acceso completo a las funcionalidades de administrador y podrás gestionar los datos desde la API REST.
