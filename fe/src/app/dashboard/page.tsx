"use client"

import { Header } from "@/components/Header"
import { Search } from "@/components/Search"
import { THeadButton } from "@/components/THeadButton"
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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState } from "react"

const employees = [
  {
    id: 1,
    name: "John Smith",
    position: "Software Engineer",
    workArea: "Development"
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "Project Manager",
    workArea: "Management"
  },
  { id: 3, name: "Alice Johnson", position: "UX Designer", workArea: "Design" },
  { id: 4, name: "Bob Brown", position: "Data Analyst", workArea: "Analytics" },
  {
    id: 5,
    name: "Carol White",
    position: "HR Specialist",
    workArea: "Human Resources"
  }
  // {
  //   id: 6,
  //   name: "David Wilson",
  //   position: "Marketing Coordinator",
  //   workArea: "Marketing"
  // },
  // {
  //   id: 7,
  //   name: "Eve Thompson",
  //   position: "Content Writer",
  //   workArea: "Content"
  // },
  // { id: 8, name: "Frank Martin", position: "Sales Manager", workArea: "Sales" },
  // {
  //   id: 9,
  //   name: "Grace Lee",
  //   position: "Customer Support",
  //   workArea: "Support"
  // },
  // { id: 10, name: "Hank Harris", position: "IT Technician", workArea: "IT" },
  // {
  //   id: 11,
  //   name: "Ivy Adams",
  //   position: "Financial Analyst",
  //   workArea: "Finance"
  // },
  // {
  //   id: 12,
  //   name: "Jack Nelson",
  //   position: "Operations Manager",
  //   workArea: "Operations"
  // },
  // {
  //   id: 13,
  //   name: "Kimberly Baker",
  //   position: "Legal Advisor",
  //   workArea: "Legal"
  // },
  // {
  //   id: 14,
  //   name: "Larry Rodriguez",
  //   position: "QA Tester",
  //   workArea: "Quality Assurance"
  // },
  // {
  //   id: 15,
  //   name: "Maria Davis",
  //   position: "Graphic Designer",
  //   workArea: "Design"
  // },
  // {
  //   id: 16,
  //   name: "Nick Evans",
  //   position: "DevOps Engineer",
  //   workArea: "Development"
  // },
  // {
  //   id: 17,
  //   name: "Olivia Clark",
  //   position: "Product Manager",
  //   workArea: "Product"
  // },
  // {
  //   id: 18,
  //   name: "Paul King",
  //   position: "Business Analyst",
  //   workArea: "Business"
  // },
  // {
  //   id: 19,
  //   name: "Quinn Lewis",
  //   position: "Supply Chain Coordinator",
  //   workArea: "Supply Chain"
  // },
  // {
  //   id: 20,
  //   name: "Rachel Young",
  //   position: "Training Specialist",
  //   workArea: "Training"
  // }
]

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container w="100vw" maxW="1200" bg="white">
      <Header />

      <Flex flex="1" mt="10" alignItems="end" justifyContent="space-between">
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
              {employees.map((user) => (
                <>
                  <Tr border="2px" borderColor="#DFDFDF" borderRadius="md">
                    <Td>
                      <Text fontWeight="bold">{user.name}</Text>
                    </Td>
                    {isWideVersion && <Td>{user.position}</Td>}
                    {isWideVersion && <Td>{user.workArea}</Td>}
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
    </Container>
  )
}
