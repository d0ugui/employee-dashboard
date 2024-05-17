import { sleep } from "@/utils/sleep"
import axios from "axios"

export const httpClient = axios.create({
  baseURL: "http://localhost:3333"
})

httpClient.interceptors.response.use(async (data) => {
  await sleep(500)

  return data
})
