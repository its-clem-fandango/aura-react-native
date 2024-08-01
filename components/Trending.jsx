import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">Text from Trending</Text>
      )}
      horizontal //makes the list horizontally scrollable, which scrollview doesn't support
    />
  );
};

export default Trending;
