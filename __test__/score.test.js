
import getScores from '../__mocks__/scoreMock';


test("Checks the player's name", async () => {
  const resp = await getScores();
  expect(resp.user).toEqual('username');
});

test("Checks the player's score", async () => {
  const resp = await getScores();
  expect(resp.score).toEqual(500);
});