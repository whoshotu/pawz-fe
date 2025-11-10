import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // TODO: Replace with your actual API key
            const searchRadius = 5000; // 5km

            const searches = [
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&type=veterinary_care&key=${apiKey}`,
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&type=pet_store&key=${apiKey}`,
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${searchRadius}&keyword=pet%20grooming&key=${apiKey}`,
            ];

            const responses = await Promise.all(searches.map(url => axios.get(url)));
            const places = responses.flatMap(res => res.data.results);

            const placeDetailsPromises = places.map(place =>
              axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,place_id&key=${apiKey}`)
            );

            const placeDetailsResponses = await Promise.all(placeDetailsPromises);
            const detailedPlaces = placeDetailsResponses.map(res => res.data.result);

            // Remove duplicates based on place_id
            const uniquePlaces = Array.from(new Map(detailedPlaces.map(place => [place.place_id, {
              ...place,
              address: place.formatted_address,
              phone_number: place.formatted_phone_number,
            }])).values());


            setServices(uniquePlaces);
            setError(null);
          } catch (err) {
            console.error(err);
            setError('Could not fetch services. Please check your API key and try again later.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError('Geolocation is not enabled. Please enable it in your browser settings.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  return (
    <ServiceContext.Provider value={{ services, loading, error, fetchServices }}>
      {children}
    </ServiceContext.Provider>
  );
};
