import { employeeService } from "@/services/employeeService"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useToast
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import z from "zod"

const createEmployeeForm = z.object({
  nome: z.string().min(5, "O nome é obrigatório"),
  cargo: z.string().min(5, "O cargo é obrigatório"),
  departamento: z.string().min(5, "O departamento é obrigatório")
})

type FormData = z.infer<typeof createEmployeeForm>

interface CreateEmployeeModal {
  setIsOpen(state: boolean): void
  handleListEmployee(): void
}

export function CreateEmployeeForm({
  setIsOpen,
  handleListEmployee
}: CreateEmployeeModal) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(createEmployeeForm)
  })

  const toast = useToast({
    duration: 4000,
    isClosable: true,
    position: "top-right"
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateEmployee(values: FormData) {
    try {
      setIsLoading(true)

      await employeeService.create(values)

      toast({
        description: "Funcionário cadastrado.",
        status: "success"
      })

      await handleListEmployee()
    } catch (error) {
      toast({
        description: "Ocorreu um problema ao registrar o funcionário.",
        status: "error"
      })
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Cadastro de Funcionário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex
          as="form"
          gap="2"
          flexDir="column"
          onSubmit={handleSubmit(handleCreateEmployee)}
        >
          <FormControl isInvalid={Boolean(errors.nome)}>
            <FormLabel htmlFor="nome" color="secondary">
              Nome
            </FormLabel>
            <Input type="text" placeholder="Nome" {...register("nome")} />
            <FormErrorMessage>
              {errors.nome && errors.nome.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.cargo)}>
            <FormLabel htmlFor="cargo" color="secondary">
              Cargo
            </FormLabel>
            <Input type="text" placeholder="Cargo" {...register("cargo")} />
            <FormErrorMessage>
              {errors.cargo && errors.cargo.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.departamento)}>
            <FormLabel htmlFor="departamento" color="secondary">
              Departamento
            </FormLabel>
            <Input
              type="text"
              placeholder="Departamento"
              {...register("departamento")}
            />
            <FormErrorMessage>
              {errors.departamento && errors.departamento.message}
            </FormErrorMessage>
          </FormControl>

          <Flex mt="4" justifyContent="flex-end" flex="1">
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
            <Button colorScheme="green" isLoading={isLoading} type="submit">
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  )
}
