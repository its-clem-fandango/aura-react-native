import { TouchableOpacity, Text } from "react-native";
import React from "react";

/**
 * CustomButton component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The text to display inside the button.
 * @param {Function} props.handlePress - The function to call when the button is pressed.
 * @param {string} [props.containerStyles] - Additional styles for the button container.
 * @param {string} [props.textStyles] - Additional styles for the button text.
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state.
 */

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
