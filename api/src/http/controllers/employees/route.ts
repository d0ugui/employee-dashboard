import { Router } from "express";
import { createEmployee } from "../../../use-cases/employee/createEmployee";
import { deleteEmployee } from "../../../use-cases/employee/deleteEmployee";
import { listEmployee } from "../../../use-cases/employee/listEmployee";
import { updateEmployee } from "../../../use-cases/employee/updateEmployee";

export async function EmployeesRoutes(router: Router) {
  router.get("/employees", listEmployee);
  router.post("/employees", createEmployee);
  router.delete("/employees/:id", deleteEmployee);
  router.patch("/employees/:id", updateEmployee);
}
