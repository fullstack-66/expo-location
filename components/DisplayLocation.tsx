import * as Location from "expo-location";
import { StyledView, StyledText } from "../utils/nativewind-styled";
import ListItem from "./ListItem";

interface DisplayLocationProps {
  location: Location.LocationObject | null;
}

export default function DisplayLocation({ location }: DisplayLocationProps) {
  if (!location) return <StyledView />;
  return (
    <StyledView style={{ gap: 10 }}>
      <StyledText className="text-3xl font-bold text-center text-purple-800">
        Location
      </StyledText>
      <StyledView
        className="bg-gray-200 p-4 rounded-xl mx-10"
        style={{ gap: 8 }}
      >
        <ListItem title="Latitude" value={location.coords.latitude} />
        <ListItem title="Longitude" value={location.coords.longitude} />
        <ListItem title="Accuracy" value={location.coords.accuracy} />
        <ListItem title="Altitude" value={location.coords.altitude} />
        <ListItem title="Heading" value={location.coords.heading} />
        <ListItem title="Speed" value={location.coords.speed} />
        <ListItem title="Timestamp" value={location.timestamp} />
      </StyledView>
    </StyledView>
  );
}
