const { Order_EGY, Order_MAR, Include_EGY, Include_MAR, Product_EGY, Product_MAR, Seller_EGY, Seller_MAR, Contain_EGY, Contain_MAR } = require("../models/modelIndex");
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { db_EGY, db_MAR } = require("../config/database");
const product = require("../models/product");
const { where } = require("sequelize");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports = {
    checkout: asyncWrapper(
        async (req, res, next) => {
            const { country, cartId } = req.currentUser;
            const { clientID, totalPrice, cart, cardToken } = req.body;
            let OrderModel, ProductModel, IncludeModel, transaction, SellerModel, ContainModel;
            if (country === 'EGY') {
                OrderModel = Order_EGY;
                ProductModel = Product_EGY;
                IncludeModel = Include_EGY;
                SellerModel = Seller_EGY;
                ContainModel = Contain_EGY;
                transaction = await db_EGY.transaction();
            } else if (country === 'MAR') {
                OrderModel = Order_MAR;
                ProductModel = Product_MAR;
                IncludeModel = Include_MAR;
                SellerModel = Seller_MAR;
                ContainModel = Contain_MAR;
                transaction = await db_MAR.transaction();
            } else {
                return next(appError.create("Invalid country code", 400, httpStatusCode.ERROR));
            }
            let t1, t2;
            try {
                t1 = await db_EGY.transaction();
                t2 = await db_MAR.transaction();
                const order = await OrderModel.create({ clientClientID: clientID, totalPrice: totalPrice }, { transaction });
                for (const item of cart) {
                    const product = await ProductModel.findOne({ raw:true, where: { productID: item.productID } });
                    if (!product || product.quantity_available < item.quantity) {
                        await Promise.all([t1.rollback(), t2.rollback(), transaction.rollback()]);
                        const error = appError.create(`Quantity Available for this product is insufficient`, 400, httpStatusCode.ERROR)
                        return next(error);
                    }
                    await Product_EGY.update({
                        quantity_available: product.quantity_available - item.quantity,
                        quantity_sold: product.quantity_sold + item.quantity
                    }, { where: { productID: item.productID }, transaction: t1 });
                    await Product_MAR.update({
                        quantity_available: product.quantity_available - item.quantity,
                        quantity_sold: product.quantity_sold + item.quantity
                    }, { where: { productID: item.productID }, transaction: t2 });
                    await ContainModel.destroy({ where: { cartId: cartId } });
                    const seller = await SellerModel.findOne({ raw: true, where: { sellerID: product.sellerSellerID } });
                    await Seller_EGY.update({ balance: seller.balance + (item.quantity * product.price) }, { where: { sellerID: seller.sellerID }, transaction: t1 });
                    await Seller_MAR.update({ balance: seller.balance + (item.quantity * product.price) }, { where: { sellerID: seller.sellerID }, transaction: t2 });
                    const newItem = {
                        orderOrderID: order.orderID,
                        productProductID: item.productID,
                        quantity: item.quantity
                    };
                    await IncludeModel.create(newItem, { transaction });
                }
                await ContainModel.destroy({ where: { cartId: cartId } });
                await stripe.charges.create({
                    amount: totalPrice * 100,
                    currency: 'usd',
                    source: cardToken,
                    description: 'Test Payment'
                });
                await Promise.all([t1.commit(), t2.commit(), transaction.commit()]);
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Order is Created and Successfully Paid" });
            } catch (err) {
                if (t1 && !t1.finished) await t1.rollback();
                if (t2 && !t2.finished) await t2.rollback();
                if (transaction && !transaction.finished) await transaction.rollback();
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
            }
        }
    ),
    getPurchased: asyncWrapper(
        async (req, res, next) => {
            const { country, clientID } = req.currentUser;
            let OrderModel, IncludeModel, ProductModel;
            if (country === 'EGY') {
                OrderModel = Order_EGY;
                IncludeModel = Include_EGY;
                ProductModel = Product_EGY;
            } else if (country === 'MAR') {
                OrderModel = Order_MAR;
                IncludeModel = Include_MAR;
                ProductModel = Product_MAR;
            } else {
                return next(appError.create("Invalid country code", 400, httpStatusCode.ERROR));
            }
            const orders = await OrderModel.findAll({ raw: true, where: { clientClientID : clientID } });
            let purchased = [];
            for (const order of orders) {
                const items = await IncludeModel.findAll({
                    raw: true,
                    where: { orderOrderID: order.orderID }
                });
                for (const item of items) {
                    const product = await ProductModel.findOne({ raw: true, where: { productID: item.productProductID } });
                    if (product) {
                        const index = purchased.findIndex(p => p.productProductID === item.productProductID);
                        if (index !== -1) {
                            purchased[index].quantity += item.quantity;
                        } else {
                            purchased.push({
                                productProductID: item.productProductID,
                                name: product.name,
                                quantity: item.quantity,
                                image: product.image
                            });
                        }
                    }
                }
            }
            if (purchased.length > 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: purchased });
            } else {
                const error = appError.create("There are no purchased products available", 404, httpStatusCode.ERROR);
                return next(error);
            }
        }
    )
}