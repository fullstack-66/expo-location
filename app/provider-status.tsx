import { StyledView, StyledText } from "../utils/nativewind-styled";
import useStore from "../utils/store";
import ListItem from "../components/ListItem";

export default function ProviderStatus() {
  const [providerStatus] = useStore((state) => [state.providerStatus]);

  return (
    <StyledView className="m-10 rounded-xl p-3 bg-gray-200" style={{ gap: 10 }}>
      <StyledText className="text-3xl font-bold text-purple-800">
        Provider Status
      </StyledText>
      <ListItem
        title="backgroundModeEnabled"
        value={providerStatus?.backgroundModeEnabled}
      />
      <ListItem title="gpsAvailable" value={providerStatus?.gpsAvailable} />
      <ListItem
        title="locationServicesEnabled"
        value={providerStatus?.locationServicesEnabled}
      />
      <ListItem
        title="networkAvailable"
        value={providerStatus?.networkAvailable}
      />
      <ListItem
        title="passiveAvailable"
        value={providerStatus?.passiveAvailable}
      />
    </StyledView>
  );
}
