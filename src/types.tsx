export type BlueKey = 'indiItems' | 'newsItems' | 'techItems';

export type EditionItem = {
    data: { [key: string]: string };
    type: BlueKey;
};

export type EditionInitData = {
    editionName: string;
    schemeName: string;
};

export type ItemFormError = { [key: string]: string };

export type LangSheet = {
    data: { [key in BlueKey]: EditionItem[] };
    date: string;
};
