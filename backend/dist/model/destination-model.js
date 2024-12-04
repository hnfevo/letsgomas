"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDestinationResponse = toDestinationResponse;
function toDestinationResponse(destination) {
    return {
        id: destination.id,
        name: destination.name,
        description: destination.description,
        location: destination.location,
        opening_hours: destination.opening_hours,
        close_hours: destination.close_hours,
        contact: destination.contact,
        image: destination.image,
    };
}
