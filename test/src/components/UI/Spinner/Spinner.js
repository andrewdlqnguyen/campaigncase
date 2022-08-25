import React from 'react';

import * as spinnerStyles from './Spinner.module.css';

/**
 * simple spinner from open source
 * @returns spinner gui for the user interface
 */
const spinner = () => (
    <div className={spinnerStyles.Loader}>Loading...</div>
);

export default spinner;