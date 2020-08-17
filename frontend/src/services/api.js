import axios from 'axios';
import crypto from 'crypto';

var ts = new Date().getTime();
const keys = {
  'public' : '6700b8c713f3ad33173b9593c5d870ca',
  'private' : '2b0ea1f4011cbc108aeb6e153a2fd645c890f14c'
}

function getKeys(){
  var hash = crypto.createHash('md5').update(ts + keys.private + keys.public).digest('hex');
  return (hash.toString());
}

let apiParams = {
  ts: ts,
  apikey: keys.public,
  hash: getKeys(),
  limit: 10,
}

const api = axios.create({
    baseURL : "http://localhost:3333"
});

export default api;
export {
    apiParams
}