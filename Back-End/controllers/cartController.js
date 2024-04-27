const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')

module.exports = {
    getProduct: asyncWrapper(
        async(req, res, next)=>{

        } 
    ),
    getAllProducts: asyncWrapper(
        async(req, res, next)=>{
            
        }
    ),
    addStock: asyncWrapper( // two cases: 1- there is a product then add quantity. 2- there isn't then add entry
        async(req, res, next)=>{
            
        }
    )
}