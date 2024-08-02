import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

// 1. Create the context object that will hold the global state and functions using createContext()
const GlobalContext = createContext();

// 2. Create a custom hook to allow components to access the nearest context value.
// It looks for the <GlobalContext.Provider> highest in the tree and uses the value it provides

export const useGlobalContext = () => useContext(GlobalContext);

// 3. Create the Provider component that will use the context object created in step 1.
// The provider will manage the state and functions that should be accessible throughout the app e.g. isLoggedIn, setIsLoggedIn, user, setUser, isLoading

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // set to true because we first load the user in

  //if we've logged in before this gives us access to the current user
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          //if we dont have a response
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /* NOTES: Wraps root _layout.jsx and provides these props to the components <GlobalProvider> is wrapping */
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

/* NOTES: 
- "children" is a special built-in prop in react that allows components to pass other components as a prop. 
- It represents everything you want to wrap with the global context (all nested components). 
- When you use "children" in the provider, it allows all the nested components to access the context's value. 
- If you remove "children", none of the nested components will render because GlobalProvider wont' have anything to render. 
- "Children" must always be included in the provider.
- Check the _layout.jsx to see all the child components the GlobalContext.Provider is passing its props to*/

/* NOTES: SEQUENCE OF EVENTS WHEN CREATING CONTEXT:
1. Create the context object that will hold the global state and functions using createContext()
2. Create a Provider component (GlobalProvider in this app) that will use the context object created in step 1. The provider will manage the state and functions that should be accessible throughout the app e.g. isLoggedIn, setIsLoggedIn, user, setUser, isLoading. In other words, GlobalContext.Provider is passing specific values (isLoggedIn, setIsLoggedin, etc) to all nested components
3. In your main app file, wrap the entire application (or the parts that need to access the context) with the provider component. The {children} prop is used here to pass the nested components to the provider
4. Use the context in your components with the useContext hook, allowing them to access the global state and functions provided by the context

*/
