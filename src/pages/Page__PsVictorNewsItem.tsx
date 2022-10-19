import { useContext, useEffect } from 'react';
import { GenericContext } from '../contexts/GenericContext';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { FormSetNewsItems } from '../components/forms/Form__setNewsItems';
import { LangSheet } from '../types';

function PagePsVictorNewsItem() {
    const {
        ROUTES,
        errors,
        //setErrors,
        setNewsItems,
        newsItem,
        setNewsItem,
        selectedEditionName,
        selectedBackground,
        isLoading,
        isGettingNewsItems,
        setIsGettingNewsItems,
        isSendingToPS,
        setIsSendingToPS,
        date,
        setDate,
    } = useContext(GenericContext);

    /**
     * Page specific functions
     */

    // Load news items
    useEffect(() => {
        if (isGettingNewsItems) {
            console.log(`Loading news items`);
            const getNewsItems = async () => {
                const response: Response = await fetch(
                    `${ROUTES.editionMeta}/${selectedEditionName}`
                );
                const json = await response.json();

                if ('errorMessage' in json) {
                    console.log(json.errorMessage);
                    throw json.errorMessage;
                }

                const langSheet = json as LangSheet;
                const newsItems = langSheet.data.newsItems;
                const editionDate = langSheet.date;

                setNewsItems(newsItems);
                setNewsItem(newsItems[0]);
                setDate(editionDate);
                setIsGettingNewsItems(false);
            };
            getNewsItems();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGettingNewsItems]);

    // Send single NEWS item to PS
    useEffect(() => {
        if (isSendingToPS) {
            console.log(`Sending to PS`);
            const sendData = async () => {
                delete newsItem.data.mark;
                const response: Response = await fetch(
                    `${ROUTES.singleItem}/news`,
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
                            ...newsItem.data,
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
                    <FormSetNewsItems />
                    <ErrorTerminal errors={errors} />
                </>
            )}
        </div>
    );
}

export default PagePsVictorNewsItem;
