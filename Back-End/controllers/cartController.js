const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')

module.exports = {
    get: asyncWrapper(
        async(req, res, next)=>{

        } 
    ),
    get: asyncWrapper(
        async(req, res, next)=>{
            
        }
    ),
    get: asyncWrapper(
        async(req, res, next)=>{
            
        }
    )
}