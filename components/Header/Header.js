import Head from 'next/head'


const Header = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.description} key="description" />

    <meta property="og:type" content="website" key="og:type" />
    <meta name="og:title" property="og:title" content={props.title} key="og:title" />
    <meta name="og:description" property="og:description" content={props.description} key="og:description" />
    <meta property="og:site_name" content={props.title} key="og:site_name" />
    <meta property="og:url" content={`${props.canonical}`} key="og:url" />

    <meta name="twitter:card" content="summary" key="twitter:card" />
    <meta name="twitter:title" content={props.title} key="twitter:title" />
    <meta name="twitter:description" content={props.description} key="twitter:description" />
    <meta name="twitter:site" content="" key="twitter:site" />
    <meta name="twitter:creator" content="" key="twitter:creator" />

    <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
    <link rel="apple-touch-icon" href="/static/images/favicon.ico" />

    {props.css &&
      <link rel="stylesheet" href={`${props.css}`}/>
    }
    {props.image ? (
        <meta property="og:image" content={`${props.image}`} key="og:image" />
      ) : (
        <meta property="og:image" content="/static/images/default-site-image.png" />
      )
    }
    {props.image &&
      <meta name="twitter:image" content={`${props.image}`} />
    }
    {props.canonical &&
      <link rel="canonical" href={`${props.canonical}`} />
    }
    {props.js &&
      <script type="text/javascript" src={`${props.js}`}></script>
    }

  </Head>
)
export default Header
