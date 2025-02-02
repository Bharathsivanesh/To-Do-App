import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

const Splash = () => {
  const nav = useNavigation();
  const isfocus = useIsFocused();
  useEffect(() => {
    if (isfocus) {
      const timer = setTimeout(() => {
        nav.navigate("Login");
      }, 2000);
    }
  }, [isfocus]);
  return (
    <>
      <View style={tw`flex items-center justify-center bg-white h-full`}>
        <Image
          source={require("../assets/splash1.png")}
          style={tw`h-96 w-80  ml-6`}
        />
      </View>
    </>
  );
};
export default Splash;
