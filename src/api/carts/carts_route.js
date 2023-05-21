//maneja los endpoint de usuarios

import { Router } from 'express';
import Carts from './carts.js';
import ProductManager from '../products/productos.js';
import {__dirname} from '../../utils.js'

//const express = require('express');
//const productos = require('../productos');
//const carts = require('../api/carts/carts');


const router_carts = Router();

const cart = new Carts(`${__dirname}/data/carts.json`);
const products = new ProductManager(`${__dirname}/data/productos.json`);



 
router_carts.get('/carts_index', async (req, res) => {
    const carts = await cart.getCart();
    res.render('index_carts', {
        carts: carts
    });
});

/*
router_carts.get('/carts/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    res.json(cart.getCart(cid));
})
*/

router_carts.post('/carts', (req, res) => {
    const cart1 = req.body;

    cart.addCart(cart1);
    res.status(202).send({estado: 'ok'});
})


router_carts.post('/carts/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const product = products.getProductById(pid);

    cart.addProductInCart(cid, product);
    res.status(202).send({estado: 'ok'});
})



export default router_carts;
