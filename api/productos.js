class Productos {

    constructor() {
        // incializar variables
        this.productos = [];
    }

    getDate() {
        var date = new Date(),
          year = date.getFullYear(),
          month = (date.getMonth() + 1).toString(),
          formatedMonth = (month.length === 1) ? ("0" + month) : month,
          day = date.getDate().toString(),
          formatedDay = (day.length === 1) ? ("0" + day) : day,
          hour = date.getHours().toString(),
          formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
          minute = date.getMinutes().toString(),
          formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
          second = date.getSeconds().toString(),
          formatedSecond = (second.length === 1) ? ("0" + second) : second;
        return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
      };
/*
id, timestamp, nombre, descripcion, código, foto, precio, stock
*/
    Agregar(nombre, descripcion, codigo, foto, precio, stock) {
        let maxId = 1;
console.log('Entro a producto');
        try {
            if (this.productos.length > 0) {
                maxId = this.productos.length + 1;
            }

            console.log(
                'nombre', nombre,
                'descripcion', descripcion, 
                'codigo', codigo,
                'foto', foto,
                'precio', precio,
                'stock', stock,
                'getDate()', this.getDate()
            )

            this.productos.push({ 
                id: maxId, 
                timestamp: this.getDate(), 
                nombre: nombre, 
                descripcion: descripcion, 
                codigo: codigo, 
                foto: foto, 
                precio: precio, 
                stock: stock 
            });

            return true//{ id, timestamp, nombre, descripcion, codigo, foto, precio, stock };

        } catch (error) {
            throw new Error(error);
        }
    }

    Listar(id) {
        try {

            if (id == undefined) {

                if (this.productos.length == 0) {
                    return { error: 'no hay productos cargados' };
                } else {
                    return this.productos;
                }

            } else {
                let respuesta = [];

                if (productos.length == 0) {
                    respuesta = { error: 'producto no encontrado' };
                    return respuesta;

                } else {
                    for (var i = 0; i < this.productos.length; i++) {
                        if (this.productos[i].id == id) {
                            respuesta = this.productos[i];
                        }
                    }
                    if (respuesta.length == 0) {
                        respuesta = { error: 'producto no encontrado' };
                    }

                    return respuesta;
                }

            }

        } catch (error) {

            throw new Error(error);
        }
    }

    Actualizar(id, nombre, descripcion, codigo, foto, precio, stock) {
        let respuesta = [];

        try {
            for (var i = 0; i < this.productos.length; i++) {
                if (this.productos[i].id == id) {
                    this.productos[i].nombre = nombre;
                    this.productos[i].descripcion = descripcion;
                    this.productos[i].codigo = codigo;
                    this.productos[i].foto = foto;
                    this.productos[i].precio = precio;
                    this.productos[i].stock = stock;

                    respuesta = this.productos[i];
                }
            }

            if (respuesta.length == 0) {
                respuesta = { error: 'producto no encontrado' };
            }

            return respuesta;

        } catch (error) {
            throw new Error(error);
        }
    }


    Borrar(id) {
        let respuesta = [];

        try {
            for (var i = 0; i < this.productos.length; i++) {
                if (this.productos[i].id == id) {
                    respuesta = this.productos[i];
                    this.productos.splice(i, 1);
                }
            }

            if (respuesta.length == 0) {
                respuesta = { error: 'producto no encontrado' };
            }

            return respuesta;
        } catch (error) {
            throw new Error(error);
        }
    }

    hayProductos() {
        try {
            if(this.productos.length > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new Error(error);
        }
    }

}

// exporto una instancia de la clase
module.exports = new Productos();
