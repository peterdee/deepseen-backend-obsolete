export interface ResponseObject {
  data?: any;
  datetime: number;
  message: string;
  request: string;
  status: number | string;
};

export interface TokenPayload {
  id?: number | string;
  provider?: string;
};
