export const POST = async (
    postUrl: string,
    stringifiedData: string,
    setResponse: React.Dispatch<React.SetStateAction<any>>
) => {
    const response: Response = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: stringifiedData, // body data type must match "Content-Type" header
    });
    console.log('response');
    const json = await response.json();
    console.warn('RESPONSE');
    console.log(json);
    setResponse(json);
};
