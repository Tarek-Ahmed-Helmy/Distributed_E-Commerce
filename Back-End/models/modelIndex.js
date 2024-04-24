const Sequelize = require('sequelize')
const { db_EGY, db_MAR } = require('../config/database')

const ClientModel = require('./client')
const SellerModel = require("./seller");
const ProductModel = require("./product");
const CartModel = require("./cart");
const BuyModel = require("./buy");
const ContainModel = require("./contain");


// create models
const Client_EGY = ClientModel(db_EGY, Sequelize)
const Client_MAR = ClientModel(db_MAR, Sequelize);
const Seller_EGY = SellerModel(db_EGY, Sequelize);
const Seller_MAR = SellerModel(db_MAR, Sequelize);
const Product_EGY = ProductModel(db_EGY, Sequelize);
const Product_MAR = ProductModel(db_MAR, Sequelize);
const Cart_EGY = CartModel(db_EGY, Sequelize);
const Cart_MAR = CartModel(db_MAR, Sequelize);
const Buy_EGY = BuyModel(db_EGY, Sequelize);
const Buy_MAR = BuyModel(db_MAR, Sequelize);
const Contain_EGY = ContainModel(db_EGY, Sequelize);
const Contain_MAR = ContainModel(db_MAR, Sequelize);

// relationship
//Client & Cart (1 -> 1)
Client_EGY.belongsTo(Cart_EGY)
Cart_EGY.belongsTo(Client_EGY)

Client_MAR.belongsTo(Cart_MAR);
Cart_MAR.belongsTo(Client_MAR);

//Seller & Product (1 -> many)
Seller_EGY.hasMany(Product_EGY)
Product_EGY.belongsTo(Seller_EGY)

Seller_MAR.hasMany(Product_MAR);
Product_MAR.belongsTo(Seller_MAR);


// Client & Product (many -> many)
Client_EGY.belongsToMany(Product_EGY, { through: {model: Buy_EGY, unique: false}, as : "client1" })
Product_EGY.belongsToMany(Client_EGY, { through: { model: Buy_EGY, unique: false }, as: "product1" });

Client_MAR.belongsToMany(Product_MAR, { through: {model: Buy_MAR, unique: false}, as : "client2" })
Product_MAR.belongsToMany(Client_MAR, { through: { model: Buy_MAR, unique: false }, as: "product2" });

// Client_EGY.belongsToMany(Product_MAR, { through: {model: Buy, unique: false}, as : "client3" })
// Product_MAR.belongsToMany(Client_EGY, { through: { model: Buy, unique: false }, as: "product3" });

// Client_MAR.belongsToMany(Product_EGY, { through: {model: Buy, unique: false}, as : "client4" })
// Product_EGY.belongsToMany(Client_MAR, { through: {model: Buy, unique: false}, as: "product4" });

// Cart & Product (many -> many)
Cart_EGY.belongsToMany(Product_EGY, { through: {model: Contain_EGY, unique: false}, as : "cart1" })
Product_EGY.belongsToMany(Cart_EGY, { through: { model: Contain_EGY, unique: false }, as: "product3" });

Cart_MAR.belongsToMany(Product_MAR, { through: {model: Contain_MAR, unique: false}, as : "cart2" })
Product_MAR.belongsToMany(Cart_MAR, { through: {model: Contain_MAR, unique: false}, as: "product4" });



/// generate tables
db_EGY.sync({force: false}).then(()=>{
    console.log('Egypt Tables created')
})
db_MAR.sync({force: false}).then(()=>{
    console.log('Morocco Tables created')
})

module.exports = {
    Client_EGY,
    Client_MAR,
    Seller_EGY,
    Seller_MAR,
    Product_EGY,
    Product_MAR,
    Cart_EGY,
    Cart_MAR,
    Buy_EGY,
    Buy_MAR
}