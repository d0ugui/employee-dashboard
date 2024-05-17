import { IEmployee } from "@/entities/employee"
import { httpClient } from "../httpClient"

export async function getAll(q: string | null) {
  const { data } = await httpClient.get<IEmployee[]>(
    `/employees?${q ? `search=${q}` : ""}`
  )

  return data as IEmployee[]
}
