
let librosData = [
    {
        id: 1,
        codigo: "LIB-001",
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        categoria: "Literatura",
        stock: 5,
        stockTotal: 8
    },
    {
        id: 2,
        codigo: "LIB-002",
        titulo: "Cien Años de Soledad",
        autor: "Gabriel García Márquez",
        categoria: "Literatura",
        stock: 3,
        stockTotal: 5
    },
    {
        id: 3,
        codigo: "LIB-003",
        titulo: "Clean Code: A Handbook of Agile Software Craftsmanship",
        autor: "Robert C. Martin",
        categoria: "Tecnología",
        stock: 4,
        stockTotal: 6
    },
    {
        id: 4,
        codigo: "LIB-004",
        titulo: "Breves Respuestas a las Grandes Preguntas",
        autor: "Stephen Hawking",
        categoria: "Ciencia",
        stock: 2,
        stockTotal: 4
    },
    {
        id: 5,
        codigo: "LIB-005",
        titulo: "Sapiens: De animales a dioses",
        autor: "Yuval Noah Harari",
        categoria: "Historia",
        stock: 1,
        stockTotal: 3
    }
];

let lectoresData = [
    {
        id: 1,
        codigo: "LEC-101",
        nombre: "María Rodríguez",
        email: "maria.rodriguez@email.com",
        telefono: "+505 8888-1111",
        estado: "Activo",
        prestamosActivos: 1
    },
    {
        id: 2,
        codigo: "LEC-102",
        nombre: "Carlos Gómez",
        email: "carlos.gomez@email.com",
        telefono: "+505 8888-2222",
        estado: "Activo",
        prestamosActivos: 1
    },
    {
        id: 3,
        codigo: "LEC-103",
        nombre: "Ana Martínez",
        email: "ana.martinez@email.com",
        telefono: "+505 8888-3333",
        estado: "Activo",
        prestamosActivos: 0
    },
    {
        id: 4,
        codigo: "LEC-104",
        nombre: "Luis Fernández",
        email: "luis.fernandez@email.com",
        telefono: "+505 8888-4444",
        estado: "Suspendido",
        prestamosActivos: 0
    }
];

let prestamosData = [
    {
        id: 1,
        codigo: "PRE-001",
        libroId: 1,
        libroTitulo: "Don Quijote de la Mancha",
        lectorId: 1,
        lectorNombre: "María Rodríguez",
        fechaPrestamo: "2026-10-15",
        fechaDevolucion: "2026-10-22",
        estado: "Activo"
    },
    {
        id: 2,
        codigo: "PRE-002",
        libroId: 3,
        libroTitulo: "Clean Code: A Handbook of Agile Software Craftsmanship",
        lectorId: 2,
        lectorNombre: "Carlos Gómez",
        fechaPrestamo: "2026-10-01",
        fechaDevolucion: "2026-10-10",
        estado: "Vencido"
    }
];