import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { FormSetNewsItems } from '../components/forms/Form__setNewsItems';
import { EditionItem, NewsItemFormError } from '../types';

function PagePsVictorNewsItem() {
    const {
        ROUTES,
        errors,
        //setErrors,
        //langSchemeNames,
        setLangSchemeNames,
        //editionsInitData,
        setEditionsInitData,
        //newsItems,
        setNewsItems,
        newsItem,
        setNewsItem,
        selectedEditionName,
        //setSelectedEditionName,
        //backgroundNames,
        setBackgroundNames,
        selectedBackground,
        //setSelectedBackground,
        isLoading,
        setIsLoading,
        isGettingNewsItems,
        setIsGettingNewsItems,
        isSendingToPS,
        setIsSendingToPS,
        // newsItemsLoaded,
        // setNewsItemsLoaded,
        // onLoadNewsItemsClick,
        // onSendToPSClick,
    } = useContext(NewsContext);

    // const SmartServerRoute = `http://localhost:5016/api/psVictor/`;

    // const ROUTES = {
    //     editionMeta: `${SmartServerRoute}editionMeta`,
    //     langSchemes: `${SmartServerRoute}langScheme`,
    //     bluePrint: `${SmartServerRoute}bluePrint`,
    //     autoItemPicker: `${SmartServerRoute}autoItemPicker`,
    //     singleItem: `${SmartServerRoute}singleItem`,
    //     itemCluster: `${SmartServerRoute}itemCluster`,
    //     files: `${SmartServerRoute}files`,
    // };

    // //console.log(`SetPricePage loading`);
    // const [errors, setErrors] = useState({} as NewsItemFormError);
    // const [langSchemeNames, setLangSchemeNames] = useState([] as string[]);
    // const [editionsInitData, setEditionsInitData] = useState(
    //     [] as { editionName: string; schemeName: string }[]
    // );
    // const [newsItems, setNewsItems] = useState([] as EditionItem[]);
    // const [newsItem, setNewsItem] = useState({} as EditionItem);
    // const [selectedEditionName, setSelectedEditionName] = useState('IMMFX EN');

    // const [backgroundNames, setBackgroundNames] = useState([] as string[]);
    // const [selectedBackground, setSelectedBackground] = useState('');

    // const [isLoading, setIsLoading] = useState(true);
    // const [isGettingNewsItems, setIsGettingNewsItems] = useState(false);
    // const [isSendingToPS, setIsSendingToPS] = useState(false);
    // const [newsItemsLoaded, setNewsItemsLoaded] = useState(false);

    // const onLoadNewsItemsClick = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     setIsGettingNewsItems(true);
    //     console.log(`setIsGettingNewsItems to true`);
    // };

    // const onSendToPSClick = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     setIsSendingToPS(true);
    //     console.log(`setIsSendingToPS to true`);
    // };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGettingNewsItems]);

    // Send to PS
    useEffect(() => {
        if (isSendingToPS) {
            console.log(`Sending to PS`);
            const sendData = async () => {
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
                    <FormSetNewsItems
                    // langSchemeNames={langSchemeNames}
                    // editionsInitData={editionsInitData}
                    // onLoadNewsItemsClick={onLoadNewsItemsClick}
                    // onSendToPSClick={onSendToPSClick}
                    // errors={errors}
                    // setErrors={setErrors}
                    // selectedEditionName={selectedEditionName}
                    // setSelectedEditionName={setSelectedEditionName}
                    // backgroundNames={backgroundNames}
                    // setBackgroundNames={setBackgroundNames}
                    // selectedBackground={selectedBackground}
                    // setSelectedBackground={setSelectedBackground}
                    // isGettingNewsItems={isGettingNewsItems}
                    // setIsGettingNewsItems={setIsGettingNewsItems}
                    // newsItems={newsItems}
                    // newsItem={newsItem}
                    // setNewsItem={setNewsItem}
                    // isSendingToPS={isSendingToPS}
                    // setIsSendingToPS={setIsSendingToPS}
                    ></FormSetNewsItems>
                    <ErrorTerminal errors={errors} />
                </>
            )}
        </div>
    );
}

export default PagePsVictorNewsItem;
