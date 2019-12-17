const pathname = window.location.origin.match('keyforu')
  ? 'https://steam-keys.herokuapp.com'
  : 'http://localhost:3000';
const fetchApi = (url, options) =>
  fetch(`${pathname}${url}`, options).then(res => res.json());
export default fetchApi;
