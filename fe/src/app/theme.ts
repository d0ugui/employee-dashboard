import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)"
  },
  colors: {
    primary: "#5D5FEF",
    secondary: "#878790",
    done: "#26B144",
    danger: "#FF0000"
  }
})
