# Nolatech Offline Test Backend

Este proyecto es el backend para la prueba offline de Nolatech. Está construido con Node.js, Express y MongoDB.

## Estructura del Proyecto

nolatech-offline-test-backend/
├── config/
│ └── db.js # Configuración de la conexión a la base de datos
├── controllers/
│ ├── employeeController.js # Controlador para empleados
│ ├── evaluationController.js # Controlador para evaluaciones
│ ├── feedbackController.js # Controlador para feedback
│ ├── reportController.js # Controlador para reportes
│ └── userController.js # Controlador para usuarios
├── middlewares/
│ ├── authMiddleware.js # Middleware de autenticación
│ ├── errorHandler.js # Middleware para manejo de errores
│ └── validateInput.js # Middleware para validar entradas
├── models/
│ ├── employeeModel.js # Modelo de empleado
│ ├── evaluationModel.js # Modelo de evaluación
│ ├── feedbackModel.js # Modelo de feedback
│ └── userModel.js # Modelo de usuario
├── routes/
│ ├── employeeRoutes.js # Rutas para empleados
│ ├── evaluationRoutes.js # Rutas para evaluaciones
│ ├── feedbackRoutes.js # Rutas para feedback
│ ├── reportRoutes.js # Rutas para reportes
│ └── userRoutes.js # Rutas para usuarios
├── services/
│ ├── employeeService.js # Servicio para empleados
│ ├── evaluationService.js # Servicio para evaluaciones
│ ├── feedbackService.js # Servicio para feedback
│ ├── reportService.js # Servicio para reportes
│ └── userService.js # Servicio para usuarios
├── tests/
│ ├── controllers/ # Pruebas para controladores
│ ├── routes/ # Pruebas para rutas
│ └── services/ # Pruebas para servicios
├── .env # Variables de entorno
├── .gitignore # Archivos y directorios ignorados por git
├── index.js # Punto de entrada de la aplicación
├── package.json # Dependencias y scripts del proyecto
└── README.md # Documentación del proyecto

## Configuración

1. Clona el repositorio:
   git clone https://github.com/tu-usuario/nolatech-offline-test-backend.git
   cd nolatech-offline-test-backend

2. Instala las dependencias:
   npm install

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   MONGODB_URI="mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=evaluationdb"
   SERVER_PORT=3000
   JWT_SECRET="nolatech"

4. Asegúrate de que tu base de datos MongoDB Atlas esté configurada y que tu IP esté en la lista blanca.

## Ejecutar la Aplicación

Para iniciar la aplicación, ejecuta el siguiente comando:
npm start

La aplicación estará disponible en `http://localhost:3000`.

## Ejecutar Pruebas

Para ejecutar las pruebas, usa el siguiente comando:
npm test

## Endpoints

### Autenticación

- `POST /api/auth/register`: Registrar un nuevo usuario
- `POST /api/auth/login`: Iniciar sesión

### Empleados

- `POST /api/employees/register`: Registrar un nuevo empleado
- `GET /api/employees`: Listar empleados

### Evaluaciones

- `POST /api/evaluations`: Crear una nueva evaluación
- `GET /api/evaluations/:id`: Obtener una evaluación por ID
- `PUT /api/evaluations/:id`: Actualizar una evaluación por ID
- `GET /api/evaluations/employee/:id`: Obtener evaluaciones por ID de empleado

### Feedback

- `POST /api/feedback`: Crear un nuevo feedback

### Reportes

- `GET /api/reports/employee/:id`: Generar un reporte de empleado
