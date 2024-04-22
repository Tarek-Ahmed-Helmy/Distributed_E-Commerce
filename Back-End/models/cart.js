module.exports = (db, type)=>{
    return db.define('carts', {
        id:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    })
}