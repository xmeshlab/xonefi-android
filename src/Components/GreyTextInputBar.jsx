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