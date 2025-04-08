const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.API_KEY;
    const url = 'https://api.api-ninjas.com/v1/worldtime?timezone=America/Los_Angeles';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Failed to fetch data' }),
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
  } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
