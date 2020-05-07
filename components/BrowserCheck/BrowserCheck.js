import React from 'react';
import Link from 'next/link';


const BrowserCheck = ({props}) => {

  // --- This code is from https://browser-update.org/#install
  // --- Tells users of IE 11 and below to upgrade
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var $buoop = {required:{e:12},api:2020.05 }; 
          function $buo_f(){ 
            var e = document.createElement("script"); 
            e.src = "//browser-update.org/update.min.js"; 
            document.body.appendChild(e);
          };
          try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
          catch(e){window.attachEvent("onload", $buo_f)}
        `,
        }}
    />
  );
}

export default BrowserCheck;
