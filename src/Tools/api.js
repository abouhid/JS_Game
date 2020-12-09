/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
import 'regenerator-runtime';

const fetch = require('node-fetch');
// https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1SC1U5Tz9rgyJmYwAT3I/scores/

const key = '1SC1U5Tz9rgyJmYwAT3I';
const URI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
const api = (() => {
  // const writeScore = async (user, score) => {
  //   const body = JSON.stringify({ user, score });
  //   const data = {
  //     method: 'POST',
  //     headers: {
  //      Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //               },
  //     mode: 'cors',
  //     body,
  //   };
  //   const resp = await fetch(URI, data);
  //   const res = await resp.json();
  //   return res;
  // };

  const writeScore = async (name, score) => {
    try {
      const result = await fetch(
        URI,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "user": name,
            "score": score,
          }),
        },
      );

      return result.json();
    } catch (error) {
      return error.json();
    }
  };

  const readScore = async () => {
    const data = { method: 'GET' };
    const resp = await fetch(URI, data);
    const scores = await resp.json();
    return scores.result;
  };

  return {
    writeScore,
    readScore,
  };
})();

export default api;