import CryptoJS from "crypto-js";
const storageName = "userData";

const secretKey = "a*||__123xyV";

export function userDataExists(key = storageName) {
  return localStorage.getItem(key) !== null;
}

export function getData(key = storageName) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  // const decryptedData = CryptoJS.AES.decrypt(data, secretKey).toString(
  //   CryptoJS.enc.Utf8
  // );
  // return JSON.parse(decryptedData);
  return JSON.parse(data);
}
export function setData(key = storageName, data) {
  // const encryptedData = CryptoJS.AES.encrypt(
  //   JSON.stringify(data),
  //   secretKey
  // ).toString();

  // localStorage.setItem(key, encryptedData);
  localStorage.setItem(storageName, JSON.stringify(data));
  return true;
}

export function removeData(key = storageName) {
  localStorage.removeItem(key);
  return true;
}
