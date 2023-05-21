//const fs = require('fs');
//const { exit } = require('process');

import fs from 'fs';


class Carts {
    static cart_Id = 0;

    constructor(ruta) {
        this.ruta = ruta;
        this.cartOfProduct = [];
    }


    getCartId() {
        return Carts.cart_Id + 1;
    }



    getCart = () => {
        this.readFile();

        const carts = this.cartOfProduct;

        return carts;
    }


    createCarts = () => {
        fs.writeFileSync(this.ruta, JSON.stringify(this.cartOfProduct));
        console.log('Archivo creado');
    }

    
    fillFile = (obj) => {
        this.cartOfProduct.push(obj);
        const cadenaArchivo = JSON.stringify(this.cartOfProduct);
        fs.writeFileSync(this.ruta, cadenaArchivo);
        console.log('Archivo actualizado');
    }
    

    readFile = () => {
        const carts = fs.readFileSync(this.ruta, 'utf-8');
        this.cartOfProduct = JSON.parse(carts);
    }


    addCart = (cart) => {
        const newCart = {
            cart_Id: Carts.cart_Id = this.getCartId(),
            cart: cart.cartArray
        }

        this.fillFile(newCart);
        console.log('Se guardo nuevo Cart', newCart.cart_Id);
        return;
    }

    

    addProductInCart = (cid, product) => {
        this.readFile();

        const carts = this.cartOfProduct.find(cart => cart.cart_Id === cid);


        if (carts.cart.length === 0) {
            const newProduct = {
                prod_id: product.id,
                prod_stock: 1
            }
            carts.cart.push(newProduct);
            console.log(`SE GUARDO PRODUCTO ${product.id} EN CART ${cid}`);
            fs.writeFileSync(this.ruta, JSON.stringify(this.cartOfProduct));
            return;
        }

        console.log(carts);
        console.log(this.cartOfProduct);


        const prod = carts.cart.filter((_product) => _product.prod_id === product.id);


        if (prod && prod.length > 0) {
            carts.cart.forEach((_product) => {
                _product.prod_stock = _product.prod_stock + 1;
            })
            console.log('carts', carts);
            fs.writeFileSync(this.ruta, JSON.stringify(this.cartOfProduct));
            console.log(`SE ACTUALIZO STOCK EN CART ${cid}`);
            return;
        }


        const newProduct = {
            prod_id: product.id,
            prod_stock: 1
        }
        carts.cart.push(newProduct);
        console.log(`SE GUARDO PRODUCTO ${product.id} EN CART ${cid}`);
        fs.writeFileSync(this.ruta, JSON.stringify(this.cartOfProduct));

    }
}




const cartBase = new Carts('./data/carts.json');


cartBase.createCarts();


export default Carts;