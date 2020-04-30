import Document, { Html, Head, Main, NextScript } from 'next/document'

// import Device from "@commerce-ui/core/Device";
import { GA_TRACKING_ID } from '../utils/gtag.js'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () =>
            originalRenderPage({

                // useful for wrapping the whole react tree
                enhanceApp: App => App,

                // useful for wrapping in a per-page basis
                enhanceComponent: Component => Component,

            })

        // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)

        return { ...initialProps }
    }

    render() {
        return (
            <Html>
              <Head>

                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    });
                `,
                    }}
                />
                    
              </Head>
              <body>
               
                <Main/>
                <NextScript/>
              </body>
            </Html>
        );
    }
}

export default MyDocument