import { IEmployee } from "@/entities/employee"
import { employeeService } from "@/services/employeeService"
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react"
import { useState } from "react"

interface TableItemProps {
  employee: IEmployee
  handleSelectEmployee(employee: IEmployee): void
  handleListEmployee(): void
}

export function TableItem({
  employee,
  handleSelectEmployee,
  handleListEmployee
}: TableItemProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const toast = useToast({
    duration: 4000,
    isClosable: true,
    position: "top-right"
  })

  const [isLoading, setIsLoading] = useState(false)

  async function deleteEmployee(id: string) {
    try {
      setIsLoading(true)

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
      setIsLoading(false)
    }
  }

  return (
    <Tr border="2px" borderColor="#DFDFDF" borderRadius="md" key={employee._id}>
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
              isLoading={isLoading}
              onClick={() => deleteEmployee(employee._id)}
            >
              Excluir
            </Button>
          </Flex>
        </Td>
      )}
    </Tr>
  )
}
