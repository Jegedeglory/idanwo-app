"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = exports.GameEntryStructure = void 0;
const config_1 = require("../config");
exports.GameEntryStructure = {
    space: "GameEntry",
    description: "A Record Space for game entries",
    structure: {
        name: {
            description: "Name of the player",
            required: true,
            type: String
        },
        token: {
            description: "JWT token for the player",
            required: true,
            type: String
        }
    },
};
exports.GameEntryModel = (0, config_1.createRowSchema)(exports.GameEntryStructure);
exports.AuthModel = exports.GameEntryModel;
