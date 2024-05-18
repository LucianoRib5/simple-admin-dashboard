'use client'
import EmployeeForm from '@/components/EmployeeForm/EmployeeForm'
import Page from '@/components/Page'

const AddEmployeePage = () => {
  return (
    <Page title='Adicionar Funcionário'>
      <EmployeeForm addEmployee/>
    </Page>
  )
}

export default AddEmployeePage