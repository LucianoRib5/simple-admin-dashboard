'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { IEmployee } from '@/Interfaces/IEmployee'
import ApiService from '@/services/ApiService'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

interface EmployeeTableProps {
  employees: IEmployee[]
  setEmployees: Dispatch<SetStateAction<IEmployee[]>>
}

interface SortConfig {
  key: keyof IEmployee | null
  direction: string
}

const EmployeeTable = ({ employees, setEmployees }: EmployeeTableProps) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | undefined>()
  const [employeeNameToDelete, setEmployeeNameToDelete] = useState<string | undefined>()
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' })
  const router = useRouter()
  const { delet } = ApiService

  const deleteEmployee = (employeeId: string) => {
    delet<boolean>(`/${employeeId}`).then(({ data }) => {
      if (data) {
        setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.id !== employeeId))
        setOpenConfirmationModal(false)
      }
    }).catch((err) => console.log(err))
  }

  const openConfirmModalHandler = (employeeId: string, employeeName: string) => {
    setOpenConfirmationModal(true)
    setEmployeeIdToDelete(employeeId)
    setEmployeeNameToDelete(employeeName)
  }

  const closeConfirmationModal = () => setOpenConfirmationModal(false)

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
    }
    return 0
  })

  const requestSort = (key: keyof IEmployee | null) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getColumnClass = (key: keyof IEmployee | null) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? 'ascending' : 'descending'
    }
    return ''
  }

  const getSortIcon = (key: keyof IEmployee) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ArrowUpIcon ml={2} /> : <ArrowDownIcon ml={2} />
    }
    return null
  }

  return (
    <>
      {
        employees.length === 0 ? (
          <Heading as='h6' size='md' textAlign='start' my={2}>
            Nenhum funcionário cadastrado
          </Heading>
        ) : (
          <TableContainer style={{ maxHeight: '74vh', overflowY: 'auto' }}>
            <Table variant='striped' colorScheme='teal'>
              <Thead
                sx={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                }}
              >
              <Tr>
                <Th onClick={() => requestSort('name')} className={getColumnClass('name')} width='30%'>
                  Nome {getSortIcon('name')}
                </Th>
                <Th onClick={() => requestSort('position')} className={getColumnClass('position')} width='30%'>
                  Cargo {getSortIcon('position')}
                </Th>
                <Th onClick={() => requestSort('department')} className={getColumnClass('department')} width='30%'>
                  Departamento {getSortIcon('department')}
                </Th>
                <Th width='5%'>Editar</Th>
                <Th width='5%'>Excluir</Th>
              </Tr>
              </Thead>
              <Tbody>
                {sortedEmployees.map((employee) => (
                  <Tr key={employee.id}>
                    <Td width='30%'>{employee.name}</Td>
                    <Td width='30%'>{employee.position}</Td>
                    <Td width='30%'>{employee.department}</Td>
                    <Td width='5%'>
                      <div>
                        <IconButton
                          type='button'
                          colorScheme='blue'
                          aria-label='edit employee'
                          icon={<EditIcon />}
                          onClick={() => router.push(`/employee/edit?employeeId=${employee.id}`)}
                        />
                      </div>
                    </Td>
                    <Td width='5%'>
                      <div>
                        <IconButton
                          colorScheme='red'
                          aria-label='delete employee'
                          icon={<DeleteIcon />}
                          onClick={() => openConfirmModalHandler(employee.id, employee.name)}
                        />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

        )
      }
      {employeeIdToDelete && employeeNameToDelete && (
        <ConfirmationModal 
          isOpen={openConfirmationModal} 
          employeeIdToDelete={employeeIdToDelete}
          employeeName={employeeNameToDelete}
          onConfirm={deleteEmployee}
          onClose={closeConfirmationModal}
        />
      )}
    </>
  )
}

export default EmployeeTable