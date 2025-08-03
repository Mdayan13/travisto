import {Client, Databases, Account, Storage} from "appwrite"
export const appwriteConfig = {
     endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
     projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
     databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
     apikey: import.meta.env.VITE_APPWRITE_API_KEY,
     userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
     tripsCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID
}

const client = new Client().setEndpoint(appwriteConfig.endpointUrl).setProject(appwriteConfig.projectId)
const session = req.cookies['a_session_<PROJECT_ID>']; // Get the session cookie from the request
if (session) {
    client.setSession(session);
}
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
export { ID } from 'appwrite';
export { client, account, database, storage };