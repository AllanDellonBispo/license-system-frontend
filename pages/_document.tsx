import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
                    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
                    <link rel="preconnect" href="https://fonts.googleapis.com/" />
                    <link rel="preconnect" href="https://fonts.gstatic.com/" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}