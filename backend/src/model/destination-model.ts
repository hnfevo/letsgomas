import { Destination } from '@prisma/client';

export type DestinationResponse = {
  id: number;
  name: string;
  description: string;
  location: string;
  opening_hours?: string | null;
  close_hours?: string | null;
  contact?: string | null;
  image?: string | null;
};

export type CreateDestinationRequest = {
  name: string;
  description: string;
  image?: string;
  location: string;
  opening_hours?: string;
  close_hours?: string;
  contact?: string;
};

export type UpdateDestinationRequest = {
  id: number;
  name: string;
  description: string;
  location: string;
  opening_hours?: string;
  close_hours?: string;
  contact?: string;
  image?: string;
};

export type SearchDestinationRequest = {
  name?: string;
  page: number;
  size: number;
};

export function toDestinationResponse(destination: Destination): DestinationResponse {
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
