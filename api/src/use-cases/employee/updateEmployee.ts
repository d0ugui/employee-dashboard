import { Request, Response } from "express";
import { Employee } from "../../app/models/Employee";

export async function updateEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, cargo, departamento } = req.body;

    await Employee.findByIdAndUpdate(id, {
      nome,
      cargo,
      departamento,
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
