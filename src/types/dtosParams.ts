export interface ServiceResponseDTOParams<T> {
  error: boolean;
  payload: T | null;
  message: string | null;
}
