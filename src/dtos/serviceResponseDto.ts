import { ServiceResponseDTOParams } from '../types/dtosParams';

class ServiceResponseDTO<T> {
  error: boolean;
  payload: T | null;
  errorMessage: string | null;

  constructor({ error, payload }: ServiceResponseDTOParams<T>) {
    this.error = error;
    this.payload = payload;
  }
}

export default ServiceResponseDTO;
