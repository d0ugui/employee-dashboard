import { Request, Response } from "express";
import { User } from "../../app/models/User";

export async function listUser(req: Request, res: Response) {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
