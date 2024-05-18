"use client"

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import z from "zod"

const loginFormSchema = z.object({
  email: z.string().email("Preencha o email"),
  password: z.string().min(6, "Insira a senha corretamente")
})

type FormData = z.infer<typeof loginFormSchema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(loginFormSchema)
  })

  function onSubmit(values: FormData) {
    console.log(values)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="white">
      <Flex w="100%" maxW={360} p="8" borderRadius={8} flexDir="column">
        <Stack spacing={6}>
          <Heading as="h1" size="2xl" color="primary">
            Employee.
          </Heading>

          <Flex as="form" flexDir="column" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email" color="secondary">
                Email
              </FormLabel>
              <Input type="email" placeholder="Email" {...register("email")} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="email" color="secondary">
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Link href="/" textAlign="end" mt="12px">
              Criar conta
            </Link>

            <Link href="/dashboard">
              <Button
                colorScheme="blue"
                bg="primary"
                h="48px"
                mt="12px"
                w="full"
              >
                Entrar
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  )
}
