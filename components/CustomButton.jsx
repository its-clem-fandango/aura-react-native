import { TouchableOpacity, Text } from "react-native";
import React from "react";

//these props come from our index.jsx which consumes the component
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    //TouchableOpacity is a wrapper for making views respond to touches, on press the opacity is dimmed
    //notice how justify-center work without display being set to flex. this is because react native components use flexbox by default
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7} //sets the opacity of the button when pressed
      className={`${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } bg-secondary rounded-xl min-h-[62px] justify-center items-center`}
      disabled={isLoading} //disable button if loading. the opacity-50 is styling to make it look disabled
    >
      {/* Custom title from index.jsx reads "Continue with Email" */}
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
