"use client"

import { Header } from "@/components/Header"
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
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
                onClick={() => setIsOpen(true)}
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

          <Box>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Cadastro de Funcionário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex gap="2" flexDir="column">
                    <Box>
                      <FormLabel htmlFor="nome">Nome</FormLabel>
                      <Input placeholder="Nome" name="nome" id="nome" />
                    </Box>

                    <Box>
                      <FormLabel htmlFor="cargo">Cargo</FormLabel>
                      <Input placeholder="Cargo" name="cargo" id="cargo" />
                    </Box>

                    <Box>
                      <FormLabel htmlFor="departamento">Departamento</FormLabel>
                      <Input
                        placeholder="Departamento"
                        name="departamento"
                        id="departamento"
                      />
                    </Box>
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => setIsOpen(false)}
                  >
                    Fechar
                  </Button>
                  <Button colorScheme="green">Cadastrar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </>
      )}
    </Container>
  )
}
