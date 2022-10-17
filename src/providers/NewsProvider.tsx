import { ReactNode, useState } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import { EditionItem, NewsItemFormError } from '../types';

type NewsProviderProps = {
    children: ReactNode;
};

const NewsProvider = ({ children }: NewsProviderProps) => {
    const SmartServerRoute = `http://localhost:5016/api/psVictor/`;

    const ROUTES = {
        editionMeta: `${SmartServerRoute}editionMeta`,
        langSchemes: `${SmartServerRoute}langScheme`,
        bluePrint: `${SmartServerRoute}bluePrint`,
        autoItemPicker: `${SmartServerRoute}autoItemPicker`,
        singleItem: `${SmartServerRoute}singleItem`,
        itemCluster: `${SmartServerRoute}itemCluster`,
        files: `${SmartServerRoute}files`,
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

    const [backgroundNames, setBackgroundNames] = useState([] as string[]);
    const [selectedBackground, setSelectedBackground] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isGettingNewsItems, setIsGettingNewsItems] = useState(false);
    const [isSendingToPS, setIsSendingToPS] = useState(false);
    const [newsItemsLoaded, setNewsItemsLoaded] = useState(false);

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

    return (
        <NewsContext.Provider
            value={{
                ROUTES,
                errors,
                setErrors,
                langSchemeNames,
                setLangSchemeNames,
                editionsInitData,
                setEditionsInitData,
                newsItems,
                setNewsItems,
                newsItem,
                setNewsItem,
                selectedEditionName,
                setSelectedEditionName,
                backgroundNames,
                setBackgroundNames,
                selectedBackground,
                setSelectedBackground,
                isLoading,
                setIsLoading,
                isGettingNewsItems,
                setIsGettingNewsItems,
                isSendingToPS,
                setIsSendingToPS,
                newsItemsLoaded,
                setNewsItemsLoaded,
                onLoadNewsItemsClick,
                onSendToPSClick,
            }}
        >
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;
