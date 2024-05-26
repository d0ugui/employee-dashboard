import { Router } from "express";
import { EmployeesRoutes } from "./http/controllers/employees/route";
import { UsersRoutes } from "./http/controllers/users/route";

export const router = Router();

router.get("/", async (req, res) => {
  return res.json({ hello: "World" });
});

// employees-routes
EmployeesRoutes(router);
// users-routes
UsersRoutes(router);
