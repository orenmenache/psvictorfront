import React, { useState, useEffect } from 'react';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { SetNewsItems } from '../components/forms/setNewsItems';
import { NewsItemFormError } from '../types';

function SendNewsItemToPS() {
    const BASE_ROUTE = `http://localhost:5015/api/psVictor/`;

    const ROUTES = {
        editionMeta: `${BASE_ROUTE}editionMeta`,
        langSchemes: `${BASE_ROUTE}langScheme`,
        bluePrint: `${BASE_ROUTE}bluePrint`,
        autoItemPicker: `${BASE_ROUTE}autoItemPicker`,
        sendToPS: `${BASE_ROUTE}sendToPS`,
    };

    //console.log(`SetPricePage loading`);
    const [errors, setErrors] = useState({} as NewsItemFormError);
    const [langSchemeNames, setLangSchemeNames] = useState([] as string[]);
    const [editionsInitData, setEditionsInitData] = useState(
        [] as { editionName: string; schemeName: string }[]
    );
    //const [editionName, setEditionName] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Get all langScheme names
    useEffect(() => {
        console.log(`Loading langSchemes`);
        const getInitData = async () => {
            const response: Response = await fetch(
                `${ROUTES.langSchemes}/allNames`
            );
            const json = await response.json();

            if ('errorMessage' in json) {
                console.log(json.errorMessage);
                throw json.errorMessage;
            }
            console.log(json);
            setLangSchemeNames(json);
        };
        getInitData();
    }, [ROUTES.langSchemes]);

    // Get editionNames with langScheme names
    useEffect(() => {
        console.log(`Loading editionNames`);
        const getEditionNames = async () => {
            const response: Response = await fetch(
                `${ROUTES.editionMeta}/namesAndLangSchemes`
            );
            const json = await response.json();

            if ('errorMessage' in json) {
                console.log(json.errorMessage);
                throw json.errorMessage;
            }
            console.log(json);
            setEditionsInitData(json);
            setIsLoading(false);
        };
        getEditionNames();
    }, [ROUTES.editionMeta]);

    // Load newsItems
    // useEffect(() => {
    //     //console.log(`Loading newsItems`);
    //     const getNewsItems = async () => {
    //         const response: Response = await fetch(
    //             `${ROUTES.editionMeta}/${editionName}`
    //         );
    //         const json = (await response.json()) as
    //             | { errorMessage: string }
    //             | {
    //                   editionsInitData: {
    //                       editionName: string;
    //                       schemeName: string;
    //                   }[];
    //               };

    //         if ('errorMessage' in json) {
    //             console.log(json.errorMessage);
    //             throw json.errorMessage;
    //         }
    //         setEditionsInitData(json.editionsInitData);
    //     };
    //     getNewsItems();
    // }, [newsItem]);

    // send data
    // useEffect(() => {
    //     if (isProcessing) {
    //         const sendData = async () => {
    //             const response: Response = await fetch(
    //                 `${ROUTES.sendToPS}/news`,
    //                 {
    //                     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //                     //mode: 'cors', // no-cors, *cors, same-origin
    //                     //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //                     //credentials: 'same-origin', // include, *same-origin, omit
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         // 'Content-Type': 'application/x-www-form-urlencoded',
    //                     },
    //                     //redirect: 'follow', // manual, *follow, error
    //                     //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //                     body: JSON.stringify(newsItem), // body data type must match "Content-Type" header
    //                 }
    //             );
    //             //console.log(response);
    //             const json = await response.json();
    //             setIsProcessing(false);
    //         };
    //         sendData();
    //     } else {
    //         console.log(`IsProcessing is false`);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isProcessing]);

    const onClickHandler = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        console.log(`Setting processing to true`);
        //console.log(formData);
    };

    return (
        <div className="genericContainer">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <SetNewsItems
                        langSchemeNames={langSchemeNames}
                        editionsInitData={editionsInitData}
                        onClickHandler={onClickHandler}
                        errors={errors}
                        setErrors={setErrors}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                    ></SetNewsItems>
                    <ErrorTerminal errors={errors} />
                </>
            )}
        </div>
    );
}

export default SendNewsItemToPS;
