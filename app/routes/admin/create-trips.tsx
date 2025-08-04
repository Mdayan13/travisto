import { Headers } from "components"
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns"
import type { Route } from './+types/create-trips';
import { comboBoxItems, selectItems } from "~/constants";
import { world_map } from "~/constants/world_map";
import {useNavigate} from "react-router";

import {  cn, formatKey } from "~/lib/utils";
import React, { useState } from "react";
import { LayerDirective, LayersDirective, MapsComponent } from "@syncfusion/ej2-react-maps";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appWrite/client";
export type Country = {
  name: string;
  value: string;
  Coordinates: number[];
  openstreetMap?: string;
};

export const loader = async () => {
try{
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,latlng,maps,flag");
    const data = await response.json();
    if(data) console.log("Countries data fetched successfully");
    return data.map((Country: any) => (
       {
        name:Country.flag + Country.name.common,
        value: Country.name.common,
        Coordinates: Country.latlng,
        openstreetMap: Country.maps?.googleMaps
      }
    ))
  }catch(error){
    console.log("just an error", error)
  }
}

const CreateTrips = ({loaderData}:Route.ComponentProps) => {
  
  const countries = loaderData as Country[];
  const navigate = useNavigate();
  
  const [FormData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    groupType: "",
    duration: 0,
  })
  const [error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({...FormData,[key]: value});
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(
      !FormData.country ||
      !FormData.travelStyle ||
      !FormData.interest || 
      !FormData.budget || 
      !FormData.groupType ||
      !FormData.duration
    ){
      setError("Error: please provide value of all fields");
          setLoading(false);
      return;
    }
    if( FormData.duration < 1 || FormData.duration > 10){
      setError("Error: duration must be between 1 and 10 days");
      setLoading(false);
      return;
    }
    const user = await account.get();
    if(!user.$id){
      setError("Error: you must be logged in to create a trip");
      setLoading(false);
      return;
    }
    console.log(FormData)
    try{
      const response = await fetch("/api/create-trips", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body:JSON.stringify({
          country : FormData.country,
          numberOfDays: FormData.duration,
          travelStyle: FormData.travelStyle,
          interests: FormData.interest,
          budget: FormData.budget,
          groupType: FormData.groupType,
          userId : user.$id
        })
      })
      const result: CreateTripResponse = await response.json();

      if(result?.id) navigate(`/trips/${result.id}`);
      else console.error("FAiled To gnerate Error Trip");
      console.log(response)
    }catch(e){
      console.log("Generating Trip Error", e);
    }finally{
      setLoading(false);
      setError(null);
    }
  }
  const countryData = countries.map((Country)=>({
    text: Country.name,
    value: Country.value,
  }))

  const mapData =[ {
    country: FormData.country,
    color: "EA382E",
    Coordinates: countries.find((c:Country) => c.name === FormData.country)?.Coordinates || []

  }       ]

  return (
    <main className='flex flex-col pb-20 gap-10 wrapper'>
      <Headers title="Add A new Trip" description="View And Edit Travel Plans"/>
        <section className="mt-2.5 wrapper-md">
            <form className="trip-form" onSubmit={handleSubmit}>
                <div>
                  <label className="font-bold text-black" htmlFor="Country">
                    Country
                  </label>
                  <ComboBoxComponent 
                      id="country"
                      dataSource={countryData}
                      className="combo-box"
                      placeholder="Select a country"
                      fields={{ value: "value" }}
                      change={(e:{value: string | undefined}) => {
                        if(e.value){
                          handleChange("country", e.value);

                        }
                      }}
                      allowFiltering
                      filtering={(e) => {
                        const query = e.text.toLowerCase();
                        e.updateData(
                                    countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                        value: country.value
                                    })))
                                )
                      }}
                  />
                     
                </div>
                <div>
                  <label  className="font-bold text-black" htmlFor="duration">Days-For</label>
                  <input 
                    type="number"
                    id="duration"
                    name="duration"
                    placeholder=" *Number of days"
                    className="form-input placeholder:text-gray-100 font-bold"
                    onChange={(e) => handleChange("duration", Number(e.target.value))}
                  />
                </div>
                {selectItems.map((key) => (
                        <div key={key}>
                            <label className="font-bold text-black" htmlFor={key}>{formatKey(key)}</label>

                            <ComboBoxComponent
                                id={key}
                                dataSource={comboBoxItems[key].map((item) => ({
                                    text: item,
                                    value: item,
                                }))}
                                fields={{ text: 'text', value: 'value'}}
                                placeholder={`Select ${formatKey(key)}`}
                                change={(e: { value: string | undefined }) => {
                                    if(e.value) {
                                        handleChange(key, e.value)
                                    }
                                }}
                                allowFiltering
                                filtering={(e) => {
                                    const query = e.text.toLowerCase();

                                    e.updateData(
                                        comboBoxItems[key]
                                            .filter((item) => item.toLowerCase().includes(query))
                                            .map(((item) => ({
                                                text: item,
                                                value: item,
                                            }))))}}
                                className="combo-box font-medium"
                            />
                        </div>
                    ))}

                <div>
                  <label htmlFor="location" className="font-bold text-blue-800">Location On the World Map</label>
                  <MapsComponent>
                    <LayersDirective>
                      <LayerDirective 
                        shapeData={world_map}
                        dataSource={mapData}
                        shapeDataPath="country"
                        shapePropertyPath="name"
                        shapeSettings={{colorValuePath:"color", fill: "#D891EF"}}
                      />
                    </LayersDirective>
                  </MapsComponent>
                </div>
                <div className="h-px bg-amber-900 w-full"/>
                {error && (
                  <div className="error font-semibold font-800">
                    <p>{error}</p>
                  </div>
                )}
                <footer className="px-6 w-full">
                    <ButtonComponent className="!h-12 w-full button-class" type="submit"
                    disabled={Loading}
                  >
                    <img src={`/assets/icons/${Loading ? "loader.svg":"magic-star.svg"}`} className={cn("size-5", { "animate-spin": Loading })}/>
                    <span className="p-16-semibold text-white">{Loading ? "Generating" : "Generate trip"}</span>
                  </ButtonComponent>
                </footer>
            </form>
        </section>
      </main>
  )
}

export default CreateTrips