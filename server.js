const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');

const productos = require('./api/productos');
const carrito = require('./api/carrito');

app.use(express.static( __dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// definimos las rutas http
const routerProductos = express.Router();
const routerCarrito = express.Router();

const archivo_carrito = './public/logs/carritos.txt'
const archivo_productos = './public/logs/productos.txt'

let administrador = false;

/*
 -------------------- HTTP endpoints ---------------------- 
 ----------------------- Productos -------------------------
*/

routerProductos.get('/productos/listar/:id', (req, res) => {
    try {
        res.status(200).send(JSON.stringify(productos.Listar(req.params.id)));

    } catch (error) {
        res.status(400).send(error);
    }
});

routerProductos.post('/productos/agregar', (req, res) => {
    try {
        if(administrador){
            productos.Agregar(
                req.body.nombre, 
                req.body.descripcion, 
                req.body.codigo, 
                req.body.foto, 
                req.body.precio, 
                req.body.stock
            );
            
            if(persistirDatos(carrito,'producto') == false) {
                res.status(400).send('Error al guardar los productos.');
            } else {
                res.status(200).send(JSON.stringify(productos.Listar()));
            }
            
        } else {
            res.status(400).send('{ error : -1, descripcion: ruta api/productos método agregar no autorizado}');    
        }


    } catch (error) {
        res.status(400).send(error);
    }
});

routerProductos.put('/productos/actualizar/:id', (req, res) => {
    try {
        if(administrador){
            res.status(200).send(JSON.stringify(
                productos.Actualizar(
                    req.params.id, 
                    req.body.nombre, 
                    req.body.descripcion, 
                    req.body.codigo, 
                    req.body.foto, 
                    req.body.precio, 
                    req.body.stock
                )));
        } else {
            res.status(400).send('{ error : -1, descripcion: ruta api/productos método actualizar no autorizado}');    
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
});

routerProductos.delete('/productos/borrar/:id', (req, res) => {
    try {
        if(administrador){
            res.status(200).send(JSON.stringify(productos.Borrar(req.params.id)));
        } else {
            res.status(400).send('{ error : -1, descripcion: ruta api/productos método borrar no autorizado}');    
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.use('/api', routerProductos);

/*
 -------------------- HTTP endpoints ---------------------- 
 ----------------------- Carrito --------------------------
*/

routerCarrito.get('/carrito/listar/:id', (req, res) => {
    try {
        res.status(200).send(JSON.stringify(carrito.Listar(req.params.id)));

    } catch (error) {
        res.status(400).send(error);
    }
});

routerCarrito.post('/carrito/agregar', (req, res) => {
    try {
        //idCarrito, timestamp, producto
        carrito.Agregar(
            req.body.idCarrito, 
            productos.Listar(req.body.productoId)
            );

        if(persistirDatos(carrito,'carrito') == false) {
            res.status(400).send('Error al guardar el carrito.');
        } else {
            res.status(200).send(JSON.stringify(carrito.Listar()));
        }
        
        
    } catch (error) {
        res.status(400).send(error);
    }
});

routerCarrito.delete('/carrito/borrar/:id', (req, res) => {
    try {
        res.status(200).send(JSON.stringify(carrito.Borrar(req.params.id)));

    } catch (error) {
        res.status(400).send(error);
    }
});

app.use('/api', routerCarrito);

const PORT = 8080;

const srv = server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

srv.on("error", error => console.log(`Error en servidor ${error}`));


function persistirDatos(objeto, tipo) {
    let resultado;

    try {
        if(tipo == 'producto') {
            if(objeto.hayMensajes) {
                fs.writeFileSync(archivo_productos, JSON.stringify(objeto.Listar()));
            }

            resultado = true;
        } else if (tipo == 'carrito') {
            if(objeto.hayProductos) {
                fs.writeFileSync(archivo_carrito, JSON.stringify(objeto.Listar()));
            }
        } else {
            //el tipo es incorrecto o no existe, sale por error.
            resultado = false;
        }

        return resultado;
        
    } catch (error) {
        return false;
    }
}