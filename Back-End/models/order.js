module.exports = (db, type)=>{
    return db.define('orders', {
        id:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps: true
    })
}