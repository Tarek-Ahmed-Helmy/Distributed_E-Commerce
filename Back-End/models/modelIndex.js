const Sequelize = require('sequelize')
const { db_EGY, db_MAR } = require('../config/database')

const ClientModel = require('./client')
const SellerModel = require("./seller");
const ProductModel = require("./product");
const CartModel = require("./cart");
const OrderModel = require("./order");
const IncludeModel = require("./include");
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
const Contain_EGY = ContainModel(db_EGY, Sequelize);
const Contain_MAR = ContainModel(db_MAR, Sequelize);
const Order_EGY = OrderModel(db_EGY, Sequelize);
const Order_MAR = OrderModel(db_MAR, Sequelize);
const Include_EGY = IncludeModel(db_EGY, Sequelize);
const Include_MAR = IncludeModel(db_MAR, Sequelize);


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

// Cart & Product (many -> many)
Cart_EGY.belongsToMany(Product_EGY, { through: {model: Contain_EGY, unique: false}, as : "cart1" })
Product_EGY.belongsToMany(Cart_EGY, { through: { model: Contain_EGY, unique: false }, as: "product1" });

Cart_MAR.belongsToMany(Product_MAR, { through: {model: Contain_MAR, unique: false}, as : "cart2" })
Product_MAR.belongsToMany(Cart_MAR, { through: { model: Contain_MAR, unique: false }, as: "product2" });

// Client & Order (1 -> many)
Client_EGY.hasMany(Order_EGY);
Order_EGY.belongsTo(Client_EGY);

Client_MAR.hasMany(Order_MAR);
Order_MAR.belongsTo(Client_MAR);

// Order & Product (many -> many)
Order_EGY.belongsToMany(Product_EGY, { through: {model: Include_EGY, unique: false}, as : "order1" });
Product_EGY.belongsToMany(Order_EGY, { through: {model: Include_EGY, unique: false}, as : "product3" });

Order_MAR.belongsToMany(Product_MAR, { through: {model: Include_MAR, unique: false}, as : "order2" });
Product_MAR.belongsToMany(Order_MAR, { through: {model: Include_MAR, unique: false}, as : "product4" });


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
    Order_EGY,
    Order_MAR,
    Include_EGY,
    Include_MAR,
    Contain_EGY,
    Contain_MAR
}