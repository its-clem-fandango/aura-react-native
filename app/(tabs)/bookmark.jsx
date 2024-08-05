import { View, Text } from "react-native";
import React from "react";

const Bookmark = () => {
  //Saved Videos screen similar to search

  //ability to search saved videos

  /*   add heart icon next to each post/card in homepage. when an item is hearted
it makes an appwrite update request to add the user's id that liked that post to mark the 
post as liked by that specific user. for this you need to go to db --> videos --> and add additional 
attributes such as "liked" which will have a relation to users. It will be an array
of user ids that have liked that post.

once you have that you can make a new request that fetches all the liked posts by the current user.
which is where you can develop the save videos screen where you show the videos that you fetch
 */ return (
    <View>
      <Text>bookmark</Text>
    </View>
  );
};

export default Bookmark;
