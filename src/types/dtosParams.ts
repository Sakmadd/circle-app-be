export interface ServiceResponseDTOParams<T> {
  error: boolean;
  payload: T | null;
  errorMessage: string | null;
}
