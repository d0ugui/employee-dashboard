import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../../app/models/User";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne().where("email").equals(email);

    if (userExists) {
      return res.json({ error: "Esse usuário já existe. " });
    }

    const hassPassword = await hash(password, 8);

    const createdUser = await User.create({
      name,
      email,
      password: hassPassword,
    });

    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
