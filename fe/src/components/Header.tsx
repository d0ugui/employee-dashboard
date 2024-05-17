import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react"

export function Header() {
  return (
    <Flex
      w="100%"
      maxW="1200px"
      alignItems="center"
      justifyContent="space-between"
      py="10"
    >
      <Heading as="h1" size="2xl" color="primary">
        Employee.
      </Heading>

      <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text>Douglas Oliveira</Text>
          <Text color="text" fontSize="small">
            douglaspo_97@outlook.com
          </Text>
        </Box>

        <Avatar
          size="md"
          name="Douglas Oliveira"
          src="https://github.com/d0ugui.png"
        />
      </Flex>
    </Flex>
  )
}
