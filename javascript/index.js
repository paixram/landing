document.getElementById('formularioCotizacion').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const modelo = document.getElementById('modelo').value;
    const correo = document.getElementById('correo').value;

    try {
        const response = await fetch('https://landing-dcd0b-default-rtdb.firebaseio.com/cotizaciones.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, modelo, correo })
        });
        const data = await response.json();
        let res = `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5>${nombre}</h5>
                                <p>Modelo: ${modelo}</p>
                                <p>Correo: ${correo}</p>
                            </div>
                        </div>
                    `;
        document.getElementById('resultado').insertAdjacentHTML('afterbegin', `Cotización enviada con éxito: ${res}`);
    } catch (error) {
        document.getElementById('resultado').insertAdjacentHTML('afterbegin', `Error al enviar la cotización: ${error.message}`);
    }
});


document.addEventListener('DOMContentLoaded', async function () {
    try {
       
        const response = await fetch('https://landing-dcd0b-default-rtdb.firebaseio.com/cotizaciones.json');

        if (response.ok) {
            const cotizaciones = await response.json();

           
            const resultadoDiv = document.getElementById('resultado');
            if (cotizaciones) {
                resultadoDiv.innerHTML = `<h4 class="mb-3">Cotizaciones Recibidas:</h4>`;
                Object.keys(cotizaciones).forEach(key => {
                    const cotizacion = cotizaciones[key];
                    resultadoDiv.innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5>${cotizacion.nombre}</h5>
                                <p>Modelo: ${cotizacion.modelo}</p>
                                <p>Correo: ${cotizacion.correo}</p>
                            </div>
                        </div>
                    `;
                });
            } else {
                resultadoDiv.innerHTML = `<p>No hay cotizaciones registradas.</p>`;
            }
        } else {
            throw new Error('Error al obtener las cotizaciones');
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = `
            <div class="alert alert-danger">Error: ${error.message}</div>`;
    }
});
