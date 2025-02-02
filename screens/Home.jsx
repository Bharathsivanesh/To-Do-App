import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,  
  ScrollView,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { auth, firestore } from "../screens/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const Home = () => {
  const [model, setmodel] = useState(false);
  const [tasks, settasks] = useState([]);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [index, setindex] = useState(null);
  const name = auth.currentUser.displayName;
  const nav = useNavigation();
  const uid = auth.currentUser.uid;
  const Addtask = async () => {
    if (title && desc) {
      if (index == null) {
        //add new task

        try {
          await addDoc(collection(firestore, "To-do"), {
            desc: desc,
            title: title,
            uuid: uid,
          });
          settitle("");
          setdesc("");
          setmodel(false);
          Toast.show({
            type: "success",
            position: "top",
            text1: "Task Added!",
            text2: "You have successfully added a new task.",
            visibilityTime: 3000,
            topOffset: 150,
          });
          fetchdata();
        } catch (e) {
          console.log("Erro form ad task", e);
        }
      } else {
        //add edit task
        try {
          const updatedoc = tasks[index];
          const updatequery = doc(firestore, "To-do", updatedoc.id);
          await updateDoc(updatequery, {
            title: title,
            desc: desc,
          });
          fetchdata();
          setmodel(false);
          settitle("");
          setdesc("");
          setindex(null);
        } catch (e) {
          console.log("Error from edit,", e);
        }
      }
    } else {
      settitle("");
      setdesc("");
      setmodel(false);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error!",
        text2: "Enter All The Field!",
        visibilityTime: 3000,
        topOffset: 200,
      });
    }
  };
  const Deletetask = async (id) => {
    try {
      const query = doc(firestore, "To-do", id);
      await deleteDoc(query);
      fetchdata();
      Toast.show({
        type: "success",
        text1: "Sucess!",
        text2: `Sucessfylly Deleted`,
        visibilityTime: 3000,
        topOffset: 200,
      });
    } catch (e) {
      console.log("Error from delete", e);
    }
  };

  const Editdata = (index) => {
    setindex(index); //when edit button is clicekd then diplay thata data in edit page
    const data = tasks[index];
    setmodel(true);
    settitle(data.title);
    setdesc(data.desc);
  };

  const fetchdata = async () => {
    console.log("Uid is", uid);
    try {
      const querydata = query(
        collection(firestore, "To-do"),
        where("uuid", "==", uid)
      );
      const result = await getDocs(querydata);
      const tasks = result.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      settasks(tasks || []);
    } catch (e) {
      console.log("Error form fetch", e);
      4;
      settasks([]);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [uid]);
  return (
    <>
      <ScrollView>
        <View style={tw`bg-yellow-400 h-28 rounded-b-3xl`}>
          <View style={tw`flex-row  h-full justify-between  mt-10`}>
            <View style={tw`flex flex-row`}>
              <Image
                source={require("../assets/boy.png")}
                style={tw`h-12 w-12 ml-4 mt-2 `}
              />
              <View style={tw`flex flex-col ml-20 mt-5`}>
                <Text style={tw`text-2xl font-black  text-white italic`}>
                  {name}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  nav.goBack();
                }}
              >
                <View>
                  <Image
                    source={require("../assets/logout.png")}
                    style={tw`h-12 w-12 mr-4 mt-2 `}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={tw`text-3xl text-yellow-400 italic text-center mt-6 font-black`}
          >
            Short-Notes
          </Text>
        </View>
        <Modal
          visible={model}
          transparent={true}
          onRequestClose={() => {
            setmodel(false);
          }}
        >
          <View style={tw`flex-1 items-center justify-center bg-white `}>
            <Text style={tw`text-2xl text-yellow-300 font-black`}>
              Create A New Task
            </Text>
            <View style={tw`bg-white h-80 w-80 rounded  mt-3`}>
              <View style={tw`flex flex-col p-2 `}>
                <TextInput
                  placeholder="Enter Title"
                  style={tw`border-black border h-14 mt-6 rounded-xl pt-2 pl-3`}
                  textAlignVertical="top"
                  value={title}
                  onChangeText={settitle}
                />
                <TextInput
                  placeholder="Enter Description"
                  style={tw`border-black border h-24 mt-8 rounded-xl pt-2 pl-3`}
                  textAlignVertical="top"
                  value={desc}
                  onChangeText={setdesc}
                />

                <TouchableOpacity
                  style={tw`bg-yellow-400 rounded h-12 mt-12 w-56 ml-8`}
                  onPress={Addtask}
                >
                  <Text
                    style={tw`text-center  text-white mt-3 font-black text-xl`}
                  >
                    {index == null ? "Add Task" : "Edit Task"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={tw`flex-1 items-center mb-8`}>
          {tasks.map((data, idx) => (
            <View
              key={data.id}
              style={tw`h-52 w-72 bg-yellow-300 p-4 mt-6 rounded-xl`}
            >
              <View style={tw`flex flex-col  h-36 `}>
                <Text style={tw`text-center text-xl font-black text-white`}>
                  {data.title}
                </Text>
                <Text style={tw`mt-3  font-bold`}>{data.desc}</Text>
              </View>
              <View style={tw`flex flex-row justify-around mt-1`}>
                <TouchableOpacity style={tw`bg-blue-600 px-5 py-2 rounded`}>
                  <View>
                    <Text
                      style={tw`text-white`}
                      onPress={() => {
                        Editdata(idx);
                        setmodel(true);
                      }}
                    >
                      Edit
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-red-600 px-4 py-2 rounded`}>
                  <View>
                    <Text
                      style={tw`text-white`}
                      onPress={() => {
                        Deletetask(data.id), console.log("Id", data.id);
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={tw`absolute  bottom-4 right-4 p-4`}>
        <TouchableOpacity
          style={tw`bg-yellow-400 rounded`}
          onPress={() => {
            setmodel(true);
          }}
        >
          <View style={tw`px-6 py-4`}>
            <Icon name="plus" size={25} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Home;
