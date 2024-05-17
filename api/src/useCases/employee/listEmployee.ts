import { Request, Response } from "express";
import { Employee } from "../../app/models/Employee";

export async function listEmployee(req: Request, res: Response) {
  try {
    const search = req.query.search || "";

    const employees = await Employee.find({
      nome: { $regex: search, $options: "i" },
    });

    res.json(employees);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
