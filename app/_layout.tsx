import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import * as Location from "expo-location";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
} from "../utils/nativewind-styled";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import useStore from "../utils/store";

export default function AppLayout() {
  const [locationPermission, requestPermission] =
    Location.useForegroundPermissions();
  const [setProviderStatus] = useStore((state) => [state.setProviderStatus]);

  const isFocused = useIsFocused();

  useEffect(() => {
    Location.getProviderStatusAsync().then((status) => {
      setProviderStatus(status);
    });
  }, [isFocused]);

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

  return (
    <StyledView className="flex-1">
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.lightWhite,
          headerTitleStyle: {},
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            title: "Location",
            tabBarIcon: ({ color }) => (
              <Ionicons name="map" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="watch-location"
          options={{
            tabBarLabel: "Watch",
            title: "Watch",
            tabBarIcon: ({ color }) => (
              <Ionicons name="watch" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="provider-status"
          options={{
            tabBarLabel: "Status",
            title: "Status",
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart" size={32} color={color} />
            ),
          }}
        />
      </Tabs>
    </StyledView>
  );
}
