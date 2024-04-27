const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR, Contain_EGY , Contain_MAR} = require('../models/modelIndex')
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
            const quantity = req.body.quantity
            if(client.country=="EGY"){
                // check whether there is an entry or not
                let entry = await Contain_EGY.findOne({
                    where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                    }
                })
                if(entry){
                    await Contain_EGY.update({quantity: quantity}, {
                        where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                        }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Quantity is updated Successfully" });
                }
                entry = await Contain_EGY.create({quantity: quantity, productID: req.body.productID, cartID: req.body.cartID})
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Product is added Successfully" });
            }
            else{
                let entry = await Contain_MAR.findOne({
                    where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                    }
                })
                if(entry){
                    await Contain_MAR.update({quantity: quantity}, {
                        where: {
                            productID: req.body.productID,
                            cartID: req.body.cartID
                            }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Quantity is updated Successfully" });
                }
                entry = await Contain_MAR.create({quantity: quantity, productID: req.body.productID, cartID: req.body.cartID})
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Product is added Successfully" });
                
            }
        }
    ),
    deleteProduct: asyncWrapper(
        async(req, res, next)=>{
            const quantity = req.body.quantity
            if(client.country=="EGY"){
                // check whether there is an entry or not
                let entry = await Contain_EGY.findOne({
                    where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                    }
                })
                if(entry){
                    await Contain_EGY.update({quantity: quantity}, {
                        where: {
                            productID: req.body.productID,
                            cartID: req.body.cartID
                            }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Quantity is updated Successfully" });
                }
                entry = await Contain_EGY.destroy({
                    where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Product is deleted Successfully" });
            }
            else{
                let entry = await Contain_MAR.findOne({
                    where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                    }
                })
                if(entry){
                    await Contain_MAR.update({quantity: quantity}, {
                        where: {
                            productID: req.body.productID,
                            cartID: req.body.cartID
                            }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Quantity is updated Successfully" });
                }
                entry = await Contain_MAR.destroy({
                    where: {
                        productID: req.body.productID,
                        cartID: req.body.cartID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Product is deleted Successfully" });
                
            }
        }
    )
}