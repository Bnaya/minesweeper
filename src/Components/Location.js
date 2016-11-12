import React, { PropTypes } from 'react';
import './Location.css';

import LocationModel from '../Model/Location';

export default function Location ({model, onRevealRequest, onFlagRequest}, context) {
	function clickHandler (e) {
		if (e.shiftKey) {
			onFlagRequest();
		} else {
			onRevealRequest();
		}
	}

	let content = '';
	let className = 'covered';

	if (model.flagged) {
		content = 'F';
		className = 'flagged';
	}

	if (model.revealed || context.cheat) {
		if (model.mine) {
			content = '!!M!!';
			className = 'mine';
		} else {
			content = model.nearby;
			className = 'nearby';
		}
	}

	return <td onClick={clickHandler} className={`mine-field-location ${className}`}>
		{content}
	</td>;
}

Location.propTypes = {
	model: PropTypes.instanceOf(LocationModel).isRequired,
	onRevealRequest: PropTypes.func.isRequired,
	onFlagRequest: PropTypes.func.isRequired,
};

Location.contextTypes = {
	cheat: PropTypes.bool
}