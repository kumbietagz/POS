import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Button, ButtonText } from "@gluestack-ui/themed";
import React from "react";

export default function Index() {
  const windowWidth = Dimensions.get("window").width;
  const imageWidth = windowWidth * 0.8; // Adjust the percentage as needed

  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonContainer}
        onPress={async () => {
          try {
            const { router } = await import('expo-router');
            router.push('/home');
          } catch (error) {
            console.error("Failed to navigate:", error);
          }
        }}
      >
        <ButtonText style={styles.buttonText}>Let's go!</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#87CEFA',
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: '#FF6F61',
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
