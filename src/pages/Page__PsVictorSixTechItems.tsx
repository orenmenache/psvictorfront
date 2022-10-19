import React, { useContext, useEffect } from 'react';
import { GenericContext } from '../contexts/GenericContext';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { LangSheet } from '../types';
import { FormSetSixTechItems } from '../components/forms/Form__setSixTechItems';

function PagePsVictorTechItem() {
    const {
        ROUTES,
        errors,
        setTechItems, // Item Specific
        techItems,
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
                const editionDate = langSheet.date;

                setTechItems(techItems);
                setDate(editionDate);
                setIsGettingTechItems(false);
            };
            getTechItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGettingTechItems]);

    // Send six TECH items to PS
    useEffect(() => {
        if (isSendingToPS) {
            console.log(`Sending to PS`);
            const sendData = async () => {
                const response: Response = await fetch(
                    `${ROUTES.itemCluster}/techSix`,
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
                            techItems,
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
                    <FormSetSixTechItems />
                    <ErrorTerminal errors={errors} />
                </>
            )}
        </div>
    );
}

export default PagePsVictorTechItem;
