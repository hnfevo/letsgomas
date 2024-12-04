"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationService = void 0;
const destination_model_1 = require("../model/destination-model");
const destination_validation_1 = require("../validation/destination-validation");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const logging_1 = require("../application/logging");
const response_error_1 = require("../error/response-error");
class DestinationService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(destination_validation_1.DestinationValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { username: user.username });
            const destination = yield database_1.prismaClient.destination.create({
                data: record,
            });
            logging_1.logger.debug('record : ' + JSON.stringify(destination));
            return (0, destination_model_1.toDestinationResponse)(destination);
        });
    }
    static checkDestinationMustExists(username, destinationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const destination = yield database_1.prismaClient.destination.findFirst({
                where: {
                    id: destinationId,
                    username: username,
                },
            });
            if (!destination) {
                throw new response_error_1.ResponseError(404, 'Destination not found');
            }
            return destination;
        });
    }
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const destination = yield this.checkDestinationMustExists(user.username, id);
            return (0, destination_model_1.toDestinationResponse)(destination);
        });
    }
    static getPublic(destinationId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cari destinasi berdasarkan ID
            const destination = yield database_1.prismaClient.destination.findUnique({
                where: {
                    id: destinationId,
                },
            });
            // Jika destinasi tidak ditemukan, kembalikan error
            if (!destination) {
                throw new response_error_1.ResponseError(404, 'Destination not found');
            }
            // Konversi data destinasi ke response format
            return (0, destination_model_1.toDestinationResponse)(destination);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(destination_validation_1.DestinationValidation.UPDATE, request);
            yield this.checkDestinationMustExists(user.username, updateRequest.id);
            const destination = yield database_1.prismaClient.destination.update({
                where: {
                    id: updateRequest.id,
                    username: user.username,
                },
                data: updateRequest,
            });
            return (0, destination_model_1.toDestinationResponse)(destination);
        });
    }
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDestinationMustExists(user.username, id);
            const destination = yield database_1.prismaClient.destination.delete({
                where: {
                    id: id,
                    username: user.username,
                },
            });
            return (0, destination_model_1.toDestinationResponse)(destination);
        });
    }
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, page, size } = request;
            const skip = (page - 1) * size;
            const filters = [];
            if (name) {
                filters.push({
                    name: {
                        contains: name,
                    },
                });
            }
            const destinations = yield database_1.prismaClient.destination.findMany({
                where: {
                    AND: filters,
                },
                take: size,
                skip: skip,
            });
            const total = yield database_1.prismaClient.destination.count({
                where: {
                    AND: filters,
                },
            });
            return {
                data: destinations.map(destination_model_1.toDestinationResponse),
                paging: {
                    current_page: page,
                    total_page: Math.ceil(total / size),
                    size,
                },
            };
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(destination_validation_1.DestinationValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            if (searchRequest.name) {
                filters.push({
                    name: {
                        contains: searchRequest.name,
                    },
                });
            }
            const destination = yield database_1.prismaClient.destination.findMany({
                where: {
                    username: user.username,
                    AND: filters,
                },
                take: searchRequest.size,
                skip: skip,
            });
            const total = yield database_1.prismaClient.destination.count({
                where: {
                    username: user.username,
                    AND: filters,
                },
            });
            return {
                data: destination.map((destination) => (0, destination_model_1.toDestinationResponse)(destination)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size,
                },
            };
        });
    }
}
exports.DestinationService = DestinationService;
