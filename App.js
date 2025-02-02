import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Sigin from "./screens/sigin";
import Login from "./screens/login";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sigin"
          component={Sigin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
