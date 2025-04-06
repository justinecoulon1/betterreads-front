import { AxiosError } from 'axios';

export function getServerErrorCode(error: unknown): string {
  if (error instanceof AxiosError && error.response) {
    return error.response.data.message as string;
  }
  return 'unknown-server-error';
}
