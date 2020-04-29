import React from 'react';

import './Alert.scss';

const Alert = ({alertData: alerts}) => {
	const alertItems = [...alerts];

	return (
		<React.Fragment>
		{ alertItems && alertItems.map && 
			alertItems.map((alertItem, index) => (
				<AlertUI alertItem={alertItem} key={index}/>
			))
		}
		</React.Fragment>
	)
};


const AlertUI = ({alertItem: alert}) => {
	const style = {};
	if (alert.background_colour)
	{	style.backgroundColor = alert.background_colour;
	}

	return (
		<div
			className="AlertUI"
			style={style}
			dangerouslySetInnerHTML={{ __html: alert.content }} />
	)

}


export default Alert;