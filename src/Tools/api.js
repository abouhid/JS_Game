/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
import 'regenerator-runtime';

const fetch = require('node-fetch');
// https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1SC1U5Tz9rgyJmYwAT3I/scores/

const key = '1SC1U5Tz9rgyJmYwAT3I';
const URI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
const API = (() => {
  // const writeScore = async (user, score) => {
  //   console.log(user)
  //   console.log(score)
  //   const body = JSON.stringify({ user, score });
  //   console.log(body)

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
      const body = {"user": name, "score": score};
       console.log(body)
      const result = await fetch(
        URI,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          credentials: "same-origin",
          body: JSON.stringify(body),
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

export default API;