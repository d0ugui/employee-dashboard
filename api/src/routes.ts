import { Router } from "express";
import { AuthMiddleware } from "./app/middlewares/auth";
import { createEmployee } from "./useCases/employee/createEmployee";
import { deleteEmployee } from "./useCases/employee/deleteEmployee";
import { listEmployee } from "./useCases/employee/listEmployee";
import { updateEmployee } from "./useCases/employee/updateEmployee";
import { authenticateUser } from "./useCases/user/authenticateUser";
import { createUser } from "./useCases/user/createUser";
import { listUser } from "./useCases/user/listUser";

export const router = Router();

router.get("/", async (req, res) => {
  return res.json({ hello: "World" });
});

// Employee
router.get("/employees", listEmployee);
router.post("/employees", createEmployee);
router.delete("/employees/:id", AuthMiddleware, deleteEmployee);
router.patch("/employees/:id", AuthMiddleware, updateEmployee);

// User
router.post("/user", createUser);
router.get("/user", listUser);
router.post("/user/autenticate", authenticateUser);
