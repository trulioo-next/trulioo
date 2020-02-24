import React from 'react'
import Link from 'next/link'

import css from './Footer.scss';

const links = [
  { href: '/about', as: '/about', label: 'About' },
  { href: '/contact', as:'/contact', label: 'Contact' }
].map(link => {
  link.key = `nav-link-${link.as}-${link.label}`
  return link
})

const Footer = () => (
  <footer>
    <ul>
      {links.map(({ key, href, as, label }) => (
        <li key={key}>
          <Link href={href} as={as}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </footer>
)

export default Footer
