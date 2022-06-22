import Document,{Head, Html, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

				

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }


  render() {
    return (
      <Html>
      <Head>
      <script src="https://consent.cookiefirst.com/sites/localhost-4283da56-b79b-4c0e-aa56-742a3e866860/consent.js"></script>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-193051356-1"></script>
					<script dangerouslySetInnerHTML={{__html:`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'UA-193051356-1');
					`}}></script> */}
      </Head>
      <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}