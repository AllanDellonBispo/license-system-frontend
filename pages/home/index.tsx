import { Badge, Box, Button, Switch, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import React, { useEffect, useState } from "react";
import { atualizaAtivacao, Empresa } from '../hooks/useEmpresas';
import { api } from '../../services/api';
import Router from 'next/router';


export default function Home() {

    const [empresas, setEmpresas] = useState<Empresa[]>();

    const toast = useToast();

    const buscaEmpresas = async () => {
        await api.get(`/empresa/todas`)
            .then(response => {
                setEmpresas(response.data);
            })
            .catch(e => alert('Não foi'))
    }

    const update = async (values: Empresa) => {
        try {
            await atualizaAtivacao(values?.id)
            toast({
                id: 'teste-toast',
                title: values?.ativo ? `Empresa ${values?.nomeFantasia} desativada` : `Empresa ${values?.nomeFantasia} ativada`,
                position: 'top-left',
                isClosable: true,
                status: 'success'
            })

            Router.push('/home');
        } catch {
            toast({
                title: `Erro ao cadastrar empresa`,
                position: 'top-left',
                isClosable: true,
                status: 'error'
            })
        }
    }

    useEffect(() => {
        buscaEmpresas();
    }, [])


    return (
        <Box justifyContent={'center'} borderRadius={6} >
            <TableContainer >
                <Table variant='spaced' w={'100%'} h={'100vh'} borderRadius={16} >
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead borderRadius={6} >
                        <Tr bg={'#f6f6f6'} borderRadius={16}>
                            <Th textAlign={'center'}>Razão Social</Th>
                            <Th>E-mail</Th>
                            <Th>CNPJ</Th>
                            <Th>Telefone</Th>
                            <Th>Ultima Renovação</Th>
                            <Th >Vencimento</Th>
                            <Th>Opções</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {empresas?.map(e => {
                            return (
                                <Tr key={e?.id} border={'1px solid #eff4f8'} borderRadius={16} bg={'white'}>
                                    <Td display={'flex'} alignItems={'center'} pl={10} gap={2} h={'100%'}>
                                        <Switch size='md' defaultChecked={e?.ativo} colorScheme={'linkedin'} onChange={() => update(e)} />
                                        <BsFillInfoCircleFill />
                                        {e?.razaoSocial}
                                    </Td>
                                    <Td>{e?.contato?.email}</Td>
                                    <Td>{e?.cnpj}</Td>
                                    <Td>{e?.contato?.telefoneResidencial}</Td>
                                    <Td>{new Date(e?.ultimaRenovacao).toLocaleDateString()}</Td>

                                    <Td>{new Date(e.vencimento) < new Date() ?
                                        <Badge colorScheme='red' variant='subtle'>
                                            {new Date(e?.vencimento).toLocaleDateString()}
                                        </Badge> :
                                        <Badge colorScheme='green' variant='subtle'>
                                            {new Date(e?.vencimento).toLocaleDateString()}
                                        </Badge>}
                                    </Td>

                                    <Td >
                                        <Button
                                            color={'#C53030'} size={'xs'}
                                            p={2} borderRadius={6}
                                            _hover={{
                                                background: '#C53030',
                                                color: 'white'
                                            }}><DeleteIcon /></Button>

                                        <Button
                                            color={'#76E4F7'}
                                            size={'xs'} p={2}
                                            borderRadius={6}
                                            onClick={() => Router.push(`/empresas/${e?.id}`)}
                                            _hover={{
                                                background: '#76E4F7',
                                                color: 'white'
                                            }}><EditIcon /></Button>

                                        <Button
                                            color={'#48BB78'}
                                            size={'xs'} p={2}
                                            borderRadius={6}
                                            _hover={{
                                                background: '#48BB78',
                                                color: 'white'
                                            }}><RiMoneyDollarCircleLine /></Button>

                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
