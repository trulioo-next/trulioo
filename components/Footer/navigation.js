import React, { useState, useEffect, Fragment } from 'react';
import classnames from 'classnames';
import {connect, useDispatch,  useSelector } from 'react-redux';
import { selectFooterData } from '@/stores/app/selectors';

export const Navigation = () => {
	const dispatch = useDispatch();
	const footerData = useSelector(state => selectFooterData(state));
	
  	const buildMenu = () => {
		if (footerData) {
			return footerData[0].footer.menu.map((item,index) => {
				if (item['post_type'] === 'nav_menu_item') {
					const { title, url, sub_nav } = item;
					return (
						<div className="mb-5 mb-md-0 col-6 col-md-2 d-flex flex-column px-3" key={ index }>
							<h3 className={ classnames('mb-5', item['attr_title'] ) }>
								{ item['attr_title'] === 'newsletter'
									? (
										<div className="d-flex align-items-center">
											<div className="newsletter-background">
												<ion-icon name="newspaper-outline"></ion-icon>
											</div>
											<a href={ url } title={ title }>
												{ title }
											</a>
										</div>
									)
								: title
								}
							</h3>
							{ sub_nav && sub_nav.map((subItem,index) => (
									<a className="mb-1" href={ subItem.url } key={ index } title={ subItem.title }>
										{ subItem.title }
									</a>
								))
							}
					 </div>
				 );
			 };
		 });
		};
	};

  return (
		<div className="row footer__main pb-md-5">
    	{buildMenu()}
		</div>
  );
};
