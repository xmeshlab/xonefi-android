import React from "react";
import { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

/**
 * A component for text input bar styled the way we want
 * 
 * @TODO maybe use onEndEditing instead of onChangeText to reduce refreshes
 */
function GreyTextInputBar({ placeholder_text, state_function }) {
  const onTextInputChangeText = useCallback((text) => {
    state_function(text);
  }, []);

  return (
    <View className="flex flex-col rounded-2xl border-slate-600 bg-slate-800 bg-rounded pl-3 pr-3 p-2 ml-5 mr-5" testID="Grey Text Input Bar">
      <View className="pl-3 pr-3">
        <TextInput 
          style={{color: 'white'}}
          selectionColor="#FFF"
          onChangeText={onTextInputChangeText}
          placeholderTextColor="#808080"
          placeholder={placeholder_text}
          testID="Text Input"
        />
      </View>
    </View>
  );
}

export default GreyTextInputBar;

{/*<View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-2 rounded-2xl justify-around">
    <View className="flex flex-row  justify-between">
      <View className="pl-3 pr-3">
        <TextInput
          selectionColor="#FFF"
          placeholderTextColor="#FFF"
          placeholder="John Doe"
        />
      </View>
    </View>
  </View>*/}

/**
 * return (
    <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1 mt-2 mb-2 mx-6" testID="Grey Text Input Bar">
      <TextInput
        selectionColor="#FFF"
        onChangeText={onTextInputChangeText}
        placeholderTextColor="#FFF"
        placeholder={placeholder_text}
        testID="Text Input"
      />
    </View>
  );
 */