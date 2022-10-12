import React, { useState, useEffect } from 'react';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { SetNewsItems } from '../components/forms/Form__setNewsItems';
import { EditionItem, NewsItemFormError } from '../types';

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
    const [newsItems, setNewsItems] = useState([] as EditionItem[]);
    const [newsItem, setNewsItem] = useState({} as EditionItem);
    const [selectedEditionName, setSelectedEditionName] = useState('IMMFX EN');

    const [isLoading, setIsLoading] = useState(true);
    const [isGettingNewsItems, setIsGettingNewsItems] = useState(false);
    const [isSendingToPS, setIsSendingToPS] = useState(false);

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

    const onLoadNewsItemsClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsGettingNewsItems(true);
        console.log(`setIsGettingNewsItems to true`);
    };

    const onSendToPSClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSendingToPS(true);
        console.log(`setIsSendingToPS to true`);
    };

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
                console.log(json);
                setNewsItems(json.newsItems);
                setNewsItem(json.newsItems[0]);
                setIsGettingNewsItems(false);
            };
            getNewsItems();
        }
    }, [isGettingNewsItems]);

    // Send to PS
    useEffect(() => {
        if (isSendingToPS) {
            console.log(`Sending to PS`);
            const sendData = async () => {
                const response: Response = await fetch(
                    `${ROUTES.sendToPS}/news`,
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
                        body: JSON.stringify(newsItem), // body data type must match "Content-Type" header
                    }
                );
                //console.log(response);
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
                    <SetNewsItems
                        langSchemeNames={langSchemeNames}
                        editionsInitData={editionsInitData}
                        onLoadNewsItemsClick={onLoadNewsItemsClick}
                        onSendToPSClick={onSendToPSClick}
                        errors={errors}
                        setErrors={setErrors}
                        selectedEditionName={selectedEditionName}
                        setSelectedEditionName={setSelectedEditionName}
                        isGettingNewsItems={isGettingNewsItems}
                        setIsGettingNewsItems={setIsGettingNewsItems}
                        newsItems={newsItems}
                        newsItem={newsItem}
                        setNewsItem={setNewsItem}
                        isSendingToPS={isSendingToPS}
                        setIsSendingToPS={setIsSendingToPS}
                    ></SetNewsItems>
                    <ErrorTerminal errors={errors} />
                </>
            )}
        </div>
    );
}

export default SendNewsItemToPS;
