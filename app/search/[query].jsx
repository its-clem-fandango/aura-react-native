import { FlatList, Text, View } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

//putting the filename in brackets [] also borrows from nextjs. It creates a dynamic route, i.e. we can extract the value of a search out of the input/screen with the [] as the filename

/* Search handles the filtering logic */
const Search = () => {
  const { user } = useGlobalContext();
  const { query } = useLocalSearchParams(); //we get the query from here
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    //everytime query changes call refetch which re-renders page
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} userId={user.$id} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>

            <Text className="font-psemibold text-2xl text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

/* NOTES: 

on Param hooks like useLocalSearchParams:

URL parameters include both route parameters and search parameters. Expo Router provides 
hooks for accessing and modifying these parameters.

Route parameters are dynamic segments defined in a URL path, such as /profile/[user], 
where user is a route parameter. They are used to match a route.

Search parameters (also known as query params) are serializable fields that can be 
appended to a URL, such as /profile?extra=info, where extra is a search parameter. 
They are commonly used to pass data between pages.

In this context, "query" refers to the search term or phrase that a user inputs to find specific information or data

There's two types of queries:
Database query: refers to the request for information from a database
Url Query parameters: a query is part of the URL used to pass information
to the server. It usually appears after a "?" in the URL and consists of 
key-value pairs.  For example, in the URL:

www.example.com/search?query=JavaScript, 

the query parameter has the value "JavaScript".
*/
