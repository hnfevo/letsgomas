"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationValidation = void 0;
const zod_1 = require("zod");
class DestinationValidation {
}
exports.DestinationValidation = DestinationValidation;
DestinationValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(255),
    location: zod_1.z.string().min(1).max(255),
    opening_hours: zod_1.z.string().max(10).optional(),
    close_hours: zod_1.z.string().max(10).optional(),
    contact: zod_1.z.string().max(15).optional(),
    image: zod_1.z.string().url().optional(),
});
DestinationValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().min(1).max(255).optional(),
    location: zod_1.z.string().min(1).max(255).optional(),
    opening_hours: zod_1.z.string().max(10).optional(),
    close_hours: zod_1.z.string().max(10).optional(),
    contact: zod_1.z.string().max(15).optional(),
    image: zod_1.z.string().url().optional(),
});
DestinationValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive(),
});
