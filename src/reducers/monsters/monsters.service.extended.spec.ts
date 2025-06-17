import { MonsterServiceExtended } from './monsters.service.extended';
import { API_URL } from '../../constants/env';
import { mockBattle } from './monsters.fixtures';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockBattle),
  }),
) as jest.Mock;

describe('Monsters Service Extended', () => {
  it('should get the winner of the battle of monsters', async () => {
    const monster1Id = 'monster-1';
    const monster2Id = 'monster-2';

    const winner = await MonsterServiceExtended.getWinner(
      monster1Id,
      monster2Id,
    );

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/battle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster1Id, monster2Id }),
    });
    expect(winner).toEqual(mockBattle.winner);
  });
});