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
const Seller = SellerModel(db_EGY, Sequelize);
const Product_EGY = ProductModel(db_EGY, Sequelize);
const Product_MAR = ProductModel(db_MAR, Sequelize);
const Cart = CartModel(db_EGY, Sequelize);
const Buy = BuyModel(db_EGY, Sequelize);
const Contain = ContainModel(db_EGY, Sequelize);

// relationship
//Client & Cart (1 -> 1)
Client_EGY.belongsTo(Cart)
Cart.belongsTo(Client_EGY)

Client_MAR.belongsTo(Cart);
Cart.belongsTo(Client_MAR);

//Seller & Product (1 -> many)
Seller.hasMany(Product_EGY)
Product_EGY.belongsTo(Seller)

Seller.hasMany(Product_MAR);
Product_MAR.belongsTo(Seller);


// Client & Product (many -> many)
Client_EGY.belongsToMany(Product_EGY, { through: {model: Buy, unique: false}, as : "client1" })
Product_EGY.belongsToMany(Client_EGY, { through: { model: Buy, unique: false }, as: "product1" });

Client_MAR.belongsToMany(Product_MAR, { through: {model: Buy, unique: false}, as : "client2" })
Product_MAR.belongsToMany(Client_MAR, { through: { model: Buy, unique: false }, as: "product2" });

Client_EGY.belongsToMany(Product_MAR, { through: {model: Buy, unique: false}, as : "client3" })
Product_MAR.belongsToMany(Client_EGY, { through: { model: Buy, unique: false }, as: "product3" });

Client_MAR.belongsToMany(Product_EGY, { through: {model: Buy, unique: false}, as : "client4" })
Product_EGY.belongsToMany(Client_MAR, { through: {model: Buy, unique: false}, as: "product4" });

// Cart & Product (many -> many)
Cart.belongsToMany(Product_EGY, { through: {model: Contain, unique: false}, as : "cart1" })
Product_EGY.belongsToMany(Cart, { through: { model: Contain, unique: false }, as: "product5" });

Cart.belongsToMany(Product_MAR, { through: {model: Contain, unique: false}, as : "cart2" })
Product_MAR.belongsToMany(Cart, { through: {model: Contain, unique: false}, as: "product6" });



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
    Seller,
    Product_EGY,
    Product_MAR,
    Cart
}