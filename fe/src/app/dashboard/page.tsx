"use client"

import { Header } from "@/components/Header"
import { Search } from "@/components/Search"
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react"

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

  return (
    <Flex w="100vw" align="center" justify="center" bg="white" flexDir="column">
      <Header />

      <Flex
        w="100%"
        maxW="1200px"
        flexDir="column"
        alignItems="flex-start"
        mt="10"
      >
        <Heading as="h2" size="md">
          Filtros
        </Heading>

        <Search />
      </Flex>

      <Box flex="1" borderRadius={8} maxW={1200} w="full" mt="10">
        <Flex w="100%" maxWidth={1200} mx="auto">
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                {isWideVersion && <Th>Cargo</Th>}
                {isWideVersion && <Th>Departamento</Th>}
                {isWideVersion && <Th>Action</Th>}
              </Tr>
            </Thead>

            <Tbody gap="2">
              {employees.map((user) => (
                <>
                  <Tr border="2px" borderColor="#DFDFDF" borderRadius="md">
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{user.name}</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.position}</Td>}
                    {isWideVersion && <Td>{user.workArea}</Td>}
                    {isWideVersion && (
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          // leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        >
                          Editar
                        </Button>
                      </Td>
                    )}
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Box>
    </Flex>
  )
}
