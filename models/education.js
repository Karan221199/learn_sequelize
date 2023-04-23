module.exports = (sequelize,DataTypes,Model) => {
    class Education extends Model {}
    
    Education.init({
      // Model attributes are defined here
      class: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grade: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      passing_year: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      ContactId: DataTypes.INTEGER
    }, {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Education' // We need to choose the model name
    });
    
    return Education
    }