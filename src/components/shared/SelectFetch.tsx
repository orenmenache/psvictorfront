import { useContext, useEffect, useState } from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { FormInputKeys } from '../../types';

/**
 * A select component where
 * a url for fetching is given
 * and only the relevant key array is stored
 */

type SelectProps = {
    name: FormInputKeys;
    label: string;
    fetchUrl: string;
    mapByKeyName: string | null;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    isLoadingData: any;
    setIsLoadingData: React.Dispatch<React.SetStateAction<any>>;
};

export const SelectFetch = ({
    name,
    label,
    fetchUrl,
    mapByKeyName,
    formData,
    setFormData,
    isLoadingData,
    setIsLoadingData,
}: SelectProps) => {
    const { errors, setErrors } = useContext(GenericContext);

    const [options, setOptions] = useState([] as string[]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`Value changed to ${e.target.value}`);
        let newFormData = { ...formData };
        newFormData[name] = e.target.value;
        setFormData(() => newFormData);
    };

    /**
     * Generic fetch with mapping using given key
     */
    useEffect(() => {
        try {
            console.log(`Loading ${name}`);
            const fetchOptions = async () => {
                const response: Response = await fetch(fetchUrl);
                const json = await response.json();

                if ('errorMessage' in json) {
                    console.log(json.errorMessage);
                    throw json.errorMessage;
                }
                console.log(json);

                let mappedOptions: string[] = [];
                // If the result json is an Object array, map by given key
                if (mapByKeyName) {
                    mappedOptions = json.map(
                        (obj: { [key: string]: string }) => {
                            return obj[mapByKeyName];
                        }
                    );

                    setOptions(mappedOptions);

                    // If it's just a string array then those are the options
                } else {
                    mappedOptions = json;
                    setOptions(mappedOptions);
                }

                let newFormData = { ...formData };
                newFormData[name] = mappedOptions[0];
                setFormData(() => newFormData);

                let newLoadingData = { ...isLoadingData };
                newLoadingData[name] = false;
                setIsLoadingData(newLoadingData);
            };
            fetchOptions();
        } catch (e) {
            let newErrors = { ...errors };
            newErrors[name] = e;
            setErrors(() => newErrors);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={formData[name]}
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
