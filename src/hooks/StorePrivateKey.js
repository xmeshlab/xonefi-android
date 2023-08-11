import AsyncStorage from "@react-native-async-storage/async-storage";

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
