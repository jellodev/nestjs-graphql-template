import { Request, Response, NextFunction } from 'express';
import { v4 as uuidV4 } from 'uuid';

export function BootMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const originTraceId = req.headers['x-trace-id'] ?? '';
  const traceId = uuidV4();
  req.headers['x-origin-trace-id'] = originTraceId;
  req.headers['x-trace-id'] = traceId;
  next();
}
