import { useContext, useEffect, useState } from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { FormInputKeys } from '../../types';

/**
 *
 */

type ButtonProps = {
    name: FormInputKeys;
    label: string;
    fetchUrl: string;
    setData: React.Dispatch<React.SetStateAction<any>>;
};

export const ButtonFetch = ({
    name,
    label,
    fetchUrl,
    setData,
}: ButtonProps) => {
    const { errors, setErrors } = useContext(GenericContext);

    const [isClicked, setIsClicked] = useState(false);

    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsClicked(true);
        console.log(`setClicked ${name} to true`);
    };

    useEffect(() => {
        try {
            if (isClicked) {
                console.log(`Loading Data`);
                console.log(`fetchUrl: ${fetchUrl}`);
                const getData = async () => {
                    const response: Response = await fetch(fetchUrl);
                    const json = await response.json();

                    if ('errorMessage' in json) {
                        console.log(json.errorMessage);
                        throw json.errorMessage;
                    }

                    console.log(`Setting data in Button Fetch`);
                    console.log(json);
                    setData(json);
                    setIsClicked(false);
                };
                getData();
            }
        } catch (e) {
            let newErrors = { ...errors };
            newErrors[name] = e;
            setErrors(() => newErrors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClicked]);

    return (
        <>
            {isClicked ? (
                <button disabled>Loading...</button>
            ) : (
                <button onClick={onClickHandler}>{label}</button>
            )}
        </>
    );
};
