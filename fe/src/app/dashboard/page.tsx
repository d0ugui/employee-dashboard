"use client"

import { Header } from "@/components/Header"
import { ModalWrapper } from "@/components/Modal"
import { Search } from "@/components/Search"
import { THeadButton } from "@/components/THeadButton"
import { IEmployee } from "@/entities/employee"
import { employeeService } from "@/services/employeeService"
import { AddIcon, ChatIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { CreateEmployeeForm } from "./components/CreateEmployeeForm"
import { UpdateEmployeeForm } from "./components/UpdateEmployeeForm"

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  )
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false)
  const [isUpdateEmployeeModalOpen, setIsUpdateEmployeeModalOpen] =
    useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [employees, setEmployees] = useState<IEmployee[]>()
  const toast = useToast({
    duration: 4000,
    isClosable: true,
    position: "top-right"
  })

  const searchParams = useSearchParams()
  const search = searchParams.get("search")

  const handleListEmployee = useCallback(async () => {
    try {
      setIsLoading(true)

      const employeesData = await employeeService.getAll(search)

      setEmployees(employeesData)
    } catch (error) {
      setError("Ocorreu um erro ao estabelecer conexão com a API.")
    } finally {
      setIsLoading(false)
    }
  }, [search])

  async function handleCreateEmployee(values: Omit<IEmployee, "id">) {
    try {
      setIsSubmitting(true)

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
      setIsSubmitting(false)
      setIsEmployeeModalOpen(false)
    }
  }

  async function handleUpdateEmployee(values: IEmployee) {
    try {
      setIsSubmitting(true)

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
      setIsSubmitting(false)
      setIsEmployeeModalOpen(false)
    }
  }

  async function handleDeleteEmployee(id: string) {
    try {
      setIsSubmitting(true)

      await employeeService.remove(id)

      toast({
        description: "Funcionário deletado.",
        status: "success"
      })

      await handleListEmployee()
    } catch (error) {
      toast({
        description: "Token inválido.",
        status: "error"
      })
    } finally {
      setIsSubmitting(false)
      setIsEmployeeModalOpen(false)
    }
  }

  async function handleSelectEmployee(employee: IEmployee) {
    setSelectedEmployee(employee)
    setIsUpdateEmployeeModalOpen(true)
  }

  useEffect(() => {
    ;(async () => handleListEmployee())()
  }, [search, handleListEmployee])

  if (error) {
    return (
      <Flex flex="1" alignItems="center" justifyContent="center">
        <Heading as="h2">{error}</Heading>
      </Flex>
    )
  }

  return (
    <Container w="100vw" maxW="1200" bg="white">
      <Header />

      {isLoading ? (
        <Flex flex="1" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <>
          <Flex
            flex="1"
            mt="10"
            alignItems="end"
            justifyContent="space-between"
          >
            <Flex flexDir="column" alignItems="flex-start">
              <Heading as="h2" size="md">
                Filtros
              </Heading>

              <Search />
            </Flex>

            <Flex as="label" border="2px" borderColor="#fff">
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setIsEmployeeModalOpen(true)}
                color="white"
                bg="done"
              >
                Criar novo
              </Button>
            </Flex>
          </Flex>

          <Box flex="1" borderRadius={8} mt="10">
            <Flex mx="auto">
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>
                      <THeadButton title="Nome" />
                    </Th>
                    {isWideVersion && (
                      <Th>
                        <THeadButton title="Cargo" />
                      </Th>
                    )}
                    {isWideVersion && (
                      <Th>
                        <THeadButton title="Departamento" />
                      </Th>
                    )}
                    {isWideVersion && <Th color="gray.600">Ações</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {employees &&
                    employees.map((employee) => (
                      <Tr
                        border="2px"
                        borderColor="#DFDFDF"
                        borderRadius="md"
                        key={employee._id}
                      >
                        <Td>
                          <Text fontWeight="bold">{employee.nome}</Text>
                        </Td>
                        {isWideVersion && <Td>{employee.cargo}</Td>}
                        {isWideVersion && <Td>{employee.departamento}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Flex gap="2">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                color="primary"
                                leftIcon={<ChatIcon h={4} w={4} />}
                                onClick={() => handleSelectEmployee(employee)}
                              >
                                Editar
                              </Button>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                color="danger"
                                leftIcon={<DeleteIcon h={4} w={4} />}
                                isLoading={isSubmitting}
                                onClick={() =>
                                  handleDeleteEmployee(employee._id)
                                }
                              >
                                Excluir
                              </Button>
                            </Flex>
                          </Td>
                        )}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Flex>
          </Box>

          {isEmployeeModalOpen && (
            <ModalWrapper
              isOpen={isEmployeeModalOpen}
              setIsOpen={setIsEmployeeModalOpen}
            >
              <CreateEmployeeForm
                setIsOpen={setIsEmployeeModalOpen}
                onSubmit={handleCreateEmployee}
                isLoading={isSubmitting}
              />
            </ModalWrapper>
          )}

          {isUpdateEmployeeModalOpen && selectedEmployee && (
            <ModalWrapper
              isOpen={isUpdateEmployeeModalOpen}
              setIsOpen={setIsUpdateEmployeeModalOpen}
            >
              <UpdateEmployeeForm
                setIsOpen={setIsUpdateEmployeeModalOpen}
                onSubmit={handleUpdateEmployee}
                isLoading={isSubmitting}
                employeeData={selectedEmployee}
              />
            </ModalWrapper>
          )}
        </>
      )}
    </Container>
  )
}
