import { ComponentStyleConfig, extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const config = {
    useSystemColorMode: false,
}

const fonts = {
    heading: "Roboto",
    body: "Roboto"
}

const styles = {

}

const Table: ComponentStyleConfig = {
    baseStyle: {

    },
    variants: {
        spaced: (props: StyleFunctionProps) => ({
            table: {
                borderCollapse: "separate",
                borderSpacing: "0px 10px"
            },
            thead: {
                borderSpacing: "0px 0px"
            },
            tbody: {
                tr: {
                    boxShadow: 'sm',
                },
                td: {
                    bg: "white",
                    "&:first-of-type": {
                        borderRadius: '10px 0 0 10px'
                    },
                    "&:last-of-type": {
                        borderRadius: '0 10px 10px 0'
                    }
                },
            },
        })
    },
}

const theme = extendTheme({
    config,
    fonts,
    styles,
    components: {
        Table
    },
});

export { theme };