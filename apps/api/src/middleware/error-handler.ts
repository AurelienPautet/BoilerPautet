import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod/v4";

interface PostgresError {
  code: string;
  detail?: string;
  constraint?: string;
}

function isPostgresError(err: unknown): err is PostgresError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as PostgresError).code === "string"
  );
}

function handlePostgresError(
  err: PostgresError,
): { status: number; body: Record<string, unknown> } | null {
  switch (err.code) {
    case "23505": {
      return {
        status: 409,
        body: {
          error: "Conflict",
          message: "A record with that value already exists",
        },
      };
    }
    case "23503":
      return {
        status: 400,
        body: { error: "Bad Request", message: "Referenced record not found" },
      };
    case "23502":
      return {
        status: 400,
        body: { error: "Bad Request", message: "A required field is missing" },
      };
    default:
      return null;
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation Error",
      details: err.flatten().fieldErrors,
    });
    return;
  }

  if (isPostgresError(err)) {
    const handled = handlePostgresError(err);
    if (handled) {
      res.status(handled.status).json(handled.body);
      return;
    }
  }

  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      ...(process.env.NODE_ENV !== "production" && { message: err.message }),
    });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
}
