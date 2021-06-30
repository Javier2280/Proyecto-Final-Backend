class Carrito {

    constructor() {
        // incializar variables
        this.Carrito = [];
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
id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
*/
    Agregar(idCarrito, producto) {
        let maxId = 1;

        try {
            //Cargo productos a un carrito nuevo
            if(idCarrito == undefined){
                if (this.Carrito.length > 0) {
                    maxId = this.Carrito.length + 1;
                }

                this.Carrito.push({
                    id: maxId, 
                    timestamp: this.getDate(), 
                    producto: JSON.parse(producto) 
                });

            } else {
                //Cargo productos a un carrito existente
                for (var i = 0; i < this.Carrito.length; i++) {
                    if (this.Carrito[i].id == id) {
                        this.Carrito[i].producto.push(JSON.parse(producto));
                    }
                }
                
            }
            
            return { timestamp: timestamp, producto: JSON.parse(producto) };

        } catch (error) {
            throw new Error(error);
        }
    }

    Listar(id) {
        try {

            if (id == undefined) {

                if (this.Carrito.length == 0) {
                    return { error: 'no hay productos cargados' };
                } else {
                    return this.Carrito;
                }

            } else {
                let respuesta = [];

                if (Carrito.length == 0) {
                    respuesta = { error: 'producto no encontrado' };
                    return respuesta;

                } else {
                    for (var i = 0; i < this.Carrito.length; i++) {
                        if (this.Carrito[i].id == id) {
                            respuesta = this.Carrito[i];
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

    Borrar(id) {
        let respuesta = [];

        try {
            for (var i = 0; i < this.Carrito.length; i++) {
                if (this.Carrito[i].id == id) {
                    respuesta = this.Carrito[i];
                    this.Carrito.splice(i, 1);
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
            if(this.Carrito.length > 0) {
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
module.exports = new Carrito();