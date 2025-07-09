# Usa una imagen de Node.js pequeña y segura
FROM node:18-alpine

# Crea un directorio de trabajo
WORKDIR /app

# Copia solo el código a ejecutar (no es necesario en este caso, pero es buena práctica)
# COPY . .

# Por seguridad, crea un usuario con menos privilegios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Cambia al usuario sin privilegios
USER appuser

# El comando por defecto (no se usará directamente, pero es útil para tests)
CMD ["node"]
