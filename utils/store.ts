import { create } from "zustand";
import * as Location from "expo-location";

interface Store {
  providerStatus: Location.LocationProviderStatus | null;
  setProviderStatus: (
    providerStatus: Location.LocationProviderStatus | null
  ) => void;
  // locationServiceEnabled: boolean;
  // setLocationServiceEnabled: (locationServiceEnabled: boolean) => void;
}

const useStore = create<Store>((set) => ({
  providerStatus: null,
  setProviderStatus: (providerStatus) => set({ providerStatus }),
  // locationServiceEnabled: false,
  // setLocationServiceEnabled: (locationServiceEnabled) =>
  //   set({ locationServiceEnabled }),
}));

export default useStore;
