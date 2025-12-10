const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', logging: false
});

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password_hash: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'user' }
});

const Property = sequelize.define('Property', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL,
  type: DataTypes.STRING, // sale/rent
  bedrooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  area_sqft: DataTypes.INTEGER,
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  postal_code: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  status: { type: DataTypes.STRING, defaultValue: 'active' }
});

const PropertyImage = sequelize.define('PropertyImage', {
  url: DataTypes.STRING,
  alt_text: DataTypes.STRING
});

User.hasMany(Property, { foreignKey: 'created_by' });
Property.belongsTo(User, { foreignKey: 'created_by' });
Property.hasMany(PropertyImage, { foreignKey: 'propertyId', onDelete: 'cascade' });
PropertyImage.belongsTo(Property, { foreignKey: 'propertyId' });

module.exports = { sequelize, User, Property, PropertyImage };
