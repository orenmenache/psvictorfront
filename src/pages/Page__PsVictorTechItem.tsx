import React, { useContext, useEffect } from 'react';
import { GenericContext } from '../contexts/GenericContext';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { LangSheet } from '../types';
import { FormSetTechItems } from '../components/forms/Form__setTechItems';

function PagePsVictorTechItem() {
    const {
        ROUTES,
        errors,
        setTechItems, // Item Specific
        techItem, // Item Specific
        setTechItem, // Item Specific
        selectedEditionName,
        selectedBackground,
        isLoading,
        isGettingTechItems, // Item Specific
        setIsGettingTechItems, // Item Specific
        isSendingToPS,
        setIsSendingToPS,
        date,
        setDate,
    } = useContext(GenericContext);

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
                // for (let i in techItems) {
                //     let techItemRaw = techItems[i];
                //     for (let n in techItemRaw.data) {
                //         console.log(`n ${n} ${techItemRaw.data[n]}`);
                //     }

                //     //techItemRaw['support'] = techItemRaw['l2'];
                //     //techItemRaw['resistance'] = techItemRaw['s2'];
                // }
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

    // Send single TECH item to PS
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
