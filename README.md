# RunJS Docker - Playground de JavaScript Seguro

🚀 **Servidor de ejecución de código JavaScript seguro usando Docker**

Este proyecto implementa un servidor backend que permite ejecutar código JavaScript de forma segura utilizando contenedores Docker. Similar a plataformas como RunJS, pero con el añadido de aislamiento y seguridad que proporciona Docker.

## 🌟 Características

- ✅ **Ejecución segura**: Todo el código se ejecuta en contenedores Docker aislados
- ✅ **Límites de recursos**: Configuración de memoria y CPU para evitar abusos
- ✅ **Sin acceso a red**: Los contenedores se ejecutan sin conectividad de red
- ✅ **Auto-limpieza**: Los contenedores se eliminan automáticamente después de la ejecución
- ✅ **API REST**: Interfaz simple para enviar código y recibir resultados
- ✅ **CORS habilitado**: Permite peticiones desde cualquier origen

## 🏗️ Arquitectura

```
┌─────────────────┐    HTTP POST    ┌─────────────────┐    Docker API    ┌─────────────────┐
│   Cliente Web   │ ───────────────▶ │  Express Server │ ───────────────▶ │ Docker Container│
│                 │                 │                 │                 │   (node:18-alpine)
└─────────────────┘                 └─────────────────┘                 └─────────────────┘
```

## 🛠️ Tecnologías

- **Node.js 18+**: Runtime de JavaScript
- **Express 5**: Framework web
- **Docker**: Contenedorización y aislamiento
- **Dockerode**: Cliente Docker para Node.js
- **CORS**: Middleware para permitir peticiones cross-origin

## 📦 Instalación

### Prerrequisitos

- Node.js 18 o superior
- Docker instalado y funcionando
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd playground-servidor
   ```

2. **Instalar dependencias**
   ```bash
   cd backend
   npm install
   ```

3. **Verificar que Docker esté funcionando**
   ```bash
   docker --version
   docker ps
   ```

4. **Ejecutar el servidor**
   ```bash
   node server.js
   ```

   El servidor estará disponible en `http://localhost:3000`

## 🚀 Uso

### API Endpoint

**POST** `/execute`

**Body:**
```json
{
  "code": "console.log('Hello, Docker!')"
}
```

**Response exitosa:**
```json
{
  "success": true,
  "output": "Hello, Docker!\n"
}
```

**Response con error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Ejemplo con curl

```bash
curl -X POST http://localhost:3000/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"Hello World!\"); console.log(2 + 2);"}'
```

### Ejemplo con JavaScript/Fetch

```javascript
fetch('http://localhost:3000/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    code: 'console.log("Hello from browser!"); console.log(Math.random());'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔒 Seguridad

El proyecto implementa varias medidas de seguridad:

### Aislamiento de contenedores
- Cada ejecución se realiza en un contenedor Docker separado
- Los contenedores se eliminan automáticamente después de la ejecución
- Sin acceso al sistema de archivos del host

### Límites de recursos
- **Memoria**: 100 MB máximo
- **CPU**: 1 núcleo máximo
- **Red**: Completamente deshabilitada

### Restricciones adicionales
- Sin acceso a módulos del sistema
- Sin persistencia de datos entre ejecuciones
- Timeout automático para evitar ejecuciones infinitas

## 🐳 Docker

### Dockerfile

El proyecto incluye un Dockerfile para crear una imagen base segura:

```dockerfile
FROM node:18-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
CMD ["node"]
```

### Construcción de la imagen

```bash
cd backend
docker build -t runjs-docker .
```

## 📁 Estructura del proyecto

```
playground-servidor/
├── backend/
│   ├── node_modules/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── README.md
```

## 🔧 Configuración

### Variables de entorno

- `PORT`: Puerto del servidor (por defecto: 3000)
- `DOCKER_MEMORY_LIMIT`: Límite de memoria en bytes (por defecto: 104857600 - 100MB)
- `DOCKER_CPU_COUNT`: Número de CPUs (por defecto: 1)

### Personalización del servidor

Puedes modificar las siguientes configuraciones en `server.js`:

- Límites de memoria y CPU
- Imagen de Docker a utilizar
- Puerto de escucha
- Configuración de CORS

## 🧪 Pruebas

### Prueba básica

```bash
# Iniciar el servidor
node server.js

# En otra terminal
curl -X POST http://localhost:3000/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"Test successful!\");"}'
```

### Prueba de límites

```bash
# Prueba de memoria (debería fallar)
curl -X POST http://localhost:3000/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "const arr = []; while(true) arr.push(new Array(10000000));"}'
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 🔗 Enlaces útiles

- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Dockerode Documentation](https://github.com/apocas/dockerode)

## 🐛 Reporte de bugs

Si encuentras un bug, por favor abre un issue con:

1. Descripción del problema
2. Pasos para reproducirlo
3. Comportamiento esperado
4. Logs del servidor
5. Versión de Node.js y Docker

## 📊 Estado del proyecto

- ✅ Ejecución básica de código JavaScript
- ✅ Límites de recursos
- ✅ Aislamiento de red
- ✅ API REST
- ✅ Documentación
- 🔄 Pruebas unitarias (en desarrollo)
- 🔄 Interfaz web (planificado)
- 🔄 Soporte para más lenguajes (planificado)

---

**Desarrollado con ❤️ usando Node.js y Docker**
