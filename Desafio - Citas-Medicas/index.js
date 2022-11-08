// Importar Módulos
const http = require('http');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

// Arreglo vacío para ingresar usuarios
let lista_usuarios = [];

// Creando servidor con http.createServer()
http
    .createServer((req,res) => {

        // Ruta para registrar usuarios
        if (req.url.includes('/registrar_usuario')) {
            
            // Uso de Axios para consultar a la API y obtener el usuario
                axios
                    .get('https://randomuser.me/api/')
                    .then((data) => {
                        const nombre = data.data.results[0].name.first;
                        const apellido = data.data.results[0].name.last;
                        const id =  uuidv4().slice(0,6);
                        const fecha = moment().format('MMM Do YYYY, h:mm:ss a'); // Uso de Moment para generar la fecha y hora de registro

                        // Ingresando en el array un objeto con las propiedades del usuario, nombre, apellido, id y timestamp en el arreglo
                        lista_usuarios.push(
                            {
                            nombre: nombre,
                            apellido: apellido,
                            id: id,
                            timestamp: fecha
                        });
                        console.log(chalk.blue.bgYellow('Usuario registrado con éxito\n'));
                        
                    })
                    .catch((e) => {
                        console.log(e);
                    })

                    res.end();
            }

            // Ruta para consultar la lista de usuarios
            if (req.url.includes('/consultar_lista')) {

                let i = 1;

                console.log(chalk.red.bgGreen('\nLista de usuarios registrados:'));

                res.write('Lista de usuarios registrados:\n');

                // Uso de Lodash para recorrer el arreglo de usuarios registrados
                _.forEach(lista_usuarios,(elemento) => {
                    
                    // Impresión del resultado en consola del servidor
                    console.log(chalk.blue.bgWhite(`${i}. Nombre: ${elemento.nombre} - Apellido: ${elemento.apellido} - Id: ${elemento.id} - Timestamp: ${elemento.timestamp}`));

                    // Resultado que se devuelve al cliente
                    res.write(`${i}. Nombre: ${elemento.nombre} - Apellido: ${elemento.apellido} - Id: ${elemento.id} - Timestamp: ${elemento.timestamp}\n`);
                   i++;
                })
                
                res.end();
            }
    })
    .listen(8080, () => {console.log('Escuchando en el puerto 8080')});