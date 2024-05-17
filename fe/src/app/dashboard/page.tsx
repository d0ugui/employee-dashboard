"use client"

import { Header } from "@/components/Header"
import { ModalWrapper } from "@/components/Modal"
import { Search } from "@/components/Search"
import { TableItem } from "@/components/TableItem"
import { IEmployee } from "@/entities/employee"
import { employeeService } from "@/services/employeeService"
import { AddIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue
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
  const [error, setError] = useState("")
  const [employees, setEmployees] = useState<IEmployee[]>()

  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const orderBy = searchParams.get("orderBy")

  const handleListEmployee = useCallback(async () => {
    try {
      setIsLoading(true)

      const employeesData = await employeeService.getAll(search, orderBy)

      setEmployees(employeesData)
    } catch (error) {
      setError("Ocorreu um erro ao estabelecer conexão com a API.")
    } finally {
      setIsLoading(false)
    }
  }, [search, orderBy])

  async function handleSelectEmployee(employee: IEmployee) {
    setSelectedEmployee(employee)
    setIsUpdateEmployeeModalOpen(true)
  }

  useEffect(() => {
    ;(async () => handleListEmployee())()
  }, [search, orderBy, handleListEmployee])

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
                      <Link
                        href={
                          orderBy === "asc" ? `?orderBy=desc` : `?orderBy=asc`
                        }
                      >
                        <Button
                          bg="none"
                          _hover="none"
                          rightIcon={
                            orderBy === "asc" ? (
                              <ChevronUpIcon color="purple" />
                            ) : (
                              <ChevronDownIcon color="purple" />
                            )
                          }
                          px="0"
                          color="gray.600"
                          textTransform="uppercase"
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          Nome
                        </Button>
                      </Link>
                    </Th>
                    {isWideVersion && <Th>Cargo</Th>}
                    {isWideVersion && <Th>Departamento</Th>}
                    {isWideVersion && <Th>Ações</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {employees &&
                    employees.map((employee) => (
                      <TableItem
                        key={employee._id}
                        employee={employee}
                        handleSelectEmployee={handleSelectEmployee}
                        handleListEmployee={handleListEmployee}
                      />
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
                handleListEmployee={handleListEmployee}
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
                setSelectedEmployee={setSelectedEmployee}
                employeeData={selectedEmployee}
                handleListEmployee={handleListEmployee}
              />
            </ModalWrapper>
          )}
        </>
      )}
    </Container>
  )
}
