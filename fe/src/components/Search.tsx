"use client"

import { SearchIcon } from "@chakra-ui/icons"
import { Button, Flex, Input, Link } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export function Search() {
  const searchParams = useSearchParams()
  const q = searchParams.get("search")
  const [search, setSearch] = useState(q || "")

  return (
    <Flex alignItems="center" mt="2" gap="2">
      <Flex
        as="label"
        flex="1"
        maxWidth={222}
        bg="white"
        borderRadius="8"
        alignItems="center"
        border="2px"
        borderColor="#DFDFDF"
      >
        <Input
          color="secondary"
          variant="unstyled"
          px="2"
          py="2"
          mr="2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar"
          _placeholder={{ color: "secondary" }}
        />

        <SearchIcon h={4} w={4} mr="2" />
      </Flex>

      <Link href={`?search=${search}`}>
        <Button bg="primary" color="white">
          Pesquisar
        </Button>
      </Link>
    </Flex>
  )
}
