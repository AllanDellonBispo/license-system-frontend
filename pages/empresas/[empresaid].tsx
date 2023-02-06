import { Box, Button, Flex, Grid, GridItem, Input, InputGroup, InputLeftElement, Select, Text, useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import { buscaEmpresa, Empresa } from '../hooks/useEmpresas';
import { api } from '../../services/api';
import { FaUserAlt, FaMapMarkedAlt, FaUserTie } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { BsFillCalendarDateFill, BsCalendarXFill } from 'react-icons/bs';
import { MdContactPhone, MdEmail } from 'react-icons/md';
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";
import Router, { useRouter } from 'next/router';


export default function Home() {

    const { register, handleSubmit, formState, reset, setValue } = useForm();


    const toast = useToast();

    const [empresa, setEmpresa] = useState<Empresa>();
    const router = useRouter();
    const { empresaid } = router.query;

    const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    setValue('cnpj', empresa?.cnpj);
    // setValue('inscricaoEstadual', empresa?.inscricaoEstadual);
    setValue('endereco.cep', empresa?.endereco.cep);
    setValue('vencimento', String(empresa?.vencimento).split('T')[0]);
    setValue('ultimaRenovacao', String(empresa?.ultimaRenovacao).split('T')[0]);
    setValue('endereco.uf', empresa?.endereco.uf);

    useEffect(() => {
        buscaEmpresa(Number(empresaid))
            .then(response => setEmpresa(response.data))
            .catch(() => {
                toast({
                    title: `Erro, tente novamente mais tarde`,
                    position: 'top-left',
                    isClosable: true,
                    status: 'error'
                })
            });
    }, [])

    const update = async (values: any) => {
        try {
            await api.put('/empresa', JSON.stringify(values));
            toast({
                title: `Empresa ${values?.razaoSocial} atualizada`,
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

    return (
        <Box as='form'
            onSubmit={handleSubmit(update)}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            borderRadius={6}
            bg={'white'} >
            <Text fontSize={20} pl={10} pt={10}>Atualize os dados da empresa</Text>
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
                            defaultValue={empresa?.nomeFantasia}
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
                            defaultValue={empresa?.razaoSocial}
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
                            {...register("cnpj", { required: true })} />
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
                            // maxLength={10}
                            // defaultValue={empresa?.inscricaoEstadual}
                            required
                            {...register("inscricaoEstadual")} />
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
                            defaultValue={empresa?.endereco?.tipoLogradouro}
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
                            defaultValue={empresa?.endereco?.logradouro}
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
                            defaultValue={empresa?.endereco.numero}
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
                            defaultValue={empresa?.endereco?.complemento}
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
                            as={InputMask}
                            mask="*****-***"
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
                            defaultValue={empresa?.endereco?.bairro}
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
                            defaultValue={empresa?.endereco?.municipio}
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
                                return (<option key={e} >{e}</option>);
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
                            defaultValue={empresa?.endereco?.pais}
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
                            defaultValue={empresa?.contato?.email}
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
                            defaultValue={empresa?.contato?.telefoneResidencial}
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
                            defaultValue={empresa?.contato?.nomeContato}
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
                            defaultValue={empresa?.contato?.celular}
                            required
                            {...register("contato.celular")} />
                    </InputGroup>
                </GridItem>
            </Grid>
            <Flex justifyContent={'space-between'} mt={8} pb={8}>
                <Button onClick={() => Router.push('/home')} colorScheme='red' color={'white'} ml={10}>Voltar</Button>
                <Button type='submit' isLoading={formState.isSubmitting} colorScheme='green' color={'white'} mr={10}>Atualizar</Button>
            </Flex>
        </Box>
    )
}
