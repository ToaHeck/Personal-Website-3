const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.API_NINJAS_KEY;
    //COMMENT OUT FOR TESTING DURING DEV SO TOKENS AREN'T USED UP
    //const url = 'https://api.api-ninjas.com/v1/worldtime?timezone=America/Los_Angeles';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Error response: ${response.status} - ${errorBody}`);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Failed to fetch data: ${errorBody}` }),
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
