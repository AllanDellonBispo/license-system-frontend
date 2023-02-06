import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import React, { useEffect, useState } from "react";
import { atualizaAtivacao, Empresa } from '../hooks/useEmpresas';
import { api } from '../../services/api';
import Router from 'next/router';
import { cadastraModulo, Modulo } from '../hooks/useModulos';
import { GrAdd } from 'react-icons/gr';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';



export default function Modulos() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const { register, handleSubmit } = useForm<Modulo>();
    const [reqCadastro, setReqCadastro] = useState<boolean>(false);

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [modulos, setModulos] = useState<Modulo[]>();

    const buscaModulos = async () => {
        await api.get(`/modulo/todos`)
            .then(response => {
                setModulos(response.data);
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
        buscaModulos();
    }, []);

    const onSubmit: SubmitHandler<Modulo> = async (data) => {
        setReqCadastro(true);

        try {
            cadastraModulo(data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            buscaModulos();
            toast({
                title: `Módulo cadastrado com sucesso.`,
                status: 'success',
                position: 'top-left',
                isClosable: true,
            });
            setReqCadastro(false);
            onClose();
        } catch {
            toast({
                title: `Erro ao realizar cadastro.`,
                status: 'error',
                position: 'top-left',
                isClosable: true,
            })
            setReqCadastro(false);
        }
    };


    return (
        <Box
            justifyContent={'center'}
            borderRadius={6} >
            <TableContainer >
                <Table variant='spaced' w={'100%'} borderRadius={16} >
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead borderRadius={6} w={'100%'} >
                        <Tr bg={'#f6f6f6'} borderRadius={16}>
                            <Th >Nome</Th>
                            <Th>Descrição</Th>
                            <Th>Valor</Th>
                            <Th>Opções</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {modulos?.map(e => {
                            return (
                                <Tr key={e?.id} border={'1px solid #eff4f8'} borderRadius={16} bg={'white'}>
                                    <Td>{e?.nome}</Td>
                                    <Td>{e?.descricao}</Td>
                                    <Td color={'green'} >R${Number(e?.valor).toFixed(2)}</Td>
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
            <Button
                as={'button'}
                position={'fixed'}
                right={0}
                bottom={0}
                mr={4}
                mb={4}
                fontSize={26}
                color={'white'}
                bg={'#00b5d8'}
                p={2}
                borderRadius={'full'}
                _hover={{
                    background: '#008fac'
                }}
                onClick={onOpen}><AddIcon /></Button>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent
                    as={'form'}
                    onSubmit={handleSubmit(onSubmit)} >
                    <ModalHeader>Cadastro de módulo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input placeholder='nome' {...register('nome')} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descrição</FormLabel>
                            <Textarea placeholder='Descrição' {...register('descricao')} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Valor</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.900'
                                    fontSize='1.2em'
                                    children='R$'
                                />
                                <Input placeholder={'Valor'} color={'green'} {...register('valor')} />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='linkedin' mr={3} type={'submit'} isLoading={reqCadastro}>
                            Cadastrar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
