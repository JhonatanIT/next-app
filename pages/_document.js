import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()        //Create style in the server
    const originalRenderPage = ctx.renderPage   

    try {

      //Get all style of my app and store in App
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(<App {...props} />),
        })

      //Get initial props
      const initialProps = await Document.getInitialProps(ctx)

      //initial styles + new styles
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}
