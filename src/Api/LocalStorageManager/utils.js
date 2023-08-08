const storageName = "userData";

export function userDataExists(key = storageName) {
  return localStorage.getItem(key) !== null;
}

export function getData(key = storageName) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  return JSON.parse(data);
}
export function setData(key = storageName, data) {
  localStorage.setItem(storageName, JSON.stringify(data));
  return true;
}

export function removeData(key = storageName) {
  localStorage.removeItem(key);
  return true;
}
