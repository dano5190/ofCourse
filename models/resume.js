module.exports = function(sequelize, DataTypes){
    var Resume = sequelize.define("Resume", {
        username: DataTypes.TEXT,
        email: DataTypes.TEXT,
        phone: DataTypes.TEXT,
        summary: DataTypes.TEXT('long'),
        education: DataTypes.TEXT('long'),
        employment: DataTypes.TEXT('long'),
        refs: DataTypes.TEXT('long')
    });
    return Resume;
};