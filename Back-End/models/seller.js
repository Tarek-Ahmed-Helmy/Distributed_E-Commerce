module.exports = (db, type) => {
    return db.define('sellers', {
        sellerID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fname: {
            type: type.STRING,
            allowNull: false 
        },
        lname: {
            type: type.STRING,
            allowNull: false
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.TEXT,
            allowNull: false
        },
        phone: {
            type: type.TEXT,
            allowNull: false
        },
        role: {
            type: type.STRING,
            defaultValue: 'seller',
            readOnly: true
        },
        bankAccount: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}