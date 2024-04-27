module.exports = (db, type) => {
    return db.define('products', {
        productID:{
            type: type.INTEGER,
            autoIncrement: true, 
            primaryKey: true
        },
        name:{
            type:type.STRING,
            allowNull:false
        },
        quantity_available:{
            type: type.INTEGER, 
            allowNull: false
        },
        quantity_sold:{
            type: type.INTEGER, 
            defaultValue: 0,
            allowNull: false
        },
        description:{
            type: type.TEXT,
            allowNull: false
        },
        category_name:{
            type: type.STRING,
            allowNull: false
        },
        price: {
            type: type.FLOAT,
            allowNull: false
        },
        image: {
            type: type.TEXT,
            allowNull: false
        }
    }, {
        timestamps: false
    })

}
