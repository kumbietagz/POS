import { Stack, Slot } from "expo-router";

export default function RootLayout() {
  return (
    <Slot>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </Slot>
  );
}