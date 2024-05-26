import { Request, Response } from "express";

import { Employee } from "../../app/models/Employee";

export async function createEmployee(req: Request, res: Response) {
  try {
    const { nome, cargo, departamento } = req.body;

    if (!nome) {
      return res.status(400).json({
        error: "Nome é obrigatório",
      });
    }

    if (!cargo) {
      return res.status(400).json({
        error: "Cargo é obrigatório",
      });
    }

    if (!departamento) {
      return res.status(400).json({
        error: "Departamento é obrigatório",
      });
    }

    const category = await Employee.create({ nome, cargo, departamento });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
