"use client"

import { SearchIcon } from "@chakra-ui/icons"
import { Button, Flex, Input } from "@chakra-ui/react"

export function Search() {
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
          placeholder="Buscar"
          _placeholder={{ color: "secondary" }}
        />
        <SearchIcon h={4} w={4} mr="2" />
      </Flex>

      <Button bg="primary" color="white">
        Pesquisar
      </Button>
    </Flex>
  )
}
