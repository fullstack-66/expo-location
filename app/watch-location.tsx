import * as Location from "expo-location";
import React, { useState, useEffect, useRef } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
} from "../utils/nativewind-styled";
import { useIsFocused } from "@react-navigation/native";
import DisplayLocation from "../components/DisplayLocation";
import DisplayGeoCode from "../components/DisplayGeoCode";

export default function App() {
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [geoCodes, setGeoCodes] = useState<
    Location.LocationGeocodedAddress[] | null
  >(null);
  let locationSubscrition = useRef<Location.LocationSubscription | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const locationOptions: Location.LocationTaskOptions = {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
      };

      Location.watchPositionAsync(locationOptions, (location) => {
        setLocation(location);
        setCount((count) => count + 1);
        const { latitude, longitude } = location.coords;
        Location.reverseGeocodeAsync({
          latitude,
          longitude,
        }).then((geoCodes) => {
          setGeoCodes(geoCodes);
        });
      }).then((sub) => (locationSubscrition.current = sub));
    }
    return () => {
      if (locationSubscrition.current) {
        locationSubscrition.current.remove();
      }
    };
  }, [isFocused]);

  return (
    <StyledView
      className="flex-1 justify-start items-center mt-10"
      style={{ gap: 30 }}
    >
      <StyledView
        className="flex-row items-center border border-purple-300 p-4 rounded-xl"
        style={{ gap: 10 }}
      >
        <StyledText className="text-3xl font-bold text-purple-800">
          Request Count
        </StyledText>
        <StyledText className="text-3xl font-bold bg-purple-600 px-4 py-3 rounded-full text-white">
          {count}
        </StyledText>
      </StyledView>
      <StyledScrollView className="flex-1">
        <StyledView style={{ gap: 10 }}>
          <DisplayLocation location={location} />
          <DisplayGeoCode geoCode={geoCodes} />
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
}
