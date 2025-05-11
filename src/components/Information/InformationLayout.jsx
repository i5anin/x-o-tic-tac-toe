import React from 'react';
import PropTypes from 'prop-types';

import styles from './Information.module.css';

const InformationLayout = ({ status }) => (
	<div className={styles.information}>{status}</div>
);

InformationLayout.propTypes = {
	status: PropTypes.string.isRequired,
};

export default InformationLayout;
