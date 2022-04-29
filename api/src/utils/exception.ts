export class Exception extends Error {
  statusCode: number;

  constructor({ status, message }: { status: number; message: string }) {
    super(message);
    this.message = message;
    this.statusCode = status;
  }
}
