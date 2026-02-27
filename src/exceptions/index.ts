/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

export class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
  }
  getStatus(): number  {
    return 400;
  }
}

export class ConflictException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictException";
  }
  getStatus(): number  {
    return 400;
  }
}

export class ForbiddenException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenException";
  }
  getStatus(): number  {
    return 403;
  }
}

export class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
  }
  getStatus(): number {
    return 401;
  }
}

export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
  getStatus(): number  {
    return 404;
  }
}
export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerErrorException";
  }
  getStatus(): number  {
    return 500;
  }
}
export class BadGatewayException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadGatewayException";
  }
  getStatus(): number  {
    return 502;
  }
}

export class MethodNotAllowedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MethodNotAllowedException";
  }
  getStatus(): number {
    return 405;
  }
}
export class CacheException extends Error {
  keyCache: string;
  typeCache: "redis" | "session" | "cookie";
  constructor(
    message: string,
    keyCache: string,
    typeCache: "redis" | "session" | "cookie" = "redis"
  ) {
    super(message);
    this.name = "CacheException";
    this.keyCache = keyCache;
    this.typeCache = typeCache;
  }
  getStatus(): number  {
    return 500;
  }
  get key(): string {
    return this.keyCache;
  }
  get type(): string {
    return this.typeCache;
  }
}

// Map exception constructors to their status codes
const ERROR_STATUS_MAP = new Map<new (...args: any[]) => Error, number>([
  [BadRequestException, 400],
  [ConflictException, 400],
  [ForbiddenException, 403],
  [UnauthorizedException, 401],
  [NotFoundException, 404],
  [MethodNotAllowedException, 405],
  [InternalServerErrorException, 500],
  [BadGatewayException, 502],
  [CacheException, 500],
]);

// Map exception constructors to custom handlers (for special cases)
const ERROR_HANDLERS = new Map<
  new (...args: any[]) => Error,
  (error: Error) => Record<string, any>
>([
  [
    CacheException,
    (error: Error) => {
      const cacheError = error as CacheException;
      return {
        message: cacheError.message,
        status: cacheError.getStatus(),
        name: cacheError.name,
        key: cacheError.key,
        type: cacheError.type,
        stack: cacheError.stack,
        cause: cacheError.cause,
      };
    },
  ],
]);

export function getErrorInfo(error: Error | unknown) {
  // Handle known custom exceptions
  if (error instanceof Error) {
    const errorType = error.constructor as new (...args: any[]) => Error;

    // Check for custom handler first (e.g., CacheException)
    const customHandler = ERROR_HANDLERS.get(errorType);
    if (customHandler) {
      return customHandler(error);
    }

    // Check for mapped status code
    const status = ERROR_STATUS_MAP.get(errorType);
    if (status !== undefined) {
      return {
        message: error.message,
        status,
        name: error.name,
        stack: error.stack,
        cause: error.cause,
      };
    }

    // Handle generic Error (not a custom exception)
    return {
      message: error.message,
      status: 500,
      name: error.name || "Error",
      stack: error.stack,
      cause: error.cause,
    };
  }

  // Handle unknown error types
  return {
    message: String(error) || "Internal server error",
    status: 500,
    name: "InternalServerError",
    stack: (error as Error)?.stack,
    cause: (error as Error)?.cause,
  };
}

/**
 * Map status code to corresponding exception and throw it
 */
export function throwExceptionByStatus(
  status: number,
  message: string
): never {
  switch (status) {
    case 401:
      throw new UnauthorizedException(message);
    case 400:
      throw new BadRequestException(message);
    case 403:
      throw new ForbiddenException(message);
    case 404:
      throw new NotFoundException(message);
    case 405:
      throw new MethodNotAllowedException(message);
    case 500:
      throw new InternalServerErrorException(message);
    case 502:
      throw new BadGatewayException(message);
    default:
      throw new InternalServerErrorException(message || "Unknown error");
  }
}
