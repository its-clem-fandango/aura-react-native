import { FlatList, Text, View, Image, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import useAppwrite from "../../lib/useAppwrite";
import { getUserLikes } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

//putting the filename in brackets [] also borrows from nextjs. It creates a dynamic route, i.e. we can extract the value of a search out of the input/screen with the [] as the filename

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { query } = useLocalSearchParams(); //we get the query from here

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserLikes(user.$id, query));
  const [uploading, setUploading] = useState(false);

  /* Refresh control logic */
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    //recall posts --> to refresh pg and see if any new vids appear
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    refetch();
  }, [query, user]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} userId={user.$id} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-2xl text-white">Saved Videos</Text>
            <Text className="font-psemibold text-2xl text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={query}
                //onSearch allows specific handling for searching within liked posts based on the query
                onSearch={(searchQuery) => {
                  router.setParams({ query: searchQuery });
                  refetch();
                }}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center px-4">
            <Image
              source={images.empty}
              className="w-[270px] h-[215px]"
              resizeMode="contain"
            />
            <Text className="text-xl text-center font-psemibold text-white mt-2">
              No videos found.
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
              {" "}
              You haven't bookmarked any videos yet.
            </Text>
            <CustomButton
              title="Search Videos"
              handlePress={() => router.push("/home")}
              containerStyles="w-full mt-7"
              isLoading={uploading}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
