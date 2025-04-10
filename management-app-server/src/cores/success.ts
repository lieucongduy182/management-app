import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Response } from 'express';

interface SuccessResponseOptions {
  message?: string;
  status?: number;
  reasonStatusCode?: string;
  data?: Record<string, any>;
}

export class SuccessResponse {
  message: string;
  status: number;
  data: Record<string, any>;

  constructor({
    message,
    status = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    data = {},
  }: SuccessResponseOptions) {
    this.message = !message ? reasonStatusCode : message;
    this.status = status;
    this.data = data;
  }

  send(res: Response): Response {
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({
    message,
    data,
  }: {
    message?: string;
    data?: Record<string, any>;
  }) {
    super({ message, data });
  }
}

interface CreatedOptions extends SuccessResponseOptions {
  options?: Record<string, any>;
}

export class CREATED extends SuccessResponse {
  options: Record<string, any>;

  constructor({
    message,
    status = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    data,
    options = {},
  }: CreatedOptions) {
    super({
      message,
      status,
      reasonStatusCode,
      data,
    });
    this.options = options;
  }
}
