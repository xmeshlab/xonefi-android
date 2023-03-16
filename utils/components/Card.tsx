import React, { ComponentProps, FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';

interface OwnProps {}

type Props = OwnProps;

const Card: FunctionComponent<ComponentProps<typeof View>> = ({children, style, ...otherProps}) => {

  return <View {...otherProps} style={[defaultStyle.container, style]}>
      {children}
  </View>;
};

export default Card;

const defaultStyle = StyleSheet.create({
    container: {
        borderRadius: 7,
        backgroundColor: "#3C556C5C",
        shadowColor: "rgba(99, 99, 99, 0.12)",
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowRadius: 24,
        shadowOpacity: 1
    }
})