const Sequelize = require("sequelize");
const { Order_EGY, Order_MAR, Include_EGY, Include_MAR } = require("../models/modelIndex");
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { db_EGY, db_MAR } = require("../config/database");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports = {
    checkout: asyncWrapper(
        async (req, res, next) => {
            const country = req.currentUser.country
            const newOrder = {
                clientClientId: req.body.clientID,
                totalPrice: req.body.totalPrice
            }
            let order
            if (country === 'EGY') {
                let transaction;
                try {
                    transaction = await db_EGY.transaction();
                    order = await Order_EGY.create(newOrder, { transaction });
                    for (const object of req.body.cart) {
                        let newItem = {
                            orderID: order.orderID,
                            ProductID: object.ProductID,
                            quantity: object.quantity
                        }
                        await Include_EGY.create(newItem, { transaction });
                    }
                    await transaction.commit();
                    stripe.charges.create({
                        amount: req.body.totalPrice * 100, // Amount in cents
                        currency: 'usd',
                        source: req.body.cardToken, // Use a test card token
                        description: 'Test Payment',
                        }, async function(err, charge) {
                        if (err) {
                            await Include_EGY.destroy({ where: { orderID : order.orderID}})
                            await Order_EGY.destroy({ where: { orderID: order.orderID } })
                            return next(err)
                        }
                    });
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Order is Created and Successfully Paid" });
                } catch (err) {
                    if (transaction) await transaction.rollback();
                    const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL)
                    return next(error)
                }
            } else if (country === 'MAR') {
                let transaction;
                try {
                    transaction = await db_MAR.transaction();
                    order = await Order_MAR.create(newOrder, { transaction });
                    for (const object of req.body.cart) {
                        let newItem = {
                            orderID: order.orderID,
                            ProductID: object.ProductID,
                            quantity: object.quantity
                        }
                        await Include_MAR.create(newItem, { transaction });
                    }
                    await transaction.commit();
                    stripe.charges.create({
                        amount: req.body.totalPrice * 100, // Amount in cents
                        currency: 'usd',
                        source: req.body.cardToken, // Use a test card token
                        description: 'Test Payment',
                        }, async function(err, charge) {
                        if (err) {
                            await Include_MAR.destroy({ where: { orderID : order.orderID}})
                            await Order_MAR.destroy({ where: { orderID: order.orderID } })
                            return next(err)
                        }
                    });
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Order is Created Successfully" });
                } catch (err) {
                    if (transaction) await transaction.rollback();
                    const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL)
                    return next(error)
                }
            }
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const country = req.currentUser.country
            if (country === 'EGY') {
                const orders = await Order_EGY.findAll({ raw: true })
                if (orders.length != 0) {
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, data: orders });
                }
                const error = appError.create("There are No Available orders", 404, httpStatusCode.ERROR);
                return next(error);
            } else if (country === 'MAR') {
                const orders = await Order_MAR.findAll({ raw: true })
                if (orders.length != 0) {
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, data: orders });
                }
                const error = appError.create("There are No Available orders", 404, httpStatusCode.ERROR);
                return next(error);
            }
        }
    ),
    getOrder: asyncWrapper(
        async (req, res, next) => {
            const country = req.currentUser.country
            if (country === 'EGY') {
                const order = await Include_EGY.findAll({
                    raw: true, where: {
                        orderID : req.params.ID
                    }
                })
                if (order.length != 0) {
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, data: order });
                }
                const error = appError.create("There are No Available orders", 404, httpStatusCode.ERROR);
                return next(error);
            } else if (country === 'MAR') {
                const order = await Order_MAR.findAll({
                    raw: true, where: {
                        orderID : req.params.ID
                    }
                })
                if (order.length != 0) {
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, data: order });
                }
                const error = appError.create("There are No Available orders", 404, httpStatusCode.ERROR);
                return next(error);
            }
        }
    )
}