const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
const API_KEY = process.env.VUE_APP_API_KEY;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let api = window.gapi;

export const handleClientLoad = () => {
    api.load('client:auth2', initClient);
};

const initClient = () => {
    api.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    });
};