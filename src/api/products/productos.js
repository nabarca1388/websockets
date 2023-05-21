//const fs = require('fs');
import fs from 'fs';


class ProductManager {
    static id = 0;

    constructor(ruta) {
        this.ruta = ruta;
        this.products = [];
    }


    getProductId() {
        return ProductManager.id + 1;
    }


    getProductById(id) {
        this.readFile();
        const productoEncontrado = this.products.find(producto => producto.id === id);

        if (productoEncontrado) {
            return productoEncontrado
        } else {
            return ['No existe producto']
        }
    }


    addStatus = (state) => {
        if(state != true){
            state = true;
        }
        return state;
    }


    getProducts = (limit) => {
        this.readFile();

        if (limit) {
            const products = [];

            for (let i = 0; i < limit; i++) {
                products.push(this.products[i]);
            }
            return products;
        }
        return this.products
    }



    deleteProduct = (id) => {
        this.readFile();
        const product = this.products.findIndex(producto => producto.id === id);

        if (product !== -1) {
            this.products.splice(product, 1);
            
            fs.writeFileSync(this.ruta, JSON.stringify(this.products));
            console.log('Producto eliminado', product);

        } else {
            console.log('Error, el producto no existe', id);
        }
    }


    fillFile = (arrayProducts) => {
        console.log('EEEEE', arrayProducts);
        const cadenaArchivo = JSON.stringify(arrayProducts);
        fs.writeFileSync(this.ruta, cadenaArchivo);
        console.log('Archivo actualizado');
    }


    readFile = () => {
        const usuarios = fs.readFileSync(this.ruta, 'utf-8');
        this.products = JSON.parse(usuarios);
    }


    addProduct = (product) => {
        const fileProducts = fs.readFileSync(this.ruta, 'utf-8');
        const obj = JSON.parse(fileProducts);

        //console.log('PEPEEE',obj);

        if (obj.length === 0) {
            const productNew = {
                id: ProductManager.id = this.getProductId(),
                title: product.title,
                description: product.description,
                price: product.price,
                code: product.code,
                stock: product.stock,
                status: this.addStatus(product.status)
            }
            obj.push(productNew);
            this.fillFile(obj);
            console.log('SE GUARDO PRODUCTO NUEVO EN ARCHIVO VACIO', productNew);
            return;
        }

        const prod = obj.filter((_product) => _product.code === product.code);

        if (prod && prod.length > 0) {
            console.log('ERROR-CODIGO REPETIDO');
            return;
        }

        const productNew = {
            id: ProductManager.id = this.getProductId(),
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code,
            stock: product.stock,
            status: this.addStatus(product.status)
        }
        obj.push(productNew);
        this.fillFile(obj);
        console.log('SE GUARDO PRODUCTO NUEVO', productNew);
    }


    updateProduct = (product, id) => {
        const fileProducts = fs.readFileSync(this.ruta, 'utf-8');
        const obj = JSON.parse(fileProducts);
        const producPosition = obj.findIndex(_product => _product.id === id);
        
        obj[producPosition].title = product.title;
        obj[producPosition].description = product.description;
        obj[producPosition].price = product.price;
        obj[producPosition].code = product.code;
        obj[producPosition].stock = product.stock;

        
        fs.writeFileSync(this.ruta, JSON.stringify(obj));
        console.log('Update realizado');
    }

}



const manager = new ProductManager('./data/productos.json');

export default ProductManager;

