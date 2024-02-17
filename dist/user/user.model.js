"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const UserModel = db_1.sequelize.define("users", {
    id: {
        type: db_1.DataTypes.UUID,
        defaultValue: db_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: db_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: db_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: db_1.DataTypes.STRING,
        allowNull: false,
    },
    isMale: {
        type: db_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
}, {
    timestamps: true
});
exports.default = UserModel;
