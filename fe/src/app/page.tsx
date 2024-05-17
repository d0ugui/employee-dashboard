import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack
} from "@chakra-ui/react"

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="white">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={6}>
          <Heading as="h1" size="2xl" color="primary">
            Employee.
          </Heading>
          <Flex direction={{ base: "column" }}>
            <FormLabel htmlFor="email" color="secondary">
              Email
            </FormLabel>
            <Input placeholder="Email" name="email" id="email" />
          </Flex>
          <Flex direction={{ base: "column" }}>
            <FormLabel htmlFor="email" color="secondary">
              Password
            </FormLabel>
            <Input placeholder="Password" />
          </Flex>
        </Stack>

        <Link href="/" textAlign="end" mt="12px">
          Criar conta
        </Link>

        <Link href="/dashboard">
          <Button colorScheme="blue" bg="primary" h="48px" mt="12px">
            Entrar
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
