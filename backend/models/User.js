const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM('farmer', 'buyer'),
        allowNull: false, // No default - must be provided at registration
    },
    name: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    cropInterests: {
        type: DataTypes.JSONB, // Use JSONB for arrays in Postgres
        defaultValue: [],
    },
    buyingPreferences: {
        type: DataTypes.JSONB,
        defaultValue: [],
    },
    documents: {
        type: DataTypes.JSONB,
        defaultValue: [],
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    kycStatus: {
        type: DataTypes.ENUM('pending', 'verified', 'rejected', 'none'),
        defaultValue: 'none',
    },
}, {
    timestamps: true,
});

module.exports = User;
