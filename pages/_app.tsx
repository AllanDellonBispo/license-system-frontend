
import * as React from 'react'
import { Flex, Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'


import type { AppProps } from 'next/app'
import Sidebar from './components/Layout/SideBar';
import Header from './components/Layout/Header';
import { theme } from '../styles/theme';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const route = useRouter().pathname;

  return (
    <ChakraProvider theme={theme}>
      {route.includes('/login') ? (
        <Component {...pageProps} />) :
        (
          <Flex bg={'#edf2f7'}>
            <Box mr={1} bg={'white'}>
              <Sidebar />
            </Box>
            <Box w={'100%'} >
              <Header />
              <Box ml={1} mr={2} mt={2} >
                <Component {...pageProps} />
              </Box>
            </Box>
          </Flex>)
      }
    </ChakraProvider >
  )
}
