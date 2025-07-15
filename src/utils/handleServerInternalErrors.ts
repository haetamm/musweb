import { NextResponse } from 'next/server';

export class HandleServerInternalErrors extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static toNextResponse(error: any): NextResponse {
    if (error instanceof HandleServerInternalErrors) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    // Handle Axios errors
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || 'Request failed' },
        { status: error.response.status }
      );
    }

    // Default error
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
