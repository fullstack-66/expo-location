import * as Location from "expo-location";
import React, { useState, useEffect, useRef } from "react";
import { StyledView, StyledText } from "../utils/nativewind-styled";
import { useIsFocused } from "@react-navigation/native";
import DisplayLocation from "../components/DisplayLocation";

export default function App() {
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
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
      className="flex-1 justify-start items-center my-10"
      style={{ gap: 30 }}
    >
      <StyledView className="flex-row gap-2 items-center">
        <StyledText className="text-3xl font-bold text-purple-800">
          Request Count
        </StyledText>
        <StyledText className="text-3xl font-bold bg-purple-600 p-3 rounded-full text-white">
          {count}
        </StyledText>
      </StyledView>
      <DisplayLocation location={location} />
    </StyledView>
  );
}
