const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR, Contain_EGY , Contain_MAR, Cart_EGY, Cart_MAR} = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT');
const clientController = require('./clientController');

module.exports = {
    addProduct: asyncWrapper(
        async(req, res, next)=>{
            const country = req.currentUser.country
            if(country=="EGY"){
                const entry = await Contain_EGY.create({quantity: 1, productID: req.body.productID, cartId: req.currentUser.cartId})
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Product is added Successfully", data: entry });
            }
            else{
                const entry = await Contain_MAR.create({quantity: 1, productID: req.body.productID, cartId:  req.currentUser.cartId})
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Product is added Successfully", data: entry });                
            }
        }
    ),
    deleteProduct: asyncWrapper(
        async(req, res, next)=>{
            const country = req.currentUser.country
            const cartId = req.currentUser.cartId
            if(country=="EGY"){
                let entry = await Contain_EGY.findOne({
                    where: {
                        productID: req.body.productID,
                        cartId: cartId
                    }
                })
                if(entry){
                    await Contain_EGY.destroy({
                        where: {
                            productID: req.body.productID,
                            cartId: cartId
                        }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Product is deleted from cart Successfully" });
                }
                
                return res.status(400).json({ status: httpStatusCode.FAIL, message: "Unexpected behavior" });
            }
            else{
                let entry = await Contain_MAR.findOne({
                    where: {
                        productID: req.body.productID,
                        cartId: cartId
                    }
                })
                if(entry){
                    await Contain_MAR.destroy({
                        where: {
                            productID: req.body.productID,
                            cartId: cartId
                        }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Product is deleted from cart Successfully" });
                }
                
                return res.status(400).json({ status: httpStatusCode.FAIL, message: "Unexpected behavior" });
            }
        }
    )
}