import { Modal, ModalOverlay } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  setIsOpen(state: boolean): void
  children: ReactNode
}

export function ModalWrapper({ isOpen, setIsOpen, children }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      {children}
    </Modal>
  )
}
