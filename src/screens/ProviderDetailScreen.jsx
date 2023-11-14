import * as React from "react";
import { useEffect } from "react";
import { View, Text, Switch, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";
import { GreyTextInputBarNoMargin } from "../Components/GreyTextInputBar";
import GreyBackgroundBox from "../Components/GreyBackgroundBox";
import { useState } from "react";
import { Calendar, CalendarList } from "react-native-calendars";
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
  read_default_config,
  write_default_config,
} from "../../xonefi-api-client/config";

import ProviderPasswordScreen from "./ProviderPasswordScreen";
/**
 * This screen displays additional information about a specific XOneFi Provider.
 * A User is routed to this page after clicking on a Provider displayed on the Provider Screen.
 */
export default function ProviderDetailScreen({ route, navigation }) {
  const { SSID } = route.params;

  const [shareTimeDaily, setShareTimeDaily] = useState(0);

  //value here might have to come from persistent storage, or cloud, so the user does not have to reset the value everytime app loads
  const [OFIMinute, setOFIMinute] = useState(0);
  
  //Function for changine the value of price_of_ofi in the database 
  function changeOFIMinute(newValue){
    read_default_config((config_json2) => {
      if (config_json2.cft) {
        //alert("Setting ofi to : " + newValue)
        config_json2.price_ofi_hr = newValue
        write_default_config(config_json2, () => {
          console.log("XLOG: Config is successfully initialized (2).");
        });
        setOFIMinute(config_json.price_ofi_hr) 
      }
    });


  }

  const [isPrivate, setIsPrivate] = useState(false);
  const toggleSwitch = () => setIsPrivate((previousState) => !previousState);
  const [validPasswordProvided, setValidPasswordProvided] = useState(false)

  //Calender State
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  function openCalender() {
    setIsCalenderOpen(true);
  }

  function closeCalender() {
    setIsCalenderOpen(false);
  }

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    read_default_config((config_json) => {
      if (config_json.cft) {
        //alert("Reading price ofi from config")
        setOFIMinute(config_json.price_ofi_hr) 
      }
    });

  }, [])


  if (validPasswordProvided === true){
  return (
    <ScrollView>
      <GreyBackgroundBox
        titleText={"Router Information"}
        children={
          <>
            <Text className="text-orange-500 mb-5 text-base">{SSID}</Text>
            <GreyBackgroundBar
              LeftText={"IP Address"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    alert("Button Pressed");
                  }}
                />
              }
            />
            <GreyBackgroundBar
              LeftText={"Wifi-Speed"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    alert("Button Pressed");
                  }}
                />
              }
            />
          </>
        }
      />

      <GreyBackgroundBox
        titleText={"Sharing  Setting"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"OFI/Minute"}
              RightSideComponent={
                <View style={{ transform: [{ scaleX: 1 }, { scaleY: 0.8 }] }}>
                  <GreyTextInputBarNoMargin
                    placeholder_text={""+OFIMinute}
                    state_function={changeOFIMinute}
                  />
                </View>
              }
            />
            <GreyBackgroundBar
              LeftText={"Private Connection"}
              RightSideComponent={
                <Switch
                  style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  trackColor={{ false: "#767577", true: "#0E60FF" }}
                  thumbColor={"#2B3FF2"}
                  onValueChange={toggleSwitch}
                  value={isPrivate}
                />
              }
            />
            <GreyBackgroundBar
              LeftText={"Share Time/Daily"}
              RightSideComponent={
              <View className="flex flex-row">
              <DateButton
                OnPressFunction={
                  ()=>{openCalender()}
                }
                Date={startDate === "" ? "start date": DateToString(startDate)}
              />
              <Text className="text-white mx-1">-</Text>
              <DateButton
                OnPressFunction={
                  ()=>{openCalender()}
                }
                Date={endDate === "" ? "End date":DateToString(endDate)}
              />
              </View>}
            />
            <CalenderModal modalIsOpen={isCalenderOpen} closeModal={closeCalender}  setStartDate={setStartDate} setEndDate={setEndDate}/>
              {/*<DateTimePicker
          testID="dateTimePicker"
          value={new Date(1598051730000)}
          mode={'date'}
          is24Hour={true}
          onChange={()=>{}}
              />*/}
          </>
        }
      />

      {/*<GreyBackgroundBox
        titleText={"Connected Clients"}
        children={
          <>
            <View className="flex flex-row mb-2 justify-between">
              <Text className="text-white text-base">OFI/GB</Text>
              <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
                <Text className="text-white">View</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />*/}
      <Text className="text-white text-2xl mt-6 mb-8 mx-6">
        Connected Clients
      </Text>
    </ScrollView>
    );

  }else{
    return <ProviderPasswordScreen setValidPasswordProvided={setValidPasswordProvided}/>
  }
}


//Modals
function CalenderModal({modalIsOpen, closeModal, setStartDate, setEndDate }) {
  function onDateChange(date, type){
    //debug code
    console.log("Date from Calender Module")
    console.log(typeof(date)) //object
    console.log(date)
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  }

  return (
    <Modal visible={modalIsOpen}
    onBackdropPress={() => closeModal()}
    >
      <View className="bg-white">
            <CalendarPicker 
          startFromMonday={true}
          allowRangeSelection={true}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
        <View className="flex flex-row justify-evenly p-5">
        <Button onPress={()=>{showMode('time');}} title="Start Time"/>
        <Text className="text-black text-3xl">-</Text>
        <Button onPress={()=>{showMode('time');}} title=" End Time " />
        </View>
        </View>
    </Modal>
  );
}

function DateButton({ OnPressFunction, Date }) {
  return (
    <TouchableOpacity
      className="rounded-md border-slate-600 bg-slate-600 px-1 py-1 w-30 h-7 overflow-hidden"
      onPress={OnPressFunction}
    >
      <Text className="text-white">{Date}</Text>
    </TouchableOpacity>
  );
}

function DateToString(date){
  date = date.toString()
  //alert("String Date : " + date)
  const dateArray = date.split(" ")
  //alert(dateArray)
  const output = dateArray[1]+" "+dateArray[2]
  return output

}

const showMode = (currentMode) => {
  DateTimePickerAndroid.open({
    value: new Date(1598051730000),
    onChange: ()=>{console.log("onChange")},
    mode: currentMode,
    is24Hour: false,
    display: "spinner"
  });
}

