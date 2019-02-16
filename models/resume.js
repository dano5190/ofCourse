module.exports = function(sequelize, DataTypes){
    var Resume = sequelize.define("Resume", {
        username: DataTypes.TEXT,
        email: DataTypes.TEXT,
        phone: DataTypes.TEXT,
        summary: DataTypes.TEXT,
        education: DataTypes.TEXT,
        employment: DataTypes.TEXT,
        refs: DataTypes.TEXT
    });
    return Resume;
};