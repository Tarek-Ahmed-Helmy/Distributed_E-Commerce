module.exports = (db, type) => {
    return db.define ('contain', {
        quantity:{
            type: type.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}