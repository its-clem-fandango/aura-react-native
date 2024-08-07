import {
  FlatList,
  Text,
  View,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  /* NOTES: this destructuring is for useAppwrite.js hook that receives dynamic functions as params. data:posts is renaming data to posts */
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  /* Refresh control logic */
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    //recall posts --> to refresh pg and see if any new vids appear
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} userId={user.$id} />} //passing the user.$id is what lets the VideoCard know if a post has been liked by the current user. we also had to do this in the [query] component which is just the search page.
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back,
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {/* user comes from globalcontext object from db but username comes from appwrites handling of users which uses "username" -->db-->users-->usename */}
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        //built-in flatlist prop that lets you create a function that specifies what happens if list is empty
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

/* NOTES: 
Flatlist is a more optimized version of ScrollView for rendering lists, and comes with built-in scroll capabilities which is why RefreshControl works with FlatList

Key Props of FlatList: 
- data: The array of data items to render (FlatList expects data to be an array of items. It can (must?) be an array of objects, but if the data is an object on its own it will break).
- keyExtractor: A function to extract a unique key for each item.
- renderItem: A function that returns the component for each item in the list.
- ListHeaderComponent: A component that is rendered at the top of the list.
- ListEmptyComponent: A component that is rendered when the list is empty (e.g. user hasnt uploaded anything yet).
- RefreshControl: A component used inside flatlist/scrollview/listview to add a pull to refresh functionality. It's key props are refreshing= and onRefresh= but has others
- horizontal: Flatlist uses a vertical list by default, if you add horizontal you can add horizontal scrolling (used in Trending component)

NOTES: one of my list items wasn't formatted correctly but the other two were. I thought the issue was something with in my code but that doesn't make sense. Why would Flatlist/map only render one item with different formatting? Turns out the issue was with the spacing of the document i created in my DB. It makes sense because only one item was rendering weird
*/
