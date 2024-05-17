import { IEmployee } from "@/entities/employee"
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

const updateEmployeeForm = z.object({
  _id: z.string(),
  nome: z.string().min(5, "O nome é obrigatório"),
  cargo: z.string().min(5, "O cargo é obrigatório"),
  departamento: z.string().min(5, "O departamento é obrigatório")
})

type FormData = z.infer<typeof updateEmployeeForm>

interface UpdateEmployeeModal {
  setIsOpen(state: boolean): void
  employeeData: IEmployee
  setSelectedEmployee(value: IEmployee | null): void
  handleListEmployee(): void
}

export function UpdateEmployeeForm({
  setIsOpen,
  employeeData,
  setSelectedEmployee,
  handleListEmployee
}: UpdateEmployeeModal) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(updateEmployeeForm),
    defaultValues: employeeData
  })

  const toast = useToast({
    duration: 4000,
    isClosable: true,
    position: "top-right"
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdateEmployee(values: IEmployee) {
    try {
      setIsLoading(true)

      await employeeService.update(values)
      setSelectedEmployee(null)

      toast({
        description: "Funcionário atualizado som sucesso.",
        status: "success"
      })

      await handleListEmployee()
    } catch (error) {
      toast({
        description:
          "Ocorreu um problema ao atualizar os dados do funcionário.",
        status: "error"
      })
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Atualização de Funcionário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex
          as="form"
          gap="2"
          flexDir="column"
          onSubmit={handleSubmit(handleUpdateEmployee)}
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
            <Button colorScheme="orange" isLoading={isLoading} type="submit">
              Atualizar
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  )
}
