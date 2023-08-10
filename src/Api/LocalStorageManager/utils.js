import CryptoJS from "crypto-js";
const storageName = "userData";

const secretKey = "a*||__123xyV";
/**
 *
 *
 *  Catching local storage loading errors debug methods
 *
 */
function getDataClean(key = storageName) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  return JSON.parse(data);
}
function setDataClean(data, key = storageName) {
  localStorage.setItem(storageName, JSON.stringify(data));
  return true;
}
/**
 *
 * Encrypted local storage methods
 *
 */
function getDataEncrypted(key = storageName) {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    const decryptedData = CryptoJS.AES.decrypt(data, secretKey).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error while loading user data in local storage.", error);
    let result = false;
    while (!result) {
      result = confirm(
        "An error occurred while reading the data. Do you want to delete the saved data?"
      );
      if (result) {
        localStorage.removeItem(key);
        window.location.reload();
      } else {
        alert("The incorrect data remains saved");
      }
    }
    return null;
  }
}

function setDataEncrypted(data, key = storageName) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  localStorage.setItem(key, encryptedData);
}

export function removeData(key = storageName) {
  localStorage.removeItem(key);
  return true;
}

export function userDataExists(key = storageName) {
  return localStorage.getItem(key) !== null;
}

export function getData(key = storageName) {
  return getDataEncrypted(key);
}

export function setData(data, key = storageName) {
  return setDataEncrypted(data, key);
}
