import { Request, Response } from "express";
import { Employee } from "../../app/models/Employee";

export async function deleteEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await Employee.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
