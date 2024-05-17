import { IEmployee } from "@/entities/employee"
import { httpClient } from "../httpClient"

export async function create(params: Omit<IEmployee, "_id">) {
  const res = await httpClient.post("/employees", params)

  return res
}
