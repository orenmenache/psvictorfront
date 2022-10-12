import React, { useEffect, useState } from 'react';
import { EditionInitData, EditionItem, NewsItemFormError } from '../../types';
import Select from '../shared/Select';
import styles from './setNewsItems.module.scss';

type NewsItemsProps = {
    langSchemeNames: string[];
    editionsInitData: EditionInitData[];
    onClickHandler: React.MouseEventHandler;
    errors: NewsItemFormError;
    setErrors: React.Dispatch<React.SetStateAction<NewsItemFormError>>;
    isProcessing: boolean;
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
};

function SetNewsItems({
    langSchemeNames,
    editionsInitData,
    onClickHandler,
    errors,
    setErrors,
    isProcessing,
    setIsProcessing,
}: NewsItemsProps) {
    //console.log(`SetNewsItems loading`);

    // // define yesterday for default in datePicker
    // const getYesterday = () => {
    //     const t = new Date();
    //     t.setDate(t.getDate() - 1);
    //     let m = (t.getMonth() + 1).toString();
    //     let d = t.getDate().toString();
    //     m = m.length === 1 ? `0${m}` : m;
    //     d = d.length === 1 ? `0${d}` : d;
    //     const yesterday = `${t.getFullYear()}-${m}-${d}`;
    //     return yesterday;
    // };

    // // define regex for testing numerical values
    // //https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers
    // const isNumber: RegExp = /^\d+\.?\d*$/;

    const [schemeName, setSchemeName] = useState('ENM-1');
    const [editionName, setEditionName] = useState('');
    const [editionList, setEditionList] = useState([] as string[]);

    // const onBlurValidate__GEN = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value as string;
    //     const elementName = e.target.name as keyof FormPriceErrorObj;
    //     const check: boolean = isNumber.test(value);

    //     if (!check) {
    //         const error = `${elementName} value is not numeric.`;
    //         let newErrors = { ...errors };
    //         newErrors[elementName] = error;
    //         setErrors(newErrors);
    //         console.log(newErrors);
    //     } else {
    //         let newErrors: FormPriceErrorObj = { ...errors };
    //         delete newErrors[elementName];
    //         setErrors(newErrors);
    //         let formDataKey = elementName.slice(0, 1);
    //         console.log(`formDataKey: ${formDataKey}`);
    //         let newFormData: PriceData__DBRecord = { ...formData };
    //         //@ts-ignore
    //         newFormData[formDataKey] = value;
    //         setFormData(newFormData);
    //     }
    // };

    const onSelectEditionName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditionName(() => e.target.value as string);
    };

    const onSelectSchemeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSchemeName(() => e.target.value as string);
        console.log(`OnSelectScheme`);
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
    }, [schemeName]);

    return (
        <div className={styles.setNewsItemMainContainer}>
            <h1 className={styles.title}>Set News Item</h1>
            <form autoComplete="off">
                <div className={styles.responsiveContainer}>
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

                <div className={styles.responsiveContainer}>
                    <div className={styles.responsiveRow}>
                        <button onClick={onClickHandler}>Submit</button>
                    </div>
                    {/* <div className={styles.responsiveRow}>
                        <button onClick={onClickHandler}>Submit</button>
                    </div> */}
                </div>

                {/* <input type="submit" value="Submit" /> */}
            </form>
        </div>
    );
}

export { SetNewsItems };
