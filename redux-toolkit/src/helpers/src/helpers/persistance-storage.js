export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.log("Error saving data");
  }
};

export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(error);
    return null; // yoki boshqa qaytadigan qiymat
  }
};
export const removeItem = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
    return null; // yoki boshqa qaytadigan qiymat
  }
};
