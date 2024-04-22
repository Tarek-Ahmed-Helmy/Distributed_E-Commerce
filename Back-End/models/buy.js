
module.exports = (db, type) => {
    return db.define('buy', {
        price: {
            type: type.FLOAT,
            allowNull: false
        }
    }, {
        timestamp: true
    }
    )
}