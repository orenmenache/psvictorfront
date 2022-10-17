import { ReactNode, useState } from 'react';
import { GenericContext } from '../contexts/GenericContext';
import { EditionItem, ItemFormError } from '../types';

type GenericProviderProps = {
    children: ReactNode;
};

const GenericProvider = ({ children }: GenericProviderProps) => {
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

    const [errors, setErrors] = useState({} as ItemFormError);
    const [langSchemeNames, setLangSchemeNames] = useState([] as string[]);
    const [editionsInitData, setEditionsInitData] = useState(
        [] as { editionName: string; schemeName: string }[]
    );
    const [newsItems, setNewsItems] = useState([] as EditionItem[]);
    const [newsItem, setNewsItem] = useState({} as EditionItem);
    const [techItems, setTechItems] = useState([] as EditionItem[]);
    const [techItem, setTechItem] = useState({} as EditionItem);
    const [selectedEditionName, setSelectedEditionName] = useState('IMMFX EN');
    const [date, setDate] = useState('');

    const [backgroundNames, setBackgroundNames] = useState([] as string[]);
    const [selectedBackground, setSelectedBackground] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isGettingNewsItems, setIsGettingNewsItems] = useState(false);
    const [isGettingTechItems, setIsGettingTechItems] = useState(false);
    const [isSendingToPS, setIsSendingToPS] = useState(false);
    const [newsItemsLoaded, setNewsItemsLoaded] = useState(false);
    const [newsItemLoaded, setNewsItemLoaded] = useState(false);
    const [techItemLoaded, setTechItemLoaded] = useState(false);

    const onLoadNewsItemsClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsGettingNewsItems(true);
        console.log(`setIsGettingNewsItems to true`);
    };

    const onLoadTechItemsClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsGettingTechItems(true);
        console.log(`setIsGettingTechItems to true`);
    };

    const onSendToPSClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSendingToPS(true);
        console.log(`setIsSendingToPS to true`);
    };

    return (
        <GenericContext.Provider
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
                techItems,
                setTechItems,
                techItem,
                setTechItem,
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
                isGettingTechItems,
                setIsGettingTechItems,
                isSendingToPS,
                setIsSendingToPS,
                newsItemsLoaded,
                setNewsItemsLoaded,
                techItemLoaded,
                setTechItemLoaded,
                onLoadNewsItemsClick,
                onLoadTechItemsClick,
                onSendToPSClick,
                date,
                setDate,
            }}
        >
            {children}
        </GenericContext.Provider>
    );
};

export default GenericProvider;
