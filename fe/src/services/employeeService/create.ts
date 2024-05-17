import { IEmployee } from "@/entities/employee"
import { httpClient } from "../httpClient"

export async function create(params: Omit<IEmployee, "id">) {
  const res = await httpClient.post("/employees", params)

  console.log(res)
  return res
}
