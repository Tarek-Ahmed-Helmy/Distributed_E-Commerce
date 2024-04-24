const Sequelize = require('sequelize');
const { db_EGY, db_MAR } = require("../config/database");
const { Seller_EGY, Seller_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')


module.exports = {
    register: asyncWrapper(
        async (req, res, next) => {
            const country = req.body.country
            const duplicates = await Seller_EGY.findOne({
                    raw: true, where: { [Sequelize.Op.or]: [
                            { username: req.body.username },
                            { email: req.body.email }
                    ]}
                })
            if (duplicates) {
                const error = appError.create("Seller Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUND))
            const newSeller = {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    phone: req.body.phone,
                    bankAccount: req.body.bankAccount
            }
            const t1 = await db_EGY.transaction();
            const t2 = await db_MAR.transaction();
            try {
                await Seller_EGY.create( newSeller , { transaction: t1 });
                await Seller_MAR.create( newSeller , { transaction: t2 });
                await t1.commit();
                await t2.commit();
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Seller is Registered Successfully" });
            } catch (err) {
                if (t1) await t1.rollback();
                if (t2) await t2.rollback();
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
            }
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const seller = await Seller_EGY.findOne({
                    raw: true, where: {
                        [Sequelize.Op.or]: [
                            { username: req.body.username || null },
                            { email: req.body.email || null }
                    ]}
                })
            if (seller) {
                bcrypt.compare(req.body.password, seller.password, async (err, result) => {
                    if (result) {
                        delete seller.password
                        const token = await generateJWT(seller, process.env.ACCESS_TOKEN_PERIOD)
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, data: { token } })
                    }
                    const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                    return next(error)
                });
            } else {
                const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                return next(error)
            }
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const sellers = await Seller_EGY.findAll()
            if (sellers.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: sellers })
            }
            const error = appError.create("There are No Available Sellers", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedSeller = await Seller_EGY.findOne({
                where: {
                    sellerID: req.params.ID
                }
            })
            if (updatedSeller) {
                const t1 = await db_EGY.transaction();
                const t2 = await db_MAR.transaction();
                try {
                    await Seller_EGY.update(req.body, {
                        where: {
                            sellerID: req.params.ID
                        },
                        transaction: t1
                    })
                    await Seller_MAR.update(req.body, {
                        where: {
                            sellerID: req.params.ID
                        },
                        transaction: t2
                    })
                    await t1.commit();
                    await t2.commit();
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Seller Updated Successfully" });
                } catch (err) {
                    if (t1) await t1.rollback();
                    if (t2) await t2.rollback();
                    const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                    return next(error);
                }
            } 
            const error = appError.create("Seller Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedSeller = await Seller_EGY.findOne({
                where: {
                    sellerID: req.params.ID
                }
            })
            if (deletedSeller) {
                const t1 = await db_EGY.transaction();
                const t2 = await db_MAR.transaction();
                try {
                    await Seller_EGY.destroy({
                        where: {
                            sellerID: req.params.ID
                        },
                        transaction: t1
                    })
                    await Seller_MAR.destroy({
                        where: {
                            sellerID: req.params.ID
                        },
                        transaction: t2
                    })
                    await t1.commit();
                    await t2.commit();
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Seller Deleted Successfully" });
                } catch (err) {
                    if (t1) await t1.rollback();
                    if (t2) await t2.rollback();
                    const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                    return next(error);
                }
            }
            const error = appError.create("Seller Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
}