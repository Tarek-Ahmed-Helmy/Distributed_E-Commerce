module.exports = (db, type) => {
    return db.define('includes', {
        quantity:{
            type: type.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}