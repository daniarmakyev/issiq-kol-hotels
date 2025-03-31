"use client";
import { Geo } from "@/helpers/types";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, useState, useEffect } from "react";

interface MapComponentProps {
  lat: number;
  lng: number;
  onPositionChange: (position: Geo) => void;
}

const DEFAULT_POSITION: Geo = {
  longitude: 76.63146082137607,
  latitude: 42.47699365097252,
};

const MapComponent = ({ lat, lng, onPositionChange }: MapComponentProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<Geo>(
    lat && lng ? { latitude: lat, longitude: lng } : DEFAULT_POSITION
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY || "",
  });

  useEffect(() => {
    if (lat && lng) {
      setMarkerPosition({ latitude: lat, longitude: lng });
    } else {
      setMarkerPosition(DEFAULT_POSITION);
    }

    if (map) {
      map.panTo({
        lat: lat || DEFAULT_POSITION.latitude,
        lng: lng || DEFAULT_POSITION.longitude,
      });
    }
  }, [lat, lng, map]);

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const newPos: Geo = {
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
      };

      setMarkerPosition(newPos);
      onPositionChange(newPos);
    },
    [onPositionChange]
  );

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    mapInstance.setCenter({
      lat: DEFAULT_POSITION.latitude,
      lng: DEFAULT_POSITION.longitude,
    });
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div
      className="map-container"
      style={{ height: "400px", width: "100%", margin: "20px 0" }}
    >
      <GoogleMap
        center={{
          lat: markerPosition.latitude,
          lng: markerPosition.longitude,
        }}
        zoom={10}
        onClick={onMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker
          position={{
            lat: markerPosition.latitude,
            lng: markerPosition.longitude,
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default MapComponent;
