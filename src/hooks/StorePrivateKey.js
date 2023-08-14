import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This is the function used to store a users private key into persistant storage using AsyncStorage
 * 
 * @param pk - the private key as a string
 */
const storePrivteKey = async (pk) => {
    try {
      await AsyncStorage.setItem(
        "privateKey",
        pk,
      );
    } catch (error) {
      // Error saving data
      alert(error)
    }
  
  }

  export default storePrivteKey
