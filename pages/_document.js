import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: App => App,

        // useful for wrapping in a per-page basis
        enhanceComponent: Component => Component,
      });

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="//use.typekit.net/aek2dxs.css" />
          <script src="//unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
          <script src="//app-sjqe.marketo.com/js/forms2/js/forms2.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="//irtrulioo4.wpengine.com/wp-content/uploads/custom-css-js/google-analytics.js"></script>
          <script src="//irtrulioo4.wpengine.com/wp-content/uploads/custom-css-js/live-chat.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
