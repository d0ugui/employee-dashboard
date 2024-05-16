import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token não enviado." });
  }

  try {
    const decoded = verify(authorization, "mySecret");
    const { id } = decoded as TokenPayload;

    req.userId = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token inválido." });
  }
}
