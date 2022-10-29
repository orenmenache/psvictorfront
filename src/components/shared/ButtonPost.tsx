import React, { useContext, useEffect } from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { GenericProviderValues } from '../../providers/GenericProvider';
import { FormInputKeys } from '../../types';

/**
 *
 */

// type LoadingData = { [key in FormKeys]: boolean };
// type SFormData = { [key in FormKeys]: string };

type ButtonProps = {
    name: FormInputKeys;
    label: string;
    postUrl: string;
    isClicked: boolean;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
    clickHandler: (e: React.MouseEvent) => any;
    stringifiedData: string;
    setResponse: React.Dispatch<React.SetStateAction<any>>;
};

export const ButtonPost = ({
    name,
    label,
    postUrl,
    isClicked,
    setIsClicked,
    clickHandler,
    stringifiedData,
    setResponse,
}: ButtonProps) => {
    const { errors, setErrors, clearErrorIfExists } = useContext(
        GenericContext
    ) as GenericProviderValues;

    useEffect(() => {
        try {
            if (isClicked) {
                console.log(`ButtonPost Clicked`);
                console.log(`DATA`);
                console.log(stringifiedData);

                const sendData = async () => {
                    const response: Response = await fetch(postUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: stringifiedData, // body data type must match "Content-Type" header
                    });
                    console.log('response');
                    const json = await response.json();
                    console.warn('RESPONSE');
                    console.log(json);
                    setResponse(json);
                };
                sendData();
                clearErrorIfExists(name);
            }
        } catch (e) {
            let newErrors = { ...errors };
            newErrors[name] = `${e}`;
            setErrors(() => newErrors);
        } finally {
            setIsClicked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringifiedData]);

    return (
        <>
            {isClicked ? (
                <button disabled>Loading...</button>
            ) : (
                <button onClick={clickHandler}>{label}</button>
            )}
        </>
    );
};
