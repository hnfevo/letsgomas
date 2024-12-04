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
exports.DestinationController = void 0;
const destination_service_1 = require("../service/destination-service");
const logging_1 = require("../application/logging");
class DestinationController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield destination_service_1.DestinationService.create(req.user, request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const destinationId = Number(req.params.destinationId);
                // Ambil destinasi sebagai data publik tanpa autentikasi
                const response = yield destination_service_1.DestinationService.getPublic(destinationId);
                logging_1.logger.debug('response (public): ' + JSON.stringify(response));
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    name: req.query.name,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield destination_service_1.DestinationService.getAll(request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.destinationId);
                const response = yield destination_service_1.DestinationService.update(req.user, request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const destinationId = Number(req.params.destinationId);
                const response = yield destination_service_1.DestinationService.remove(req.user, destinationId);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    data: 'Destination removed successfully',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    name: req.query.name,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield destination_service_1.DestinationService.search(req.user, request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DestinationController = DestinationController;
