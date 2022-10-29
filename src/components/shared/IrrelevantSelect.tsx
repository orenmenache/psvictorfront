import React, { ChangeEventHandler } from 'react';

type SelectProps = {
    name: string;
    label: string;
    onChangeHandler: ChangeEventHandler<HTMLSelectElement>;
    options: string[];
    value: string;
};

function Select({
    name,
    label,
    options,
    value = '',
    onChangeHandler,
}: SelectProps) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChangeHandler}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Select;
