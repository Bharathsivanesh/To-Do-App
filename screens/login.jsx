import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth, firebase } from "./firebase";

const Login = () => {
  const [usermail, setusermail] = useState("");
  const [userpass, setuserpass] = useState("");
  const nav = useNavigation();
  const loginvalidate = async () => {
    if (!usermail || !userpass) {
      alert("Fill All The Field!!!");
    } else {
      try {
        const check = await signInWithEmailAndPassword(
          auth,
          usermail,
          userpass
        );
        alert("Sucessfully Login!!!");
        nav.navigate("Home");
        setusermail("");
        setuserpass("");
      } catch (e) {
        const errmsg = e.code ? e.code.split("/")[1] : "Invalid";
        alert(errmsg);
        setusermail("");
        setuserpass("");
      }
    }
  };
  return (
    <>
      <View style={tw`h-full w-full bg-white`}>
        <View style={tw`flex flex-col items-center mt-24 `}>
          <Image source={require("../assets/user.png")} />
          <Text
            style={tw`text-4xl font-bold italic text-yellow-400 mt-10  w-full text-center font-black`}
          >
            LOGIN
          </Text>
          <View style={tw`w-full flex flex-col items-center  `}>
            <TextInput
              placeholder="Email"
              style={tw`border-yellow-400 border-b w-64 mt-5 px-2`}
              onChangeText={(Text) => {
                setusermail(Text);
              }}
              value={usermail}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={tw`border-b border-yellow-400 mt-10  w-64 px-2`}
              onChangeText={(Text) => {
                setuserpass(Text);
              }}
              value={userpass}
            />

            <TouchableOpacity
              style={tw`mt-12 bg-yellow-400 w-64 h-12 rounded-2xl items-center justify-center`}
              onPress={loginvalidate}
            >
              <Text style={tw`text-white font-black`}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("Sigin");
              }}
            >
              <Text style={tw`text-yellow-400 font-black mt-6`}>
                Don't have a Account ? sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Login;
