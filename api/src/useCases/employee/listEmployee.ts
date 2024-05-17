import { Request, Response } from "express";
import { Employee } from "../../app/models/Employee";

export async function listEmployee(req: Request, res: Response) {
  try {
    const search = req.query.search || "";
    const orderBy = req.query.orderBy || "";

    const employees = await Employee.find({
      nome: { $regex: search, $options: "i" },
    }).sort({ nome: orderBy === "asc" ? 1 : -1 });

    res.json(employees);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
