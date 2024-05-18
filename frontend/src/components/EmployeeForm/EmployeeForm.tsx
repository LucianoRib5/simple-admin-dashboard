import { IEmployee } from '@/Interfaces/IEmployee'
import { Text, Input, Box, Button, useToast, FormErrorMessage, FormControl, Stack } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ApiService from '@/services/ApiService'

interface FormData {
  name: string
  position: string
  department: string
  hireDate: string
}

interface EmployeeFormProps  {
  preloadedValues?: FormData
  employeeId?: string
  addEmployee?: boolean
  setEmployee?: Dispatch<SetStateAction<IEmployee | undefined>>
}

const EmployeeForm = ({ preloadedValues, employeeId, addEmployee, setEmployee }: EmployeeFormProps) => {
  const [processing, setProcessing] = useState(false)
  const hireDate = preloadedValues?.hireDate && new Date(preloadedValues.hireDate).toISOString().slice(0, 10)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {...preloadedValues, hireDate: hireDate}
  })

  const { put, post } = ApiService
  const toast = useToast()

  const updateEmployee = (data: FormData) => {
    setProcessing(true)
    put<IEmployee>(`/${employeeId}`, data ).then(({ data }) => {
      setEmployee && setEmployee(data)
      setTimeout(() => setProcessing(false), 1000)
      setTimeout(() => toast({
        position: 'top',
        title: 'Atualização realizada!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      }), 1000)      
    }).catch((err) => console.log(err))
  }

  const createNewEmployee = (data: FormData) => {
    setProcessing(true)
    post<IEmployee>('/', data ).then(({ data }) => {
      setTimeout(() => setProcessing(false), 1000)
      setTimeout(() => {
        toast({
          title: 'Novo funcionário adicionado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        reset()
      }, 1000)
    }).catch((err) => console.log(err))
  }

  return (
    <Box as='form' onSubmit={handleSubmit(addEmployee ? createNewEmployee : updateEmployee)}>
    <>
      <Text mb='8px'>Nome:</Text>
      <FormControl isInvalid={!!errors.name} mb={4}>
        <Input
          {...register('name', {
            required: 'Nome é obrigatório',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Nome não pode conter números',
            },
          })}
          placeholder='Informe o nome do funcionário'
          name='name'
          size='md'
          type='text'
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    </>
    <>
      <Text mb='8px'>Cargo:</Text>
      <FormControl isInvalid={!!errors.position} mb={4}>
        <Input
          {...register('position', {
            required: 'Cargo é obrigatório',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Cargo não pode conter números',
            },
          })}
          placeholder='Informe o cargo do funcionário'
          name='position'
          size='md'
          type='text'
        />
        <FormErrorMessage>
          {errors.position && errors.position.message}
        </FormErrorMessage>
      </FormControl>
    </>
    <>
      <Text mb='8px'>Departamento:</Text>
      <FormControl isInvalid={!!errors.department} mb={4}>
        <Input
          {...register('department', {
            required: 'Departamento é obrigatório',
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Departamento não pode conter números',
            },
          })}
          placeholder='Informe o departamento do funcionário'
          name='department'
          size='md'
          type='text'
        />
        <FormErrorMessage>
          {errors.department && errors.department.message}
        </FormErrorMessage>
      </FormControl>
    </>
    <>
      <Text mb='8px'>data de admissão:</Text>
      <Input
        {...register('hireDate', { required: true })} 
        placeholder='Selecione a data de admissão'
        name='hireDate'
        size='md' 
        type='date'
        max={new Date().toISOString().split('T')[0]}
      />
    </>
 
    <Box sx={{ display: ['block', 'block', 'flex'], gap: '1rem', marginTop: '1rem' }}>
      <Stack direction={['column', 'column', 'row']} spacing={4} align={['center', 'center', 'flex-end']}>
        <Button 
          isLoading={processing}
          loadingText='processando'
          colorScheme='teal' 
          variant='solid' 
          type='submit'
          sx={{width: '20rem'}}
        >
          Salvar
        </Button>
        <Button
          colorScheme='red' 
          variant='outline'
          onClick={() => router.push('/')}
          sx={{width: '20rem'}}
        >
          Voltar
        </Button>
    </Stack>
</Box>
  </Box>
  )

}

export default EmployeeForm