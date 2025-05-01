import { useEffect, useState } from "react";
import { Coordinates } from "../api/types";

interface GeoLocationState{
    coordinates: Coordinates | null,
    error: string | null,
    isLoading: boolean
}

export function useGeoLocation(){
    const [locationData, setLocationData]=useState<GeoLocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    })
    const getLocation=()=>{
        setLocationData((prev)=> ({...prev, isLoading: true, error: null}));

        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Geolocation not enabled in your browser.",
                isLoading: false
            })
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        }, (error)=>{
            let errorMessage: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage="Location permission denied, please enable!";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage="Location information not found!";
                    break;
                case error.TIMEOUT:
                    errorMessage="Server timeout, please try again!";
                    break;
                
                default:
                    errorMessage="Something went wrong.";
                    break;
            }
            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false
            })
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
    };

    useEffect(()=>{
        getLocation()
    }, [])

    return{
        ...locationData,
        getLocation
    }
}