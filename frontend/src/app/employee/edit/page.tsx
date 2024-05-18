'use client' 
import { useCallback, useEffect, useState } from 'react'
import { IEmployee } from '@/Interfaces/IEmployee'
import { useSearchParams } from 'next/navigation'
import EmployeeForm from '@/components/EmployeeForm/EmployeeForm'
import Page from '@/components/Page'
import ApiService from '@/services/ApiService'

const EditEmployeePage = () => {
  const [employee, setEmployee] = useState<IEmployee>()
  const searchParams = useSearchParams() 
  const employeeId = searchParams.get('employeeId')
  
  const { get } = ApiService

  const getEmployeeById = useCallback(() => {
    get<IEmployee>(`/${employeeId}`).then(({ data }) => {
      setEmployee(data)
    }).catch((err) => console.log(err))
  }, [employeeId, get])
  
  useEffect(() => {
    getEmployeeById()
  }, [getEmployeeById])

  return (
    <Page title='Editar Funcionário'>
      {employee ? <EmployeeForm preloadedValues={employee} employeeId={employeeId as string} setEmployee={setEmployee}/> : <div></div>}
    </Page>
  )
}

export default EditEmployeePage