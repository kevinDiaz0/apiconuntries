const axios = require('axios');
const readline = require('readline');


//lectura de entrada
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function obtenerListaDePaises() {
    try {
        const respuesta = await axios.get('https://restcountries.com/v3.1/all');
        const paises = respuesta.data;

        console.log("Lista de países:");
        paises.forEach((pais, index) => {
            console.log(`${index + 1}. ${pais.name.common}`);
        });

        // Pedir al usuario que seleccione un país
        rl.question('Seleccione el número de país a consultar:_',  (seleccion) => {
            //validando el tipo de datos ingresado
            if (!isNaN(parseInt(seleccion))){
                const numeroSeleccion = parseInt(seleccion);
                if (numeroSeleccion >= 1 && numeroSeleccion <= paises.length) {
                    // Obtener el país seleccionado
                    const paisSeleccionado = paises[numeroSeleccion - 1];
                    // Mostrar detalles del país seleccionado...
                    console.log("\nDetalles del país seleccionado:");
                    console.log("Nombre:", paisSeleccionado.name.common);
                    console.log("Capital:", paisSeleccionado.capital[0]);
                    console.log("Población:", paisSeleccionado.population);
                    console.log("Idiomas:", Object.values(paisSeleccionado.languages).join(", "));
            

                    rl.question("desea consultar otro pais?\n 1.Si\n 2.No\n_", async (respuesta) =>{
                        if (!isNaN(parseInt(respuesta))){
                            if(respuesta == 1){
                                await obtenerListaDePaises();
                            }else{
                                rl.close();
                            }
                        }else{
                            console.log('Por favor, ingrese un número entero válido.');
                            rl.close();
                            //await obtenerListaDePaises();
                        }
                        
                    })

                } else {
                    console.log('Por favor, ingrese un número dentro del rango.');
                    //await obtenerListaDePaises();
                }
            }else{
                console.log('Por favor, ingrese un número entero válido.');
                //await obtenerListaDePaises();
            }            
        });
    } catch (error) {
        console.error("Ocurrió un error al obtener la lista de países:", error);
    }
}
obtenerListaDePaises();    
            





