import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useState, useEffect } from "react";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledIcon,
} from "./utils/nativewind-styled";

TaskManager.defineTask(
  "LOCATION_TASK",
  ({ data: { locations: any }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return;
    }
    console.log("Received new locations", locations);
  }
);

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    Location.getProviderStatusAsync().then((status) => {
      console.log(status);

      Location.hasServicesEnabledAsync().then((enabled) => {
        console.log(enabled);
      });
    });
  }, []);

  const [locationPermission, requestPermission] =
    Location.useForegroundPermissions();

  if (!locationPermission) return <StyledView />;
  if (!locationPermission.granted) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="font-Prompt-Regular text-lg text-purple-800">
          We need your location permission.
        </StyledText>
        <StyledTouchableOpacity
          onPress={requestPermission}
          className="bg-purple-600 p-3 rounded-lg w-1/2 justify-center items-center mt-3"
        >
          <StyledText className="text-white font-Prompt-Regular">
            Grant Permission
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  function getCurrentLocation() {
    Location.getCurrentPositionAsync({}).then((location) => {
      setLocation(location);
    });
  }

  return (
    <StyledView className="flex-col flex-1 justify-end items-center py-10">
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

interface DisplayLocationProps {
  location: Location.LocationObject | null;
}

function DisplayLocation({ location }: DisplayLocationProps) {
  if (!location) return <StyledView />;
  return (
    <StyledView className="bg-gray-100 p-4 rounded-xl flex-col mb-6">
      <ListItem title="Latitude" value={location.coords.latitude} />
      <ListItem title="Longitude" value={location.coords.longitude} />
      <ListItem title="Accuracy" value={location.coords.accuracy} />
      <ListItem title="Altitude" value={location.coords.altitude} />
      <ListItem title="Heading" value={location.coords.heading} />
      <ListItem title="Speed" value={location.coords.speed} />
      <ListItem title="Timestamp" value={location.timestamp} />
    </StyledView>
  );
}

interface ListItemProps {
  title: string;
  value: string | number | null | undefined;
}

function ListItem({ title, value }: ListItemProps) {
  const valueTxt = value?.toString() ?? "Unknown";
  return (
    <StyledView className="flex-row items-center my-2 gap-2">
      <StyledText className="bg-gray-400 text-white px-2 py-1 rounded-lg font-bold">
        {title}
      </StyledText>
      <StyledText className="">{valueTxt}</StyledText>
    </StyledView>
  );
}
