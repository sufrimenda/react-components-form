import React from 'react';
import PropTypes from 'prop-types';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import classnames from 'classnames';

const getDateString = (date = new Date()) => {
    const day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();
    if (month < 10) {
        if (month === 0) month += 1;
        month = `0${month}`;
    }
    return `${year}-${month}-${day}`;
};

export const DateField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    validationErrors,
    hasValidationError,
    value,
    label,
    placeholder,
    errorStyles = {},
    fieldAttributes = {},
}) => (
    <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
        {label && <label>{label}</label>}
        <input
            type="date"
            name={name}
            onChange={e => onChange(new Date(e.target.value))}
            value={getDateString(value)}
            placeholder={placeholder}
            className={className}
            {...fieldAttributes}
        />
        {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
    </div>
);

DateField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({}),
    ]),
    hasValidationError: PropTypes.bool,
    value: PropTypes.shape({}),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string,
    }),
    fieldAttributes: PropTypes.shape({}),
};

export default FieldConnect(DateField);
