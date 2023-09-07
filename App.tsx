import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledIcon,
  StyledSafeAreaView,
} from "./utils/nativewind-styled";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  // const [locationPermission, setLocationPermission] =
  //   useState<Location.PermissionResponse | null>(null);

  console.log(Location);
  // const [locationPermission, requestPermission] =
  //   Location.useForegroundPermissions();

  // useEffect(() => {
  //   async function requestPermission() {
  //     let response = await Location.requestForegroundPermissionsAsync();
  //     setLocationPermission(response);
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   }
  //   if (Location) requestPermission();
  // }, [Location]);

  // if (!locationPermission) return <StyledView />;
  // if (!locationPermission.granted) {
  //   return (
  //     <StyledSafeAreaView className="flex-1 justify-center items-center">
  //       <StyledText className="font-Prompt-Regular text-lg text-purple-800">
  //         We need your camera permission.
  //       </StyledText>
  //       <StyledTouchableOpacity
  //         onPress={requestPermission}
  //         className="bg-purple-600 p-3 rounded-lg w-1/2 justify-center items-center mt-3"
  //       >
  //         <StyledText className="text-white font-Prompt-Regular">
  //           Grant Permission
  //         </StyledText>
  //       </StyledTouchableOpacity>
  //     </StyledSafeAreaView>
  //   );
  // }

  // console.log(locationPermission);
  return <StyledView className="container"></StyledView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
