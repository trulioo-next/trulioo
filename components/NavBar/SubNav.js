import React from 'react';
import Link from 'next/link';

/**
 * TODO: Might want to refactor or clean up code later.
 */

const NestedSubNav = (props) => {
    return (
        <ul className="site-header__submenu site-header__submenu--nested">
        {props.items.map(({ href, as, label }) => (
            <li className="site-header__item site-header__item--nested">
                <Link href={href} as={as}><a>{label}</a></Link>
            </li>))
        }
        </ul>
    )
}

const SubNav = (props) => {
    const items = props.items;
  let hasThirdLevel = false;
  var i, l = items.length;

  for (i = 0; i < l; i +=1) {
    if (items[i].subnav) {
      hasThirdLevel = true;
      break;
    }
  }

  return (
    <div className={ hasThirdLevel ? 'site-header__subnav site-header__subnav--has-grandchildren' : 'site-header__subnav' }>
        <ul className="site-header__submenu">
        {
        items.map(({ key, href, as, label, subnav }) => {
            return hasThirdLevel ? (
                <li key={key} className="site-header__item site-header__item--nested">
                    <Link href={href} as={as}><a className="site-header__subnav-heading">{label}</a></Link>
                    { subnav && <NestedSubNav items={subnav} /> }
                </li>
            ) : (
                <li className="site-header__item site-header__item--nested">
                    <Link href={href} as={as}><a>{label}</a></Link>
                </li>
            )
        })
        }
        </ul>
    </div>
  )
}

export default SubNav;