"use client"; 

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wind , Droplets } from "lucide-react";


interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: JSX.Element;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const updateWeather = (data: any) => {
    if (data.cod === "404") {
      return alert("Please Enter Valid Location");
    }
    setWeatherData({
      temperature: Math.round(data.main.temp - 273.15),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: getWeatherIcon(data.weather[0].main),
    });
  };

  const getWeatherIcon = (weatherMain: string): JSX.Element => {
    switch (weatherMain) {
      case "Clouds":
        return <img src="./cloud.png" className="h-20"></img>;
      case "Smoke":
        return <img src="./smoke.png" className="h-20"></img>; 
      case "Rain":
        return <img src="./rain.png" className="h-20"></img>; 
      case "Clear":
        return <img src="./clear-sky.png" className="h-20"></img>;
      case "Snow":
        return <img src="./snowy.png" className="h-20"></img>; 
      default:
        return <img src="./cloud.png" className="h-20"></img>;
    }
  };

  const checkWeather = async (city: string) => {
    const api = "42e67330fa199cf3fbba6ad772ba3baf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const response = await fetch(url);
    const data = await response.json();
    updateWeather(data);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      checkWeather(city);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-4 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">Weather App</CardTitle>
        <CardDescription className="text-xl text-gray-600">
          Get real-time weather updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <Input
            type="text"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
            placeholder="Enter city"
            className="w-full text-base"
          />
          <Button type="submit" className="w-full text-base">
            Search
          </Button>
        </form>
        {weatherData && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              {weatherData.icon}
            </div>
            <div className="text-4xl font-bold">
              {weatherData.temperature}
              <sup>°C</sup>
            </div>
            <div className="text-xl">{weatherData.description}</div>
            <div className="text-base text-black flex gap-2">
              <Droplets />
              <p>Humidity: {weatherData.humidity}%</p>
            </div>
            <div className="text-base text-black flex gap-2">
              <Wind />
              <p>Wind Speed: {weatherData.windSpeed} km/h</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherApp;
