import React from 'react';
import Link from 'next/link';

import './CookiesBanner.scss';


class CookiesBanner extends React.Component {

  constructor(props) {
    super(props);

    this.COOKIE_NAME = 'viewed_cookie_policy';
    this.COOKIE_EXPIRE = 365;

    this.state = {
      accepted: false,
    };
  }
  

  componentDidMount() {
    if (this.cookiesAccepted())
    { this.setState({ accepted: true });
    }
  }


  cookiesAccepted() {
    return 'yes' === AcceptCookie.read(this.COOKIE_NAME);
  }

  acceptClicked() {
    AcceptCookie.set(this.COOKIE_NAME, 'yes', this.COOKIE_EXPIRE);
    this.setState({ accepted: true });
  }


  render() {
    if (this.state.accepted)
    {
      return false;
    }

    return (
      <div className="CookiesBanner">
        <span>
          <span className="bannerText">
            This website uses cookies which help us to provide you with a good experience while giving us feedback so we can improve our site and your visit. By continuing to use our site, you agree to our use of cookies.
          </span>
          <button className="acceptButton" onClick={(e) => this.acceptClicked(e)}>Accept</button>
          <Link href="/privacy#cookies" as="/privacy#cookies" scroll={true}><a className="moreInfo">More Info</a></Link>
        </span>
      </div>
    );
  }
}

const AcceptCookie = {

  set(name, value, days) {
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          var expires = "; expires=" + date.toGMTString();
      } else
          var expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
      if (days < 1) {
          host_name = window.location.hostname;
          document.cookie = name + "=" + value + expires + "; path=/; domain=." + host_name + ";";
          if (host_name.indexOf("www") != 1) {
              var host_name_withoutwww = host_name.replace('www', '');
              document.cookie = name + "=" + value + expires + "; path=/; domain=" + host_name_withoutwww + ";";
          }
          host_name = host_name.substring(host_name.lastIndexOf(".", host_name.lastIndexOf(".") - 1));
          document.cookie = name + "=" + value + expires + "; path=/; domain=" + host_name + ";";
      }
  },


  read(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
              return c.substring(nameEQ.length, c.length);
          }
      }
      return null;
  },


  exists(name) {
      return (this.read(name) !== null);
  }
}


export default CookiesBanner;