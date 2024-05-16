import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../../app/models/User";

export async function authenticateUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne().where("email").equals(email);

    if (!user) {
      return res.json({ error: "Usuário não existe." });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.json({ error: "Senha inválida." });
    }

    const token = sign({ id: user.id }, "mySecret", { expiresIn: "1d" });

    res.json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
