'use client'
import { useCallback, useEffect, useState } from 'react'
import { IEmployee } from '@/Interfaces/IEmployee'
import ApiService from '@/services/ApiService'
import {
  ButtonGroup,
  Button,
  Box,
  Stack,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { IconButton, Input } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Page from '@/components/Page'
import EmployeeTable from '@/components/EmployeeTable/EmployeeTable'

export default function Home() {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { get } = ApiService
  const router = useRouter()

  const getAllEmployees = useCallback(() => {
    get<IEmployee[]>('/').then(({ data }) => {
      setEmployees(data)
    }).catch((err) => console.log(err))
  }, [get])

  useEffect(() => {
    getAllEmployees()
  }, [getAllEmployees])

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const employeesToView = searchTerm !== '' ? filteredEmployees : employees

  return (
    <Page title='Funcionários'>
      <Box sx={{ display: ['block', 'block', 'flex'], alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Stack direction={['column', 'column', 'row']} spacing={4} alignItems={['flex-start', 'center', 'flex-start']} width={['100%', '100%', '60%']}>
          <ButtonGroup size='sm' isAttached variant='outline'>
            <Button onClick={() => router.push('/employee/add')}>Adicionar novo funcionário</Button>
            <IconButton 
              aria-label='Add new employee' 
              icon={<AddIcon />} 
              onClick={() => router.push('/employee/add')}
            />
          </ButtonGroup>
          <Input
            placeholder='Buscar por nome, cargo ou departamento'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='sm'
            width={['100%', '100%', '60%']}
          />
        </Stack>
      </Box>
      {employees ? <EmployeeTable employees={employeesToView} setEmployees={setEmployees}/> : <div></div>}
    </Page>
  )
}
