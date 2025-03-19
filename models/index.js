'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Use environment variable for database URL if available (for Render deployment)
const databaseUrl = process.env.DATABASE_URL;

let sequelize;

try {
  if (databaseUrl) {
    // Connect using DATABASE_URL from Render
    console.log("🌍 Connecting to production database...");
    sequelize = new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: console.log, // Enable logging in production for debugging
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Required for Render’s PostgreSQL
        }
      }
    });
  } else {
    // Local database configuration (for development)
    console.log("🛠 Connecting to local database...");
    const config = require(path.join(__dirname, '/../config/config.json'))[env];

    sequelize = new Sequelize(config.database, config.username, config.password, {
      ...config,
      logging: false, // Disable query logging locally
    });
  }

  // Test the connection
  sequelize.authenticate()
    .then(() => console.log("✅ Database connection successful"))
    .catch(err => {
      console.error("❌ Database connection error:", err);
      process.exit(1); // Exit process if connection fails
    });

} catch (error) {
  console.error("🚨 Sequelize initialization error:", error);
  process.exit(1);
}

// Load all models dynamically
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if applicable
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
