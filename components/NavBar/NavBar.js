import React from 'react'
import Link from 'next/link'

import './NavBar.scss'

const links = [
  { href: '/about', as: '/about', label: 'About' },
  { href: '/contact', as:'/contact', label: 'Contact' }
].map(link => {
  link.key = `nav-link-${link.as}-${link.label}`
  return link
})

const NavBar = () => (
 
  <nav>
    <li className="site__logo">
      <Link href='/'>
        <a><img src="/static/images/default-site-image.png" /></a>
      </Link>
    </li>
    <div className="float__items">
      {links.map(({ key, href, as, label }) => (
        <li key={key} className="not__on__mobile">
          <Link href={href} as={as}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </div>

    <button role="tab" className="header__menu js-toggle-menu">
      <div></div>
      <div></div>
      <div></div>
    </button>
  </nav>
)
export default NavBar
