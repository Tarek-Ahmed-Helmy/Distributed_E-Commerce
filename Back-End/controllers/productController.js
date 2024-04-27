const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR, Product_EGY, Product_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')

module.exports = {
    getProduct: asyncWrapper(
        async(req, res, next)=>{
            const country = req.params.country
            if(country = "EGY"){
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
            else{
                const product = await Product_MAR.findOne({
                    where: {
                        productID: req.params.productID
                    }
                })
                if(product){
                    return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Product found Successfully", data: product})
                }
                return res.status(404).json({status: httpStatusCode.FAIL, message: "There is no such product"})
            }
        } 
    ),
    getAllProducts: asyncWrapper( // for one category
        async(req, res, next)=>{
            // i have country, category in req.params
            const country = req.params.country
            if(country=="EGY"){
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
            else{
                const products = await Product_MAR.findAll({
                    where: {
                        category_name: req.params.category_name
                    }
                })
                if(products){
                    return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Products found Successfully", data: products})
                }
                return res.status(404).json({status: httpStatusCode.FAIL, message: "There is no products in this category"})
            }
        }
    ),
    addStock: asyncWrapper( // two cases: 1- there is a product then add quantity. 2- there isn't then add entry
        async(req, res, next)=>{
            
        }
    )
}