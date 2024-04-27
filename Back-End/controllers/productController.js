const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR, Product_EGY, Product_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT');
const { db_EGY, db_MAR } = require("../config/database");


module.exports = {
    getProduct: asyncWrapper(
        async(req, res, next)=>{        
            const product = await Product_EGY.findOne({
                where: {
                    productID: req.params.productID
                }
            })
            if(product){
                return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Product found Successfully", data: product})
            }
            return res.status(404).json({status: httpStatusCode.FAIL, message: "There is no such product"})
        } 
    ),
    getAllProductsSeller: asyncWrapper(
        async(req, res, next)=>{
            const products = await Product_MAR.findAll({
                where: {
                    sellerSellerID: req.params.sellerID
                }}
            )
            if(products.length!=0){
                return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Products found Successfully for this seller", data: products})
            }
            else{
                return res.status(404).json({status: httpStatusCode.FAIL, message: "There is no such products for this seller"})
            }
        }
    ),
    getAllProducts: asyncWrapper( // for one category
        async(req, res, next)=>{
            const products = await Product_EGY.findAll({
                where: {
                    category_name: req.params.category_name
                }
            })
            if(products){
                return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Products found Successfully", data: products})
            }
            return res.status(404).json({status: httpStatusCode.FAIL, message: "There is no products in this category"})
        }
    ),
    addStock: asyncWrapper( // two cases: 1- there is a product then add quantity. 2- there isn't then add entry
        async(req, res, next)=>{
            // i have product id and product name
            // create transactions
            const t1 = await db_EGY.transaction();
            const t2 = await db_MAR.transaction();
            try {
                await Product_EGY.update({quantity_available: req.body.quantity_available}, {where: {
                    productID: req.body.productID
                }}, {transaction: t1})
                await Product_MAR.update({quantity_available: req.body.quantity_available}, {where: {
                    productID: req.body.productID
                }}, {transaction: t2})
                await t1.commit();
                await t2.commit();
                return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Quantity Updated Successfully"})
            }
            catch(err){
                if (t1) await t1.rollback();
                if (t2) await t2.rollback();
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
            }
        }
    ),
    addProduct: asyncWrapper(
        async(req, res, next)=>{
            const t1 = await db_EGY.transaction();
            const t2 = await db_MAR.transaction();
            try {
                const productEGY = await Product_EGY.create(req.body, {transaction: t1})
                const productMAR = await Product_MAR.create(req.body, {transaction: t2})
                await t1.commit();
                await t2.commit();
                return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Product added Successfully", data: [productEGY, productMAR]})
            }
            catch(err){
                if (t1) await t1.rollback();
                if (t2) await t2.rollback();
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
            }
            
        }
    )
}