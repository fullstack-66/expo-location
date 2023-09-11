import * as Location from "expo-location";
import { StyledView, StyledText } from "../utils/nativewind-styled";
import ListItem from "./ListItem";

interface DisplayGeoCodeProps {
  geoCode: Location.LocationGeocodedAddress[] | null;
}

export default function DisplayGeoCode({ geoCode }: DisplayGeoCodeProps) {
  if (!geoCode) return <StyledView />;

  return (
    <StyledView style={{ gap: 10 }}>
      <StyledText className="text-3xl font-bold text-center text-purple-800">
        Geocode
      </StyledText>
      {geoCode.map((item, index) => {
        return (
          <StyledView
            className="bg-gray-200 p-4 mx-10 rounded-xl"
            style={{ gap: 6 }}
            key={index}
          >
            <ListItem title="Name" value={item.name} />
            <ListItem title="City" value={item.city} />
            <ListItem title="District" value={item.district} />
            <ListItem title="Country" value={item.country} />
            <ListItem title="ISOCountryCode" value={item.isoCountryCode} />
            <ListItem title="Postal Code" value={item.postalCode} />
            <ListItem title="Region" value={item.region} />
            <ListItem title="Street" value={item.street} />
            <ListItem title="Street Number" value={item.streetNumber} />
            <ListItem title="Subregion" value={item.subregion} />
            <ListItem title="Timezone" value={item.timezone} />
          </StyledView>
        );
      })}
    </StyledView>
  );
}
