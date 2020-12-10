
import getScores from '../__mocks__/scoreMock';


test("Checks the player's name", async () => {
  const resp = await getScores();
  expect(resp.user).toEqual('username');
});

test("Checks the player's score", async () => {
  const resp = await getScores();
  expect(resp.score).toEqual(500);
});

test('Test to see if the input for the API works', () => {
  const score = saveScore('testUserNameScore', 1000);
  score.then(result => {
    expect(result).toBe('200');
  }).catch(() => 'Error found');
});

test('Test to see if there is any data coming from the API', () => {
  const api = Req.getData();
  api.then(result => {
    expect(result[0].user).toBe('testUserNameScore');
  });
});