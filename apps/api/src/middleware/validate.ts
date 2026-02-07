import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod/v4";

export function validate(schema: { parse: (data: unknown) => unknown }) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(err);
        return;
      }
      next(err);
    }
  };
}
