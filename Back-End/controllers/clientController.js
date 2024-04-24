const Sequelize = require('sequelize');
const { Client_EGY, Client_MAR } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')


module.exports = {
    register: asyncWrapper(
        async (req, res, next) => {
            const country = req.body.country
            const duplicates = await Promise.all([
                Client_EGY.findOne({
                    raw: true, where: { [Sequelize.Op.or]: [
                            { username: req.body.username },
                            { email: req.body.email }
                    ]}
                }),
                Client_MAR.findOne({
                    raw: true, where: { [Sequelize.Op.or]: [
                            { username: req.body.username },
                            { email: req.body.email }
                    ]}
                })
            ]);
            if (duplicates[0] != null || duplicates[1] != null) {
                const error = appError.create("Client Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
            const newClient = {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    phone: req.body.phone,
                    country: req.body.country,
                    cardInfo: req.body.cardInfo
                }
            if (country === 'EGY') {
                await Client_EGY.create(newClient)
            } else if (country === 'MAR') {
                await Client_MAR.create(newClient)
            }
            return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Client is Registered Successfully" });
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const client = await Promise.all([
                Client_EGY.findOne({
                    raw: true, where: {
                        [Sequelize.Op.or]: [
                            { username: req.body.username || null },
                            { email: req.body.email || null }
                    ]}
                }),
                Client_MAR.findOne({
                    raw: true, where: { [Sequelize.Op.or]: [
                            { username: req.body.username || null},
                            { email: req.body.email || null }
                    ]}
                })
            ]);
            if (client[0] != null) {
                const enteredPassword = req.body.password;
                bcrypt.compare(enteredPassword, client[0].password, async (err, result) => {
                    if (result) {
                        delete client[0].password
                        const token = await generateJWT(client[0], process.env.ACCESS_TOKEN_PERIOD)
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, data: { token } })
                    }
                    const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                    return next(error)
                });
            } else if (client[1] != null) {
                const enteredPassword = req.body.password;
                bcrypt.compare(enteredPassword, client[1].password, async (err, result) => {
                    if (result) {
                        delete client[1].password
                        const token = await generateJWT(client[1], process.env.ACCESS_TOKEN_PERIOD)
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
            const clients = await Promise.all([Client_EGY.findAll(), Client_MAR.findAll()])
            if (clients[0] != null && clients[1] != null) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: clients })
            }
            const error = appError.create("There are No Available Clients", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const country = req.currentUser.country
            let updatedClient
            if (country === 'EGY') {
                updatedClient = await Client_EGY.findOne({
                    where: {
                        clientID: req.params.ID
                    }
                })
            } else if (country === 'MAR') {
                updatedClient = await Client_MAR.findOne({
                    where: {
                        clientID: req.params.ID
                    }
                })
            }
            if (updatedClient && country === 'EGY' ) {
                await Client_EGY.update(req.body, {
                    where: {
                        clientID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully" });
            } else if (updatedClient && country === 'MAR') {
                await Client_MAR.update(req.body, {
                    where: {
                        clientID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const country = req.currentUser.country
            let deletedClient;
            if (country === 'EGY') {
                deletedClient = await Client_EGY.findOne({
                    where: {
                        clientID: req.params.ID
                    }
                })
            } else if (country === 'MAR') {
                deletedClient = await Client_MAR.findOne({
                    where: {
                        clientID: req.params.ID
                    }
                })
            }
            if (deletedClient && country === 'EGY' ) {
                await Client_EGY.destroy({
                    where: {
                        clientID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Deleted Successfully" });
            } else if (deletedClient && country === 'MAR') {
                await Client_MAR.destroy({
                    where: {
                        clientID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Deleted Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
}