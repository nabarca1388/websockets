//maneja los endpoint de products

import { Router } from 'express';
import ProductManager from './productos.js';
import {__dirname} from '../../utils.js';

//const express = require('express');
//const productos = require('../productos');


const router_products = Router();

const product = new ProductManager(`${__dirname}/data/productos.json`);


router_products.get('/products_index', async (req, res) => {
    const products = await product.getProducts();
    res.render('index_products', {
        products: products
    });
});


router_products.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(product.getProductById(id));
})


router_products.get('/products_index', (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = product.getProducts(limit);
    
    res.render('index_products', {
        products: products
    });
});


router_products.post('/products', (req, res) => {
    const productoNuevo = req.body;
    
    product.addProduct(productoNuevo)
    res.status(200).send({ estado: 'ok', mensaje: 'producto ingresado'});
});


router_products.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoNuevo = req.body;

    product.updateProduct(productoNuevo, id);
    res.status(200).send({ estado: 'ok', mensaje: 'producto modificado'});
})


router_products.delete('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    res.json(product.deleteProduct(id));
    res.status(200).send({ estado: 'ok', mensaje: 'producto eliminado'});
})



export default router_products;



