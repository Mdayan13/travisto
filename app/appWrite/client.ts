import {Client, Databases, Account, Storage} from "appwrite"
export const appwriteConfig = {
     endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
     proojectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
     databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
     apikey: import.meta.env.VITE_APPWRITE_API_KEY,
     userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
     tripsCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID
}

const client = new Client().setEndpoint(appwriteConfig.endpointUrl).setProject(appwriteConfig.proojectId)

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage};