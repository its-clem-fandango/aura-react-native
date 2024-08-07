import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import { toggleUserLikes } from "../lib/appwrite";

/* we know how to destructure the items that are passed here from flatlist 
because of the appwrite documentation presumably and also by logging userId or posts 
in the home component (which requires adding a useEffect) which gives us the JSON from the db */
const VideoCard = ({
  video: {
    $id: videoId,
    title,
    thumbnail,
    video,
    creator: { username, avatar },
    likes,
  },
  userId,
}) => {
  const [play, setPlay] = useState(false);
  const [isLiked, setisLiked] = useState(false);

  // Check if user has bookmarked the video
  useEffect(() => {
    if (likes) {
      setisLiked(likes.some((like) => like.accountId === userId));
    }
  }, [likes, userId]);

  const handleLikeToggle = async () => {
    try {
      const updatedVideo = await toggleUserLikes(videoId, userId);
      setisLiked(updatedVideo.likes.some((like) => like.accountId === userId));
    } catch (error) {
      console.error("Error toggling like: ", error);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        {/* B O O K M A R K we use ! as toggle switch */}
        <TouchableOpacity onPress={handleLikeToggle}>
          <View className="pt-2">
            {/* NOTES: In React Native, tintColor is a property that you can use to change the color of
            an image that is rendered using the Image component. This is especially useful when you have
            monochromatic icons or images, and you want to change their color dynamically based on 
            certain conditions, such as whether an item is selected or not. */}
            <Image
              source={icons.bookmark}
              className="w-5 h-5"
              style={{ tintColor: isLiked ? "#FFA001" : "#FFFFFF" }} // Apply tintColor based on state
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.error) {
              console.error("Video playback error:", status.error);
              setPlay(false); // Stop playing on error
            } else if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => {
            console.error("Video onError:", error);
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center "
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
