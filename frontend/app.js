const editor = CodeMirror(document.querySelector('#editor'), {
    value: "const os = require('os');\n\nconsole.log('¡Hola desde un contenedor Docker!');\nconsole.log(`Plataforma: ${os.platform()}, CPU: ${os.cpus()[0].model}`);",
    mode: 'javascript',
    theme: 'material-darker',
    lineNumbers: true
});

const runButton = document.getElementById('run-button');
const outputElement = document.getElementById('output');

// URL de tu API backend
const API_URL = 'http://localhost:3000/execute';

runButton.addEventListener('click', async () => {
    const code = editor.getValue();
    outputElement.textContent = "Enviando al servidor...";
    runButton.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        const result = await response.json();

        if (result.success) {
            outputElement.textContent = result.output || '(Sin salida)';
        } else {
            outputElement.textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        outputElement.textContent = `Error de conexión: ${error.message}`;
    } finally {
        runButton.disabled = false;
    }
});
