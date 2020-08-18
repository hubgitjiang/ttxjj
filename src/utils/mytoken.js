// 保存数据到 localstorage

function getToken (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function setToken (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function removeToken (key) {
  window.localStorage.removeItem(key)
}

export { getToken, setToken, removeToken }
