import { ReactNode } from 'react'
import { Avatar, Box, Container, Flex, Heading, Tooltip, useColorModeValue } from '@chakra-ui/react'

type Props = {
  children?: ReactNode
  title?: string
}

const Page: React.FC<Props> = ({ children, title }) => {
  return (
    <Box
      as='main'
      display='flex'
      flexDirection='column'
      width='100vw'
      height='100vh'
      overflowX='hidden'
    >
      <Box
        as='header'
        position='static'
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
      >
        <Flex
          h={16}
          alignItems='center'
          justifyContent='space-between'
        >
          <Heading
            size='md'
            fontFamily='monospace'
            fontWeight={700}
            letterSpacing='.3rem'
          >
            Dashboard
          </Heading>

          <Tooltip label=''>
            <Avatar size='sm'/>
          </Tooltip>
        </Flex>
      </Box>

      <Flex flex='1'>
        <Box minWidth='12%' boxShadow='md' display={['none', 'none', 'block']}/>
        <Box
          flex='1'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-start'
          width='100%'
        >
          <Container maxW='90%'>
            <Heading as='h3' size='lg' textAlign='start' my={2}>
              {title}
            </Heading>
            {children}
          </Container>
        </Box>
      </Flex>
    </Box>
  )
}

export default Page
