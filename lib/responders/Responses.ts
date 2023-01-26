import { Context } from "@azure/functions";

export function respondWithSuccess(
  context: Context,
  data: any | Array<any>,
  status = 200
): void {
  context.res = {
    status: status,
    body: { data: data },
  };
}

export function respondWithCreated(
  context: Context,
  data: any | Array<any>
): void {
  context.res = {
    status: 201,
    body: { data: data },
  };
}

export function respondWithNotFound(
  context: Context,
  data: any | Array<any>
): void {
  context.res = {
    status: 404,
    body: { data: data },
  };
}

export function respondWithBadRequest(
  context: Context,
  data: any | Array<any>
): void {
  context.res = {
    status: 400,
    body: { data: data },
  };
}
