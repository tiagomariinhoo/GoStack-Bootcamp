import React from 'react';
import PropTypes from 'prop-types';

// tech é o mesmo que fazer props.tech, só que aí é a desestruturação
// Props example
function Component1(props) {
    return (
        <>
        <h1> Print {props.teste}</h1>
        </>
    );
}

/**
 * Um outro jeito de fazer o props é:
 * function Component1({ teste }) {
    return (
        <>
        <h1> Print {teste}</h1>
        </>
    );
}

 */

export default Component1;