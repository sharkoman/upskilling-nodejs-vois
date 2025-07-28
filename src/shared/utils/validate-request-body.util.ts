import { z } from "zod";

export const validateRequestBody = <T>(schema: z.ZodSchema, body: unknown) => {
  const { error, data } = schema.safeParse(body);

  const processError = error?.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  return error
    ? {
        success: false,
        error: processError,
        data: null,
      }
    : {
        success: true,
        error: null,
        data: data as T,
      };
};
