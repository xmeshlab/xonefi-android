import React from "react";
import { Text, TouchableOpacity } from "react-native";

/**
 * A Component for the View b
 */
export default function ViewButton({ OnPressFunction }) {
  return (
    <TouchableOpacity
      className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1"
      onPress={OnPressFunction}
    >
      <Text className="text-white">View</Text>
    </TouchableOpacity>
  );
}
