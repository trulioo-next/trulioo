//
const fetch = require('../utils/fetch')
var fs = require('fs')
import React from 'react';

// TODO: Add .env var here 
const WP_DATA = 'https://content.7-eleven.ca/wp-json/wp/v2/pages';
const WP_NUTITIONALS = 'https://content.7-eleven.ca/wp-json/api/v1/nutritionals';
let newDate = new Date();
const originalUrl = 'https://dev4.7eleven.ca'

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
            .map(({slug, date, priority}) => {
                return `
                    <url>
                        <loc>${`${originalUrl}/${slug}`}</loc>
                        <lastmod>${`${date}`}</lastmod>
                        <priority>${`${priority}`}</priority>
                    </url>
                `;
            })
            .join('')}
    </urlset>
    `;

class Sitemap extends React.Component {


    static async getInitialProps({res}) {
      const request = await fetch(WP_DATA);
      const nutritionals = await fetch(WP_NUTITIONALS);

      let pages = await request;
      let formatted = [];
      const excluded = ['[slug].js', '_app.js', '_document.js', 'api', '.DS_Store']
      let dateFormatted = formatDate(newDate)
      let pageNames = await readdirAsync('./pages');


      console.log('nutritionals ::>> ' , nutritionals.taxonomies)

      // add home page first :
      formatted.push( {slug:'', date:dateFormatted , priority:'1.0'} )


      if(pageNames) {
       for (var i=0; i < pageNames.length; i++) {
          if(!excluded.includes(pageNames[i])) {
            let priority = '0.9';
            formatted.push( {slug:pageNames[i], date:dateFormatted, priority } );

          }
        }
      }

      for(var i = 0; i < pages.length; i++ ) {
        if(pages[i].slug && pages[i].slug !== ''  ) {
          let fd = new Date(pages[i].modified)
          let d = formatDate(fd)
          formatted.push( {slug:pages[i].slug, date:d, priority:'0.8'} )
        }
      }

      // Format static pages
      formatted.push( {slug:'7rewards/account', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/faq', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/forgotpassword', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/logout', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/myaccount', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/register', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/signin', date:dateFormatted , priority:'0.9'} )
      formatted.push( {slug:'7rewards/signout', date:dateFormatted , priority:'0.9'} )
     
      //
      res.setHeader('Content-Type', 'text/xml');
      res.write(createSitemap(formatted));
      res.end();
    }
}
//
function readdirAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Format date W3C
//
function formatDate (date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  month ++;
  if (month < 10) {
    month = '0' + month;
  }
  var day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  var hours = date.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  var offset = -date.getTimezoneOffset();
  var offsetHours = Math.abs(Math.floor(offset / 60));
  var offsetMinutes = Math.abs(offset) - offsetHours * 60;
  if (offsetHours < 10) {
    offsetHours = '0' + offsetHours;
  }
  if (offsetMinutes < 10) {
    offsetMinutes = '0' + offsetMinutes;
  }
  var offsetSign = '+';
  if (offset < 0) {
    offsetSign = ':';
  }
  return year + '-' + month + '-' + day;
}

export default Sitemap;
