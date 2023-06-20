import Modal, { ModalProps } from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useCallback } from "react";
import { globalStyle } from "../constants/globalStyle";
import SuccessIcon from "../icons/SuccessIcon";

export type BlurModalProps = Partial<ModalProps> & {
  onContentPress?: (event: GestureResponderEvent) => void;
};

export function BlurModal({
  onContentPress,
  children,
  ...modalProps
}: BlurModalProps) {
  const wrapperOnContentPress = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();
      onContentPress?.(event);
    },
    [onContentPress]
  );
  const style = {
    position: "absolute",
    height: 98,
    width: 300,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: "#1E2732",
  };
  return (
    <Modal animationIn={"fadeIn"} {...modalProps}>
      <BlurView blurType={"light"} style={modalStyle.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={modalProps.onBackdropPress}
          style={modalStyle.backdrop}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={wrapperOnContentPress}
            style={modalStyle.modalCard}
          >
            <View style={modalStyle.circle}>
              <View style={globalStyle.centerCenter}>
                <SuccessIcon />
              </View>
            </View>
            <View style={[globalStyle.centerCenter, { flex: 1 }]}>
              {children}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modalCard: {
    borderRadius: 10,
    position: "absolute",
    height: 98,
    width: 300,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: "#1E2732",
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0)",
    marginLeft: -18,
    marginRight: -18,
  },
  circle: {
    position: "absolute",
    left: "50%",
    marginLeft: -27 + 48,
    borderRadius: 27,
    top: -27,
    backgroundColor: "#273343",
    width: 54,
    height: 54,
  },
});
