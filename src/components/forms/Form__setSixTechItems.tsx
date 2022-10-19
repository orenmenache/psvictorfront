import React, { useContext, useEffect, useState } from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { EditionInitData, EditionItem } from '../../types';
import Select from '../shared/Select';
import styles from './Form__setTechItems.module.scss';

function FormSetSixTechItems() {
    const {
        langSchemeNames,
        editionsInitData,
        techItems, // Item Specific
        techItem, // Item Specific
        setTechItem, // Item Specific
        setSelectedEditionName,
        backgroundNames,
        selectedBackground,
        setSelectedBackground,
        isGettingTechItems, // Item Specific
        isSendingToPS,
        onLoadTechItemsClick, // Item Specific
        onSendToPSClick,
    } = useContext(GenericContext);

    const [schemeName, setSchemeName] = useState('ENM-1');
    const [editionName, setEditionName] = useState('');
    const [editionList, setEditionList] = useState([] as string[]);

    const onSelectEditionName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditionName(() => e.target.value as string);
        setSelectedEditionName(e.target.value as string);
    };

    const onSelectSchemeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSchemeName(() => e.target.value as string);
        console.log(`OnSelectScheme`);
    };

    const onSelectTechItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let filtered: EditionItem[] = techItems.filter((item: EditionItem) => {
            return item.data.assetName === e.target.value;
        });
        setTechItem(filtered[0]);
    };

    const onSelectBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBackground(e.target.value);
    };

    // set editionNames by schemeName
    useEffect(() => {
        console.log(`onChangeSchemeName: ${schemeName}`);
        const filterEditions = () => {
            const filteredEditions: EditionInitData[] = editionsInitData.filter(
                (edition: EditionInitData) => {
                    return edition.schemeName === schemeName;
                }
            );
            setEditionList(
                filteredEditions.map((edition) => edition.editionName)
            );
        };
        filterEditions();
    }, [editionsInitData, schemeName]);

    return (
        <div className={styles.setTechItemMainContainer}>
            <h1 className={styles.title}>Set Tech Item</h1>
            <form autoComplete="off">
                <div className={styles.responsiveContainer}>
                    {/* Select Scheme Name */}
                    <div className={styles.responsiveRow}>
                        <label htmlFor="selectSchemeName">
                            Select Language Scheme:
                        </label>
                        <Select
                            name="selectSchemeName"
                            id="selectSchemeName"
                            value={schemeName}
                            onChangeHandler={onSelectSchemeName}
                            options={langSchemeNames}
                        />
                    </div>

                    {/* Select Edition Name */}
                    <div className={styles.responsiveRow}>
                        <label htmlFor="selectEditionName">
                            Select Edition:
                        </label>
                        <Select
                            name="selectEditionName"
                            id="selectEditionName"
                            value={editionName}
                            onChangeHandler={onSelectEditionName}
                            options={editionList}
                        />
                    </div>
                </div>
                {/* Select Background */}
                <div className={styles.responsiveContainerFlexCol}>
                    <div className={styles.fullWidthResponsiveRow}>
                        <div className={styles.fullWidthResponsiveRow}>
                            <label htmlFor="selectBackground">
                                Select Background:
                            </label>
                            <Select
                                name="selectBackground"
                                id="selectBackground"
                                value={selectedBackground}
                                onChangeHandler={onSelectBackground}
                                options={backgroundNames}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.responsiveContainerFlexCol}>
                    {isGettingTechItems ? (
                        <button disabled>Loading...</button>
                    ) : techItems.length > 0 ? (
                        <>
                            {/* Select Tech Item */}
                            <div className={styles.fullWidthResponsiveRow}>
                                <label htmlFor="selectTechItems">
                                    Select Tech Item:
                                </label>
                                <Select
                                    name="selectTechItems"
                                    id="selectTechItems"
                                    value={
                                        techItem && 'data' in techItem
                                            ? techItem.data.assetName
                                            : ''
                                    }
                                    onChangeHandler={onSelectTechItem}
                                    options={techItems.map(
                                        (item: EditionItem) => {
                                            return item.data.assetName;
                                        }
                                    )}
                                />
                            </div>
                            {/* Load Tech Item */}
                            <div className={styles.fullWidthResponsiveRow}>
                                <button onClick={onLoadTechItemsClick}>
                                    Load Tech Items
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.fullWidthResponsiveRow}>
                                <button onClick={onLoadTechItemsClick}>
                                    Load Tech Items
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.responsiveContainerFlexCol}>
                    <div className={styles.fullWidthResponsiveRow}>
                        {isSendingToPS ? (
                            <>
                                <button disabled>Sending...</button>
                            </>
                        ) : (
                            <>
                                <button onClick={onSendToPSClick}>
                                    Send To Photoshop
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export { FormSetSixTechItems };
