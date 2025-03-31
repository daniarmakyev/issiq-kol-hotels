"use client";

import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  LoadScript,
  DirectionsRenderer,
  MarkerClusterer
} from "@react-google-maps/api";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getAllHouses } from "@/store/house/house.action";

const LIBRARIES: "places"[] = ["places"];

const MapPage = () => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_MAP_KEY;

  const params = useParams();
  const lng = params?.lng as string;
  const lat = params?.lat as string;

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [baseMarker, setBaseMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [houseMarkers, setHouseMarkers] = useState<Array<{
    lat: number;
    lng: number;
    id: string | number;
  }>>([]);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [routeStatus, setRouteStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const defaultLocation = { lat: 42.840421654800046, lng: 74.60119790139834 };
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const { all } = useAppSelector((state) => state.houses);

  useEffect(() => {
    if (lng && lat) {
      const paramsLocation = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
      setMapCenter(paramsLocation);
      setSelectedMarker(prev => prev || paramsLocation);
    } else {
      setMapCenter(defaultLocation);
    }
  }, [lng, lat]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setBaseMarker(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setBaseMarker(defaultLocation);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setBaseMarker(defaultLocation);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllHouses());
  }, [dispatch]);

  useEffect(() => {
    if (all && all.length > 0) {
      const markers = all
        .filter(item => item.geo && item.geo.latitude && item.geo.longitude)
        .map(item => ({
          lat: item.geo.latitude,
          lng: item.geo.longitude,
          id: item.id || Math.random().toString(36).substring(2, 9)
        }));
      
      setHouseMarkers(markers);
    }
  }, [all]);


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (routeStatus) {
      timeoutId = setTimeout(() => {
        setRouteStatus("");
      }, 3000);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [routeStatus]);

  useEffect(() => {
    if (
      isScriptLoaded &&
      baseMarker &&
      selectedMarker &&
      (selectedMarker.lat !== baseMarker.lat ||
        selectedMarker.lng !== baseMarker.lng)
    ) {
      setLoading(true);

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: baseMarker,
          destination: selectedMarker,
          travelMode: google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: google.maps.TrafficModel.BEST_GUESS,
          },
        },
        (result, status) => {
          setLoading(false);
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setRouteStatus("Маршрут построен успешно!");
          } else {
            console.error("Ошибка при построении маршрута:", status);
            setRouteStatus("Не удалось построить маршрут.");
          }
        }
      );
    }
  }, [selectedMarker, baseMarker, isScriptLoaded]);

  const MySearchBox: React.FC = () => {
    const handleSearchPlaces = () => {
      if (!searchBoxRef.current || !map) return;
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry?.location;
        if (location) {
          const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMap((prev) => {
            if (prev) prev.panTo(newCenter);
            return prev;
          });
          setSelectedMarker(newCenter);
        }
      }
    };

    return (
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handleSearchPlaces}
      >
        <div>
          <input
            type="text"
            placeholder="Найти место"
            className="rounded-[40px] border-2 border-[#000] absolute top-[22px] left-[50%] translate-x-[-50%] py-[6px] px-[14px] max-w-[702px] w-full flex gap-[14px] justify-between items-center bg-[#F4F4F4] z-[30]"
          />
        </div>
      </StandaloneSearchBox>
    );
  };


  const handleHouseMarkerClick = (marker: { lat: number; lng: number }) => {
    setSelectedMarker(marker);
    if (map) {
      map.panTo(marker);
      map.setZoom(14); 
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={LIBRARIES}
      onLoad={() => setIsScriptLoaded(true)}
    >
      {isScriptLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "90vh" }}
          center={mapCenter || defaultLocation}
          zoom={10}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <MySearchBox />
          

          {baseMarker && <Marker 
            position={baseMarker} 
            label="A"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new google.maps.Size(40, 40),
            }}
          />}
          

          {selectedMarker && 
           (!baseMarker || 
            selectedMarker.lat !== baseMarker.lat || 
            selectedMarker.lng !== baseMarker.lng) && (
            <Marker 
              position={selectedMarker} 
              label="B"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
          )}
          

          {houseMarkers.length > 0 && (
            <MarkerClusterer
              options={{
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                gridSize: 50,
                maxZoom: 15,
                minimumClusterSize: 2
              }}
            >
              {(clusterer) => (
                <>
                  {houseMarkers.map((marker) => (
                    <Marker
                      key={`house-${marker.id}`}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      clusterer={clusterer}
                      onClick={() => handleHouseMarkerClick(marker)}
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                        scaledSize: new google.maps.Size(30, 30),
                      }}
                    />
                  ))}
                </>
              )}
            </MarkerClusterer>
          )}
          
          {loading && (
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
              Загружается маршрут...
            </div>
          )}
          {routeStatus && (
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow transition-opacity duration-300">
              {routeStatus}
            </div>
          )}
          
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                  strokeColor: "#FF0000",
                  strokeWeight: 4,
                  strokeOpacity: 0.7,
                },
              }}
            />
          )}
        </GoogleMap>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Загрузка карты...</div>
        </div>
      )}
    </LoadScript>
  );
};

export default MapPage;