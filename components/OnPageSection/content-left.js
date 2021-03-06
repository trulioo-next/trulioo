import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container,Row,Col } from 'reactstrap';
import classnames from 'classnames';

export const ContentLeft = ({ component }) => {
	return (
		<section
      style={ {
        backgroundImage:`url(${ component.desktop_image })`,
        backgroundColor: component.background_color,
      } }
      className={ classnames(
        'solution-two-column solution-two-column--left py-md-5 p-0 on-page-section-left',
        component.frontend_identifier,
       ) }
			id={ component.anchor }
    >
			<Container className='py-0 pb-5'>
				<Row>
          <Col className='px-0 d-md-none' xs='12'>
						<img className='img-fluid d-block w-100' src={ component.image.url } alt={ component.image.alt } title={ component.image.title } />
					</Col>
					<Col xs='12' md='7' className="py-5 px-5 px-md-4">
						<h2 className='section-title d-flex align-items-center'>
							{ component.icon && (
								<span className='icon mr-3'>
									<img
										className='d-inline-block'
										src={ component.icon.url }
										alt={ component.icon.alt }
										width={ component.icon.width }
										height={ component.icon.height }
									/>
								</span>
							)}
          		<span className="d-inline-block" dangerouslySetInnerHTML={ { __html: component.title } } />
						</h2>
						<div dangerouslySetInnerHTML={ { __html: component.paragraph || 'No HTML' } } />
						{ component.list && (
							<ul className='lead my-5 px-0'>
								{ component.list.map((list, index) =>
								(
									<li className="px-0" key={ index }>{ list.title }</li>
								)
								)}
							</ul>
						)}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

ContentLeft.propTypes = {
  component: PropTypes.object,
};
