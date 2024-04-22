module.exports = (db, type) => {
    return db.define('products', {
        id:{
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
        description:{
            type: type.TEXT,
            allowNull: false
        },
        category_name:{
            type: type.STRING,
            allowNull: false
        }
    })

}
