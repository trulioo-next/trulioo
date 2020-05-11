import React from 'react';


const GoogleTagManager = ({props}) => {

  return (
    <React.Fragment>
      <noscript
        dangerouslySetInnerHTML={{ __html: `
          <iframe title="GTM" src="//www.googletagmanager.com/ns.html?id=GTM-MP7WD8" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `}}
      />
      <script
        dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MP7WD8');
        `}}
      />
    </React.Fragment>
  );
}

export default GoogleTagManager;
