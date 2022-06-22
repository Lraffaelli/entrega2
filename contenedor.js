const fs = require("fs");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
    this.productos = [];
  }

  save(title, price, thumbnail) {
    let item = {};
    item.title = title;
    item.price = price;
    item.thumbnail = thumbnail;
    item.id = this.productos.length + 1;
    this.productos.push(item);
  }

  async writeFile() {
    try {
      const data = await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(this.productos, null, 2)
      );
      console.log(data);
    } catch (error) {
      console.log("Error de lectura", error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      console.log(contenido);
    } catch {
      console.log("Error de lectura", error);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile('./productos.txt', "utf-8");

      let productos = JSON.parse(data);

      const producto = productos.find((producto) => producto.id === id);

      if (producto) {
        return console.log(producto);
      } else {
        return console.log("Null");
      }
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile('./productos.txt', "utf-8");

      let productos = JSON.parse(data);
        const newProducto = productos.filter((producto) => producto.id !== id);
  
        await fs.promises.writeFile(this.nameFile,
          JSON.stringify(newProducto, null, 2)
        ); 
           
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }
  async deleteAll(){
    try {
      const data = await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify([], null, 2)
      );
      console.log(data);
    } catch (error) {
      console.log("Error de lectura", error);
    }
  }

}


const contenedor = new Contenedor("productos.txt");
console.log(contenedor)
contenedor.save("casa", 24, "direccion");
contenedor.save("lata", 34, "otra direccion");
contenedor.save("escuadra", 122, "otra direccion");

/* contenedor.writeFile();
contenedor.getById(2);
contenedor.getAll()  */
//contenedor.deleteById(1)
contenedor.deleteAll()
contenedor.getAll()

