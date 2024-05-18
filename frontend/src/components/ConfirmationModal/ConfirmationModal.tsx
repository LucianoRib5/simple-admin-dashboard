import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'

interface ConfirmationModalProps {
  isOpen: boolean
  employeeIdToDelete: string
  employeeName: string
  onConfirm: (employeeId: string) => void
  onClose: () => void
}

const ConfirmationModal = ({ isOpen, employeeIdToDelete, employeeName, onConfirm, onClose}: ConfirmationModalProps) => {

  return (
    <>
      <Modal 
        closeOnOverlayClick={false} 
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered
      >
        <ModalOverlay />
        <ModalContent sx={{margin: '1rem'}}>
          <ModalHeader>Confirmação de ação</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>{`Deseja realmente excluir o(a) usuário(a) ${employeeName}?`}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={() => onConfirm(employeeIdToDelete)}>
              Confirmar
            </Button>
            <Button colorScheme='red' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmationModal