import React from "react";
import { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

function GreyTextInputBar({ placeholder_text, state_function }) {
  const onTextInputChangeText = useCallback((text) => {
    state_function(text);
  }, []);

  return (
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
}

export default GreyTextInputBar;
