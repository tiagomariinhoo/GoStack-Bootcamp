import React from 'react';
import PropTypes from 'prop-types';

// tech é o mesmo que fazer props.tech, só que aí é a desestruturação
function TechItem({ tech, onDelete }) {
    return (
        <li key={tech}>
            {tech}
            <button onClick={onDelete} type="button"> Remover</button>
        </li>
    );
}
/**
 * Valores default para o props caso não passe nada
 */
TechItem.defaultProps = {
    tech: 'Oculto',
};

TechItem.propTypes = {
    tech: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};

export default TechItem;