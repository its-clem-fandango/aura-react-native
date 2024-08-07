import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery, searchQuery }) => {
  //usePathname provides the current path of the URL in your app so you can know exactly where the user is within your app. By knowing the current path, you can apply conditional logic like whether to update the search parameters in the URL or navigate to a new results page
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video by topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          /* NOTES: query captures the search term, onSearch function is provided by the parent bookmark, and is called with the current search query */
          if (searchQuery) {
            searchQuery(query);
          }
          //if we're already on the search page or bookmark pg, set the search param to whatever the query is e.g. ?query=dogs ?query=cat
          if (
            pathname.startsWith("/search") ||
            pathname.startsWith("/bookmark")
          ) {
            router.setParams({ query });
          }
          //otherwise take us to the search page
          else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
