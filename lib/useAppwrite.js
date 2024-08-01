import { useEffect, useState } from "react";

/* fn is just passing the function name, since this hook is just dynamic fetching */
const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* Data fetching */
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //NOTES: you cant use async code within useEffect so we have to create a new function which you call to fetch the data directly
  useEffect(() => {
    fetchData();
  }, []);

  //Called on refresh whenever we pull to reload
  const refetch = () => fetchData();
  return { data, isLoading, refetch };
};

export default useAppwrite;
