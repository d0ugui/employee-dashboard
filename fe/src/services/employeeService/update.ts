import { IEmployee } from "@/entities/employee"
import { httpClient } from "../httpClient"

export async function update({ _id, ...params }: IEmployee) {
  const res = await httpClient.patch(`/employees/${_id}`, params)

  return res
}
