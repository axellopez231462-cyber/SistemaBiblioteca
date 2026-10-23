# Módulo de Base de Datos — BiblioTech

## Motor Propuesto
- **SGBD:** PostgreSQL / MySQL

## Modelo Entidad-Relación (Tablas)

### 1. `libros`
- `id` (INT, PK, AUTO_INCREMENT)
- `codigo` (VARCHAR)
- `titulo` (VARCHAR)
- `autor` (VARCHAR)
- `categoria` (VARCHAR)
- `stock` (INT)
- `stock_total` (INT)

### 2. `lectores`
- `id` (INT, PK, AUTO_INCREMENT)
- `codigo` (VARCHAR)
- `nombre` (VARCHAR)
- `email` (VARCHAR)
- `estado` (VARCHAR)

### 3. `prestamos`
- `id` (INT, PK, AUTO_INCREMENT)
- `codigo` (VARCHAR)
- `libro_id` (INT, FK -> libros.id)
- `lector_id` (INT, FK -> lectores.id)
- `fecha_prestamo` (DATE)
- `fecha_devolucion` (DATE)
- `estado` (VARCHAR)