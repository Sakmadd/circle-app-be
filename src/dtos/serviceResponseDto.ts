import { ServiceResponseDTOParams } from '../types/dtosParams';

class ServiceResponseDTO<T> {
  error: boolean;
  payload: T | null;
  message: string | null;

  constructor({ error, payload, message }: ServiceResponseDTOParams<T>) {
    this.error = error;
    this.payload = payload;
    this.message = message;
  }
}

export default ServiceResponseDTO;
