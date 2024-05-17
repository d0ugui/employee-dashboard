import { IEmployee } from "@/entities/employee"
import { httpClient } from "../httpClient"

export async function getAll() {
  const { data } = await httpClient.get<IEmployee[]>("/employees")

  return data as IEmployee[]
}
