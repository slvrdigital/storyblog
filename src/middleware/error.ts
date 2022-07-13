import { Request, Response, NextFunction } from 'express'

export function useErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).render('error', {
    layout: 'base',
    error
  })
}
