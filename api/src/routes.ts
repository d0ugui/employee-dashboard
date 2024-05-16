import { Router } from "express";
import { createEmployee } from "./useCases/employee/createEmployee";
import { deleteEmployee } from "./useCases/employee/deleteEmployee";
import { listEmployee } from "./useCases/employee/listEmployee";
import { updateEmployee } from "./useCases/employee/updateEmployee";

export const router = Router();

router.get("/", async (req, res) => {
  return res.json({ hello: "World" });
});

// Employee
router.get("/employees", listEmployee);
router.post("/employees", createEmployee);
router.delete("/employees/:id", deleteEmployee);
router.patch("/employees/:id", updateEmployee);
