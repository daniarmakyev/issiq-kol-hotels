"use client";

import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  LoadScript,
  DirectionsRenderer,
  OverlayView
} from "@react-google-maps/api";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getAllHouses } from "@/store/house/house.action";


type LatLng = {
  lat: number;
  lng: number;
};

type HouseMarker = LatLng & {
  id: string | number;
  price?: number;
  currency?: string;
};

type PriceMarkerProps = {
  position: LatLng;
  price?: number;
  currency?: string;
};

const LIBRARIES: ("places")[] = ["places"];

const MapPage = () => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_MAP_KEY;

  const params = useParams();
  const lng = params?.lng as string;
  const lat = params?.lat as string;

  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<LatLng | null>(null);
  const [baseMarker, setBaseMarker] = useState<LatLng | null>(null);
  const [houseMarkers, setHouseMarkers] = useState<HouseMarker[]>([]);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [directions, setDirections] = 
    useState<google.maps.DirectionsResult | null>(null);
  const [routeStatus, setRouteStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const defaultLocation: LatLng = { lat: 42.840421654800046, lng: 74.60119790139834 };
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  const dispatch = useAppDispatch();
  const { all } = useAppSelector((state) => state.houses);

  useEffect(() => {
    if (lng && lat) {
      const paramsLocation: LatLng = {
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
          const userLocation: LatLng = {
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
      const markers: HouseMarker[] = all
        .filter(item => item.geo && item.geo.latitude && item.geo.longitude)
        .map(item => ({
          lat: item.geo.latitude,
          lng: item.geo.longitude,
          id: item.id || Math.random().toString(36).substring(2, 9),
          price: item.price,
          currency: item.currency
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
          const newCenter: LatLng = {
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

  const PriceMarker: React.FC<PriceMarkerProps> = ({ position, price, currency }) => {
    return (
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(width: number, height: number) => ({
          x: -(width / 2),
          y: -(height / 2)
        })}
      >
        <div 
          className="bg-white rounded-md shadow-md px-2 py-1 border-2 border-blue-500 w-fit cursor-pointer select-none"
          style={{ 
            fontWeight: 'bold',
            fontSize: '12px',
            zIndex: 1000,
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }}
          onClick={() => handleHouseMarkerClick(position)}
        >
        <span>  {price} {currency}</span>
        </div>
      </OverlayView>
    );
  };

  const handleHouseMarkerClick = (marker: LatLng): void => {
    setSelectedMarker(marker);
    if (map) {
      map.panTo(marker);
      map.setZoom(14); 
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey!}
      libraries={LIBRARIES}
      onLoad={() => setIsScriptLoaded(true)}
    >
      {isScriptLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "90vh" }}
          center={mapCenter || defaultLocation}
          zoom={10}
          onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
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
            <>
              {houseMarkers.map((marker) => (
                <PriceMarker
                  key={`house-${marker.id}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  price={marker.price}
                  currency={marker.currency}
                />
              ))}
            </>
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