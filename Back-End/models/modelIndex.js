const Sequelize = require('sequelize')
const { db_EGY, db_MAR } = require('../config/database')

const ClientModel = require('./client')
const SellerModel = require("./seller");
const ProductModel = require("./product");
const CartModel = require("./cart");


// create model
const Client_EGY = ClientModel(db_EGY, Sequelize)
const Client_MAR = ClientModel(db_MAR, Sequelize);
const Seller = SellerModel(db_EGY, Sequelize);
const Product_EGY = ProductModel(db_EGY, Sequelize);
const Product_MAR = ProductModel(db_MAR, Sequelize);
const Cart = CartModel(db, Sequelize);