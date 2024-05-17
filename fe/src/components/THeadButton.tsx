import { Button } from "@chakra-ui/react"
import { FilterIcon } from "./FilterIcon"

interface THeadButton {
  title: string
}

export function THeadButton({ title }: THeadButton) {
  return (
    <Button
      bg="none"
      _hover="none"
      rightIcon={<FilterIcon filter="asc" />}
      px="0"
      color="gray.600"
      textTransform="uppercase"
      fontSize="xs"
      fontWeight="bold"
    >
      {title}
    </Button>
  )
}
