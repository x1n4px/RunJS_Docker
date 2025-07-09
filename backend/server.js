const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');
const stream = require('stream');

const app = express();
const docker = new Docker();

app.use(cors()); // Permite peticiones desde cualquier origen
app.use(express.json());

app.post('/execute', async (req, res) => {
    const { code } = req.body;

    // Buffer para capturar la salida del contenedor
    let output = '';
    const outputStream = new stream.Writable({
        write(chunk, encoding, callback) {
            output += chunk.toString();
            callback();
        }
    });

    try {
        console.log("Creando contenedor para ejecutar el código...");
        
        // Opciones del contenedor
        const container = await docker.createContainer({
            Image: 'node:18-alpine', // La misma imagen que nuestro Dockerfile
            Cmd: ['node', '-e', code], // Ejecuta el código con el flag -e
            Tty: false,
            HostConfig: {
                // Limita los recursos para evitar abusos
                Memory: 100 * 1024 * 1024, // 100 MB de RAM
                CpuCount: 1, // 1 CPU
                AutoRemove: true // Elimina el contenedor automáticamente al terminar
            },
            NetworkDisabled: true, // Deshabilita la red por seguridad
        });

        // Conecta el stream de salida
        const stream = await container.attach({ stream: true, stdout: true, stderr: true });
        container.modem.demuxStream(stream, outputStream, outputStream);

        // Inicia el contenedor
        await container.start();
        console.log("Contenedor iniciado. Esperando finalización...");

        // Espera a que el contenedor termine y obtiene el código de salida
        const data = await container.wait();
        console.log("Contenedor finalizado con código:", data.StatusCode);

        res.json({ success: true, output });

    } catch (err) {
        console.error("Error al ejecutar en Docker:", err);
        res.status(500).json({ success: false, error: err.message || 'Error en el servidor.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en el puerto ${PORT}`);
});
