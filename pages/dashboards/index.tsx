import { Box, Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import { api } from '../../services/api';
import { buscaTotalEmpresa } from '../hooks/useEmpresas';
import { utilizacao } from '../hooks/useModulos';
// import Chart from "react-apexcharts";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const state = {
    options: {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'text',
            categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        },
        tooltip: {
            // x: {
            //     format: 'dd/MM/yy HH:mm'
            // },
        },
    },
    series: [{
        name: '2022',
        data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42]
    }, {
        name: '2021',
        data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34]
    }],
};

const stateRadial = {

    series: [80],
    options: {
        chart: {
            height: 100,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: '30%',
                    image: '../../assets/images/clock.png',
                    imageWidth: 64,
                    imageHeight: 64,
                    imageClipped: false
                },
                dataLabels: {
                    name: {
                        show: false,
                        color: "#171923"
                    },
                    value: {
                        show: true,
                        color: '#07b492',
                        offsetY: 10,
                        fontSize: '22px'
                    }
                }
            }
        },
        fill: {
            colors: ["#ABE5A1"],
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ['#0c9288'],
                inverseColors: true,
                opacityFrom: [1],
                opacityTo: [1],
                stops: [0, 100]
            }
        },

        stroke: {
            lineCap: 'round'
        },
        labels: ['Teste', 'Teste2'],
    },
};

export default function Dashboard() {

    const [receita, setReceita] = useState<number>(0);
    const [qtdEmpresas, setQtdEmpresas] = useState<number>(0);
    const [utilizacaoModulos, setUtilizacaoModulos] = useState<[]>([]);

    const buscaReceita = () => {
        api.get(`/empresa/receita`)
            .then(response => setReceita(response.data))
            .catch(() => alert('Erro'));
    }

    const buscaEmpresas = async () => {
        setQtdEmpresas(await buscaTotalEmpresa());
    }

    const buscaUtilizacao = async () => {
        setUtilizacaoModulos(await utilizacao());
    }

    useEffect(() => {
        buscaReceita();
        buscaEmpresas();
        buscaUtilizacao();
    }, [])


    return (
        <Box justifyContent={'center'} alignItems={'center'} bg='white' p={4} gap={2} >
            <Flex justifyContent={'space-between'} w={'100%'}>
                <Box p={4} borderRadius={4} boxShadow='2xl' rounded='md' bg='white' h={140}>
                    <Text>Receita mensal</Text>
                    <Box fontSize={50} fontWeight={'extrabold'} color={'green.300'}>R${receita},00</Box>
                </Box>
                <Box p={4} borderRadius={4} boxShadow='2xl' rounded='md' bg='white' h={140}>
                    <Text>Estimativa/ano</Text>
                    <Box fontSize={50} fontWeight={'extrabold'} color={'green.300'}>R${receita * 12},00</Box>
                </Box>
                <Box p={4} borderRadius={4} boxShadow='2xl' rounded='md' bg='white' h={140}>
                    <Text>Utilização de módulos</Text>
                    <Box fontSize={50} fontWeight={'extrabold'} color={'green.300'}>{utilizacaoModulos[1]}/{utilizacaoModulos[0]} usados</Box>
                </Box>
                <Box p={4} borderRadius={4} boxShadow='2xl' rounded='md' bg='white' h={140}>
                    <Text>Total clientes</Text>
                    <Box fontSize={50} fontWeight={'extrabold'} color={'green.300'}>{qtdEmpresas} clientes</Box>
                </Box>
            </Flex>

            <Flex justifyContent={'space-around'} mt={4} gap={4} w={'100%'}>
                <Box alignSelf={'center'} borderRadius={4} p={2} boxShadow='2xl' rounded='md' bg='white' w={'100%'} h={'100%'}>
                    <Text>Rendimento anual</Text>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="area"
                    />
                </Box>

                <Box alignSelf={'center'} borderRadius={4} p={6} boxShadow='2xl' rounded='md' bg='white' w={'78%'}>
                    <Text>Grau de utilização dos módulos</Text>
                    <Chart
                        options={stateRadial.options}
                        series={[67]}
                        type="radialBar"
                    />
                </Box>
            </Flex>
        </Box >
    )
}
