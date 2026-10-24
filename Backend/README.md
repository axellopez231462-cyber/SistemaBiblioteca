# Módulo Backend — BiblioTech

## Arquitectura Propuesta
- **Lenguaje / Entorno:** Node.js
- **Framework:** Express.js
- **Arquitectura:** API RESTful
- **Autenticación:** JWT

## Endpoints Diseñados
- `GET /api/libros` - Consultar inventario
- `POST /api/libros` - Registrar nuevo libro
- `GET /api/lectores` - Consultar directorio de usuarios
- `POST /api/prestamos` - Registrar salida de libro
- `PUT /api/prestamos/:id/devolucion` - Confirmar retorno y restabledar stock
