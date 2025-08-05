import { data, type ActionFunctionArgs } from "react-router";
import { GoogleGenAI } from "@google/genai";
import { parseMarkdownToJson} from "~/lib/utils";
import { appwriteConfig, database } from "~/appWrite/client";
import {ID} from "appwrite";

export const action = async({request}: ActionFunctionArgs) => {
     const {
          country,
          numberOfDays,
          travelStyle,
          interests,
          budget,
          groupType,
          userId
     } = await request.json()

     const genAI = new GoogleGenAI({apiKey: process.env.VITE_GEMINI_API_KEY});
     const unSplashApiKey = process.env.VITE_UNSPLASH_ACCESS_KEY!;
     try{
     const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
          Budget: '${budget}'
          Interests: '${interests}'
          TravelStyle: '${travelStyle}'
          GroupType: '${groupType}'
          Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
          {
          "name": "A descriptive title for the trip",
          "description": "A brief description of the trip and its highlights not exceeding 100 words",
          "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
          "duration": ${numberOfDays},
          "budget": "${budget}",
          "travelStyle": "${travelStyle}",
          "country": "${country}",
          "interests": ${interests},
          "groupType": "${groupType}",
          "bestTimeToVisit": [
            '🌸 Season (from month to month): reason to visit',
            '☀️ Season (from month to month): reason to visit',
            '🍁 Season (from month to month): reason to visit',
            '❄️ Season (from month to month): reason to visit'
          ],
          "weatherInfo": [
            '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
          ],
          "location": {
            "city": "name of the city or region",
            "coordinates": [latitude, longitude],
            "openStreetMap": "link to open street map"
          },
          "itinerary": [
          {
            "day": 1,
            "location": "City/Region Name",
            "activities": [
              {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
              {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
              {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
            ]
          },
          ...
          ]

                const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents: "Explain how AI works in a few words",
          });`;
     const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash",
          contents:prompt
          });
          console.log(response.text);
          const trip = parseMarkdownToJson(response.text!);
          const searchQuery = `${country} ${interests} ${travelStyle}`;
          const encodedQuery = encodeURIComponent(searchQuery);

          const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodedQuery}&client_id=EHT3h-WEPE9tqFTsPGpwlIZxUk_MkuTuAv1bHUaJMo0`);

          const result = await imageResponse.json();
          const imageUrls =result.results.slice(0,3).map((result: any) => result.urls?.regular || null);
          
          const dataresult = await database.createDocument(
               appwriteConfig.databaseId,
               appwriteConfig.tripsCollectionId,
               ID.unique(),
               {
                    tripDetail: JSON.stringify(trip),
                    createdAt: new Date().toISOString(),
                    userId,
                    imageUri: imageUrls,
               }
          )

          return data({id:dataresult.$id})
     }catch(error){
          console.log("hte error is because of fucking",error)
     }
}
