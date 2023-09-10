import * as Location from "expo-location";
import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledIcon,
} from "../utils/nativewind-styled";
import DisplayLocation from "../components/DisplayLocation";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  function getCurrentLocation() {
    Location.getCurrentPositionAsync({}).then((location) => {
      setLocation(location);
    });
  }

  return (
    <StyledView
      className="flex-col flex-1 justify-end items-center py-10"
      style={{ gap: 20 }}
    >
      <DisplayLocation location={location} />
      <StyledTouchableOpacity
        onPress={getCurrentLocation}
        className="bg-purple-600 py-5 px-6 rounded-full justify-center items-center"
      >
        <StyledIcon name="location" className="text-white" size={70} />
      </StyledTouchableOpacity>
    </StyledView>
  );
}
