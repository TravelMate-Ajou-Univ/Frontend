"use client";

import { useLoadScript, GoogleMap } from "@react-google-maps/api";

import { useMemo } from "react";

import SeasonButton from "./ui/SeasonButton";
import MapMenuButton from "./ui/MapMenuButton";
import Marker from "./Marker";
import { Bookmark } from "@/model/bookmark";

export default function Map() {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: 37.57979553563185, lng: 126.97706245552443 }),
    []
  );

  const test_bookmark: Bookmark[] = [
    {
      lat: 37.57979553563185,
      lng: 126.97706245552443
    },
    {
      lat: 37,
      lng: 126
    },
    {
      lat: 38,
      lng: 127
    }
  ];

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative w-full h-full bg-slate-400 z-0">
      <MapMenuButton />
      <SeasonButton />
      <GoogleMap
        options={mapOptions}
        zoom={8}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={() => console.log("Map Component Loaded...")}
      >
        <Marker bookmarks={test_bookmark} />
      </GoogleMap>
    </div>
  );
}
