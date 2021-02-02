import express from 'express';
import Product from "../model/productModel";
import { isAuth, isAdmin } from '../util';
const router = express.Router();

router.get("/",async (req,res) =>{
    const products = await Product.find({});
    res.send(products);
});
router.get("/:id",async (req,res) =>{
    const product = await Product.findOne({_id : req.params.id});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:"Product not found"});
    }
});
router.post("/",isAuth, async (req,res) =>{
    console.log(req.body);
    const product = new Product({
        name        : req.body.name,
        image       : req.body.image,
        brand       : req.body.brand,
        price       : req.body.price,
        category    : req.body.category,
        countInStock: req.body.countInStock,
        description : req.body.description,
        rating      : req.body.rating,
        numReviews  : req.body.numReviews,
        userId      : req.body.userId
    });
    const newProduct = await product.save();
    if(newProduct){
        res.status(201).send({message : 'New Product Created',data : newProduct});
    }
    return res.status(500).send({message : 'Error in Creating Product.'});
});

router.put("/:id",isAuth,isAdmin, async (req,res) =>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(product);
    if(product){
        product.name = req.body.name
        product.image       = req.body.image;
        product.brand       = req.body.brand;
        product.price       = req.body.price;
        product.category    = req.body.category;
        product.countInStock= req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if(updatedProduct){
            res.status(200).send({message : 'Product udated',data : updatedProduct});
        }
    }
    return res.status(500).send({message : 'Error in Updating Product.'});
});

router.delete("/:id",isAuth,isAdmin,async(req,res) =>{
    const deleteProduct = await Product.findById(req.params.id);
    if(deleteProduct){
        deleteProduct.remove();
        res.send({message:"Product Deleted"});
    }
    else{
        res.send("Error in Deletion.");
    }
});

export default router;