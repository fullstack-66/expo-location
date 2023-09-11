import * as Location from "expo-location";
import React, { useState } from "react";
import {
  StyledView,
  StyledTouchableOpacity,
  StyledIcon,
  StyledScrollView,
} from "../utils/nativewind-styled";
import DisplayLocation from "../components/DisplayLocation";
import DisplayGeoCode from "../components/DisplayGeoCode";
export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [geoCodes, setGeoCodes] = useState<
    Location.LocationGeocodedAddress[] | null
  >(null);

  async function getCurrentLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const { latitude, longitude } = location.coords;
      const geoCodes = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setGeoCodes(geoCodes);
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  return (
    <StyledView
      className="flex-col flex-1 justify-end items-center pb-10"
      style={{ gap: 20 }}
    >
      <StyledScrollView className="flex-1">
        <StyledView className="py-4" style={{ gap: 10 }}>
          <DisplayLocation location={location} />
          <DisplayGeoCode geoCode={geoCodes} />
        </StyledView>
      </StyledScrollView>
      <StyledTouchableOpacity
        onPress={getCurrentLocation}
        className="bg-purple-600 py-5 px-6 rounded-full justify-center items-center"
      >
        <StyledIcon name="location" className="text-white" size={70} />
      </StyledTouchableOpacity>
    </StyledView>
  );
}
