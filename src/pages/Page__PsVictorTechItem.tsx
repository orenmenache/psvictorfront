import React, { useContext, useEffect } from 'react';
import { GenericContext } from '../contexts/GenericContext';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { LangSheet } from '../types';
import { FormSetTechItems } from '../components/forms/Form__setTechItems';

function PagePsVictorTechItem() {
    const {
        ROUTES,
        errors,
        setLangSchemeNames,
        setEditionsInitData,
        setTechItems, // Item Specific
        techItem, // Item Specific
        setTechItem, // Item Specific
        selectedEditionName,
        setBackgroundNames,
        selectedBackground,
        isLoading,
        setIsLoading,
        isGettingTechItems, // Item Specific
        setIsGettingTechItems, // Item Specific
        isSendingToPS,
        setIsSendingToPS,
        date,
        setDate,
    } = useContext(GenericContext);

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
    }, [ROUTES.langSchemes, setLangSchemeNames]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ROUTES.editionMeta]);

    // Get all background names
    useEffect(() => {
        console.log(`Loading backgrounds`);
        const getInitData = async () => {
            const response: Response = await fetch(
                `${ROUTES.files}/backgrounds`
            );
            const json = await response.json();

            if ('errorMessage' in json) {
                console.log(json.errorMessage);
                throw json.errorMessage;
            }
            console.log(json);
            setBackgroundNames(json);
        };
        getInitData();
    }, [ROUTES.files, setBackgroundNames]);

    // Load tech items
    useEffect(() => {
        if (isGettingTechItems) {
            console.log(`Loading tech items`);
            const getTechItems = async () => {
                const response: Response = await fetch(
                    `${ROUTES.editionMeta}/${selectedEditionName}`
                );
                const json = await response.json();

                if ('errorMessage' in json) {
                    console.log(json.errorMessage);
                    throw json.errorMessage;
                }

                const langSheet = json as LangSheet;
                const techItems = langSheet.data.techItems;
                for (let i in techItems) {
                    let techItemRaw = techItems[i];
                    for (let n in techItemRaw.data) {
                        console.log(`n ${n} ${techItemRaw.data[n]}`);
                    }

                    //techItemRaw['support'] = techItemRaw['l2'];
                    //techItemRaw['resistance'] = techItemRaw['s2'];
                }
                const editionDate = langSheet.date;

                setTechItems(techItems);
                setTechItem(techItems[0]);
                setDate(editionDate);
                setIsGettingTechItems(false);
            };
            getTechItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGettingTechItems]);

    // Send to PS
    useEffect(() => {
        if (isSendingToPS) {
            console.log(`Sending to PS`);
            const sendData = async () => {
                const response: Response = await fetch(
                    `${ROUTES.singleItem}/tech`,
                    {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        //mode: 'cors', // no-cors, *cors, same-origin
                        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        //credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        //redirect: 'follow', // manual, *follow, error
                        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({
                            backgroundFilePath: selectedBackground,
                            projName: selectedEditionName,
                            date,
                            ...techItem.data,
                        }), // body data type must match "Content-Type" header
                    }
                );
                console.log('response');
                const json = await response.json();
                console.log(json);
                setIsSendingToPS(false);
            };
            sendData();
        }
    }, [isSendingToPS]);

    return (
        <div className="genericContainer">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <FormSetTechItems />
                    <ErrorTerminal errors={errors} />
                </>
            )}
        </div>
    );
}

export default PagePsVictorTechItem;
