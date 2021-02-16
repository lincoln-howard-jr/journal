export const keepAlive = () => {
  localStorage.setItem ('keep-alive', true);
}
export const cancelKeepAlive = () => {
  localStorage.setItem ('keep-alive', false);
}
export const isAlive = JSON.parse (localStorage.getItem ('keep-alive'));