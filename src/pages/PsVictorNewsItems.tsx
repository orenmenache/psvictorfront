import React, { useState, useEffect } from 'react';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { SetNewsItems } from '../components/forms/setNewsItems';
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
                setIsGettingNewsItems(false);
            };
            getNewsItems();
        }
    }, [isGettingNewsItems]);

    // Send to PS
    useEffect(() => {
        if (isSendingToPS) {
            console.log(`Sending to PS`);
        }
        setIsSendingToPS(false);
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
