export class ResponseDto<T> {
  statusCode: number;
  data: T;
  message = '';
  exception = '';
}
