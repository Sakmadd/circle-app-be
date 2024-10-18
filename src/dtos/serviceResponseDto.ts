import { ServiceResponseDTOParams } from '../types/dtosParams';

class ServiceResponseDTO<T> {
  error: boolean;
  payload: T | null;
  errorMessage: string | null;

  constructor({ error, payload, errorMessage }: ServiceResponseDTOParams<T>) {
    this.error = error;
    this.payload = payload;
    this.errorMessage = errorMessage;
  }
}

export default ServiceResponseDTO;
