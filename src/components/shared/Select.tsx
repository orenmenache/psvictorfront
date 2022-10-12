import React, { ChangeEventHandler } from 'react';

type SelectProps = {
    name: string;
    id: string;
    onChangeHandler: ChangeEventHandler<HTMLSelectElement>;
    options: string[];
    value: string;
};

function Select({
    name,
    id,
    options,
    value = '',
    onChangeHandler,
}: SelectProps) {
    return (
        <select name={name} id={id} value={value} onChange={onChangeHandler}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Select;
