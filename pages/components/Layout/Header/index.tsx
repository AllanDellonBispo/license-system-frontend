import React from 'react';
import {
    Avatar,
    Box, Button, Flex
} from '@chakra-ui/react';


export default function Header() {

    return (
        <Box h={70} borderBottom={'1px solid #E2E8F0'} bg={'white'} >
            <Flex justifyContent={'flex-end'} alignItems={'center'} h={'100%'} pr={18} >
                <Avatar as='button' name='Allan Bispo' src='https://bit.ly/broken-link' bg={'#00B5D8'} w={10} h={10} borderRadius={30} />
            </Flex>
        </Box >
    );
}
