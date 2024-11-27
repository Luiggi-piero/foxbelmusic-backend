## Descripción del proyecto
Aplicación backend que permite realizar bússquedas de canciones usando la API Deezer, por otro lado se logra la autenticación de usuarios y la persistencia de datos en MongoDB

## Funcionalidades
- [x] Búsqueda de canciones por su título o nombre del artista usando la [API Deezer](https://developers.deezer.com/api)
- [x] Registro de usuarios
- [x] Inicio de sesión
- [x] Persistencia de los tracks/usuarios en MongoDB
- [x] Edición de usuarios

## Crea las variables de entorno en el archivo `.env`

* MONGO_URI : Coneción con MongoDB
* JWT_SECRET : Palabra secreta de jsonwebtoken

### `npm i`

Instala las dependencias.


### `npm run dev`

Ejecuta la aplicación en modo desarrollo.
