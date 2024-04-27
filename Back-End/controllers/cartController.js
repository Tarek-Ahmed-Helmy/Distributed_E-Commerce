const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR, Contain_EGY, Product_EGY, Contain_MAR, Product_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')

module.exports = {
    getAllProducts: asyncWrapper(
        async(req, res, next)=>{
            const country = req.currentUser.country 
            if(country=="EGY"){
                const entries = await Contain_EGY.findAll({
                    where:{
                        cartId: req.currentUser.cartId
                    }
                })
                let validIDs = []
                for (let index = 0; index < entries.length; index++) {
                    validIDs.push(entries[index].productID)
                }
                const products = await Product_EGY.findAll({
                    where: {
                        productID:{
                            [Op.in]: validIDs
                        }
                    }
                })
                if(products){
                    return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Products found Successfully", data: products})
                }
                return res.status(404).json({status: httpStatusCode.FAIL, message: "The cart is empty"})
            }
            else{
                const entries = await Contain_MAR.findAll({
                    where:{
                        cartId: req.currentUser.cartId
                    }
                })
                let validIDs = []
                for (let index = 0; index < entries.length; index++) {
                    validIDs.push(entries[index].productID)
                }
                const products = await Product_MAR.findAll({
                    where: {
                        productID:{
                            [Op.in]: validIDs
                        }
                    }
                })
                if(products){
                    return res.status(200).json({status: httpStatusCode.SUCCESS, message: "Products found Successfully", data: products})
                }
                return res.status(404).json({status: httpStatusCode.FAIL, message: "The cart is empty"})
            
            }
        }
    )
}