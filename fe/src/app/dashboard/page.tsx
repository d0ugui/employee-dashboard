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
  useBreakpointValue
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { CreateEmployeeForm } from "./components/CreateEmployeeForm"

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [employees, setEmployees] = useState<IEmployee[]>()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const employeesData = await employeeService.getAll()

        setEmployees(employeesData)
      } catch (error) {
        setError("Ocorreu um erro ao estabelecer conexão com a API.")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  async function handleCreateEmployee(values: Omit<IEmployee, "id">) {
    setIsSubmitting(true)

    await employeeService.create(values)

    setIsSubmitting(false)
    setIsEmployeeModalOpen(false)
  }

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
                      <>
                        <Tr
                          border="2px"
                          borderColor="#DFDFDF"
                          borderRadius="md"
                          key={employee.id}
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
                                >
                                  Editar
                                </Button>
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  color="danger"
                                  leftIcon={<DeleteIcon h={4} w={4} />}
                                >
                                  Excluir
                                </Button>
                              </Flex>
                            </Td>
                          )}
                        </Tr>
                      </>
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
        </>
      )}
    </Container>
  )
}
