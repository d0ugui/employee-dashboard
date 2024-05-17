import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"

interface FilterIconProps {
  filter: "asc" | "desc"
}

export function FilterIcon({ filter }: FilterIconProps) {
  return (
    <>
      {filter === "asc" && <ChevronUpIcon color="purple" />}
      {filter === "desc" && <ChevronDownIcon color="purple" />}
    </>
  )
}
