import { Query } from "appwrite"
import { database, appwriteConfig } from "./client"

export const getAllTrips = async (limit: number, offset: number) => {
     const Alltrips = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tripsCollectionId,
          [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
     )

     if(Alltrips.total == 0){
          console.log("No Trips Found")
          return {
               allTrips: [], total: 0
          }

     }
     return {
          allTrips: Alltrips.documents,
          total: Alltrips.total
     }
}

export const getTripById  =async (Id: string) => {
     const Trip = await database.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.tripsCollectionId,
          Id,
     )

     if(!Trip.$id){
          console.log("TripNot Found");
          return null
     }
     return Trip
}