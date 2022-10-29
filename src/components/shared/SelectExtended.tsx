import React /*, { useContext }*/ from 'react';
import { FormInputKeys } from '../../types';
//import { GenericContext } from '../../contexts/GenericContext';

type SelectProps = {
    name: FormInputKeys;
    label: string;
    options: string[];
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export const SelectExtended = ({
    name,
    label,
    options,
    formData,
    setFormData,
}: SelectProps) => {
    //const { errors, setErrors } = useContext(GenericContext);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`Value changed to ${e.target.value}`);
        let newFormData = { ...formData };
        newFormData[name] = e.target.value;
        setFormData(newFormData);
    };

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={formData[name] || ''}
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
};
