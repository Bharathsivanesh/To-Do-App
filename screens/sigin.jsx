import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth, firestore } from "../screens/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Sigin = () => {
  const [usermail, setusermail] = useState("");
  const [userpass, setuserpass] = useState("");
  const [name, setname] = useState("");
  const nav = useNavigation();
  const siginvalidate = async () => {
    if (!usermail || !userpass || !name) {
      alert("Please fill in both email and password fields");
      return;
    } else {
      try {
        const userauth = await createUserWithEmailAndPassword(
          auth,
          usermail,
          userpass
        );
        const id = userauth.user;
        await updateProfile(id, {
          //for storing name so seprate function clled update profile
          displayName: name,
        });

        alert("Sign-up Sucessfully!");
        setname("");
        setusermail("");
        setuserpass("");
        nav.goBack();
      } catch (e) {
        console.log("Error from sigin Auth", e);
        const errmsg = e.code ? e.code.split("/")[1] : "Unkown Error";

        alert(errmsg);
      }
    }
  };

  return (
    <View style={tw`h-full w-full bg-white `}>
      <ScrollView>
        <View style={tw`flex flex-col  items-center mt-36 `}>
          <Image source={require("../assets/add-user.png")} />
          <Text
            style={tw`text-4xl font-bold italic text-yellow-400 mt-10  w-full text-center font-black`}
          >
            SIGIN UP
          </Text>
          <View style={tw`w-full flex flex-col items-center  `}>
            <TextInput
              placeholder="Enter Name"
              style={tw`border-b border-yellow-400 mt-10  mb-4 w-64 px-2`}
              onChangeText={(Text) => {
                setname(Text);
              }}
              value={name}
            />
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
              onPress={siginvalidate}
            >
              <Text style={tw`text-white font-black`}>Sigin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Sigin;
