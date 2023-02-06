import { Box, Button, Flex, Grid, GridItem, Input, InputGroup, InputLeftElement, Select, Text, useToast } from '@chakra-ui/react'
import React, { useState } from "react";
import { Empresa } from '../hooks/useEmpresas';
import { api } from '../../services/api';
import { FaUserAlt, FaMapMarkedAlt, FaUserTie } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { BsFillCalendarDateFill, BsCalendarXFill } from 'react-icons/bs';
import { MdContactPhone, MdEmail } from 'react-icons/md';
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";
import Router from 'next/router';


export default function Home() {

    const { register, handleSubmit, formState, reset } = useForm();
    const toast = useToast();

    const [empresas, setEmpresas] = useState<Empresa>();

    const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    const create = async (values: any) => {
        try {
            await api.post('/empresa', JSON.stringify(values));
            toast({
                title: `Empresa cadastrada`,
                position: 'top-left',
                isClosable: true,
                status: 'success'
            })
            Router.push('/home');
        } catch {
            toast({
                title: `Empresa cadastrada`,
                position: 'top-left',
                isClosable: true,
                status: 'error'
            })
        }
    }

    return (
        <Box as='form'
            onSubmit={handleSubmit(create)}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            borderRadius={6}
            bg={'white'} >
            <Text fontSize={20} pl={10} pt={10}>Cadastro de empresa</Text>
            <Grid templateColumns="repeat(12,1fr)" gap={6} marginLeft={10} marginRight={10} pt={10}>
                <GridItem colSpan={6} >
                    <Text>Nome Fantasia</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <HiBuildingOffice2 />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do nome fantasia"
                            required
                            {...register("nomeFantasia")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={6} >
                    <Text>Razão Social</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <HiBuildingOffice2 />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada da razão social"
                            required
                            {...register("razaoSocial")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>CNPJ</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaUserAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do cnpj"
                            as={InputMask}
                            mask="**.***.***/****-**"
                            // maskChar={null}
                            required
                            {...register("cnpj")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Inscrição Estadual</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaUserAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada da incrição Estadual"
                            as={InputMask}
                            mask="*********"
                            // maskChar={null}
                            required
                            {...register("incricaoEstadual")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Vencimento</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <BsCalendarXFill />
                        </InputLeftElement>
                        <Input
                            type="date"
                            alt="entrada do vencimento"
                            required
                            {...register("vencimento")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Ultima Renovação</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <BsFillCalendarDateFill />
                        </InputLeftElement>
                        <Input
                            type="date"
                            alt="entrada da ultima renovação"
                            required
                            {...register("ultimaRenovacao")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Tipo de Logradouro</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do tipo de logradouro"
                            placeholder='Rua'
                            required
                            {...register("endereco.tipoLogradouro")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Logradouro</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do Logradouro"
                            required
                            {...register("endereco.logradouro")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Número</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do numero"
                            required
                            {...register("endereco.numero")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Complemento</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do complemento"
                            required
                            {...register("endereco.complemento")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={2} >
                    <Text>CEP</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do cep"
                            // as={InputMask}
                            // mask="*****-***"
                            // maskChar={null}
                            required
                            {...register("endereco.cep")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={2} >
                    <Text>Bairro</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do bairro"
                            required
                            {...register("endereco.bairro")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Municipio</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do municipio"
                            required
                            {...register("endereco.municipio")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={2} >
                    <Text>UF</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Select pl={3.5} {...register("endereco.uf")} required >
                            {estados.map(e => {
                                return (<option key={e} defaultValue={e}>{e}</option>);
                            })}
                        </Select>
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Pais</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaMapMarkedAlt />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do pais"
                            required
                            {...register("endereco.pais")} />
                    </InputGroup>
                </GridItem>


                <GridItem colSpan={3} >
                    <Text>E-mail</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <MdEmail />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do email"
                            required
                            {...register("contato.email")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Telefone Escritório</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <MdContactPhone />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do telefone residencial"
                            required
                            {...register("contato.telefoneResidencial")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>Nome do contato</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <FaUserTie />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do nome contato"
                            required
                            {...register("contato.nomeContato")} />
                    </InputGroup>
                </GridItem>

                <GridItem colSpan={3} >
                    <Text>celular</Text>
                    <InputGroup>
                        <InputLeftElement>
                            <MdContactPhone />
                        </InputLeftElement>
                        <Input
                            type="text"
                            alt="entrada do celular"
                            required
                            {...register("contato.celular")} />
                    </InputGroup>
                </GridItem>
            </Grid>
            <Flex justifyContent={'space-between'} mt={8} pb={8}>
                <Button onClick={() => Router.push('/home')} colorScheme='red' color={'white'} ml={10}>Voltar</Button>
                <Button type='submit' isLoading={formState.isSubmitting} colorScheme='green' color={'white'} mr={10}>Cadastrar</Button>
            </Flex>
        </Box>
    )
}
