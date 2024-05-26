import { Router } from "express";
import { authenticateUser } from "../../../use-cases/user/authenticateUser";
import { createUser } from "../../../use-cases/user/createUser";
import { listUser } from "../../../use-cases/user/listUser";

export async function UsersRoutes(router: Router) {
  router.post("/user", createUser);
  router.get("/user", listUser);
  router.post("/user/autenticate", authenticateUser);
}
