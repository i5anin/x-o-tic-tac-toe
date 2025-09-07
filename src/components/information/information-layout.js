import { Component } from 'react';
import PropTypes from 'prop-types';

export class InformationLayout extends Component {
	render() {
		return <div>{this.props.information}</div>;
	}
}

InformationLayout.propTypes = {
	information: PropTypes.string,
};
