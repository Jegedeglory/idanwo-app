"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;

const zod_1 = require("zod");

exports.AuthSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, { message: "Name is required." })
        .max(100, { message: "Name must not exceed 100 characters." }),
});