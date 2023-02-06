import React from 'react';
import {
    Box,
    Text,
    List,
    ListItem,
    Image,
} from '@chakra-ui/react';

import { AiFillHome } from 'react-icons/ai';
import { FaBuilding } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import { IoSettings } from 'react-icons/io5';
import Router from 'next/router';
import { BsFillBagPlusFill, BsFillBarChartLineFill, BsGraphUp } from 'react-icons/bs';

export default function Sidebar() {

    return (
        <Box
            w={'200px'} h={'100vh'}
            fontFamily={'Open Sans'}
            fontSize={24}
            borderRight={'1px solid #E2E8F0'} >
            <Box textAlign={'left'} pl={2} pr={8} >
                <Box w={'100%'}>
                    <Image src="https://static.vecteezy.com/ti/vetor-gratis/p1/2683061-cidade-urbano-construcao-rua-arranha-ceus-arquitetura-design-gr%C3%A1tis-vetor.jpg" width={130} height={24} borderRadius="full" />
                </Box>
                <Box >
                    <List display={'flex'} flexDirection={'column'} fontSize={16}>
                        <ListItem as='button' textAlign={'left'} _hover={{
                            background: '#0BC5EA',
                            color: 'white',
                            borderRadius: '6px'
                        }}>
                            <Text display={'flex'} alignItems={'center'} p={2} gap={2} onClick={() => Router.push('/home')}><AiFillHome />Principal </Text>
                        </ListItem>
                        <ListItem as='button' textAlign={'left'} _hover={{
                            background: '#0BC5EA',
                            color: 'white',
                            borderRadius: '6px'
                        }}>
                            <Text display={'flex'} alignItems={'center'} p={2} gap={2} onClick={() => Router.push('/empresas/cadastrar')}><FaBuilding />Empresas</Text>
                        </ListItem>
                        <ListItem as='button' textAlign={'left'} _hover={{
                            background: '#0BC5EA',
                            color: 'white',
                            borderRadius: '6px'
                        }}>
                            <Text display={'flex'} alignItems={'center'} p={2} gap={2} onClick={() => Router.push('/dashboards')}><BsFillBarChartLineFill />Dashborads</Text>
                        </ListItem>
                        {/* You can also use custom icons from react-icons */}
                        <ListItem as='button' textAlign={'left'} _hover={{
                            background: '#0BC5EA',
                            color: 'white',
                            borderRadius: '6px'
                        }}>
                            <Text display={'flex'} alignItems={'center'} p={2} gap={2} onClick={() => Router.push('/modulos')}><BsFillBagPlusFill />Módulos</Text>
                        </ListItem>
                        <ListItem as='button' textAlign={'left'} _hover={{
                            background: '#0BC5EA',
                            color: 'white',
                            borderRadius: '6px'
                        }}>
                            <Text display={'flex'} alignItems={'center'} p={2} gap={2}><IoSettings />Configurações</Text>
                        </ListItem>
                    </List>
                </Box>
            </Box >
        </Box >
    );
}
