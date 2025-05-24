"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
exports.Nobox =
  exports.createKeyGroupSchema =
  exports.createRowSchema =
  exports.config =
    void 0;
const { getFunctions, getSchemaCreator } = require("nobox-client");
const variables_1 = require("../config/variable");

// Nobox configuration
exports.config = {
  endpoint: variables_1.NOBOX_ENDPOINT,
  project: variables_1.NOBOX_PROJECT,
  token: variables_1.NOBOX_TOKEN,
};

// Create schema creators
exports.createRowSchema = getSchemaCreator(exports.config, {
  type: "rowed",
});
exports.createKeyGroupSchema = getSchemaCreator(exports.config, {
  type: "key-group",
});

// Export Nobox functions
exports.Nobox = getFunctions(exports.config);
