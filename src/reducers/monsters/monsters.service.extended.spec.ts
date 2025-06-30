import { MonsterServiceExtended } from './monsters.service.extended';
import { API_URL } from '../../constants/env';
import monstersData from '../../../data/monsters.json';

// Mock fetch globally
global.fetch = jest.fn();

describe('Monsters Service Extended', () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should get the winner of the battle of monsters', async () => {
    const mockBattleResult = {
      winner: monstersData.monsters[0],
      tie: false,
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBattleResult,
    } as Response);

    const monster1 = monstersData.monsters[0];
    const monster2 = monstersData.monsters[1];

    const result = await MonsterServiceExtended.getBattleWinner(
      monster1,
      monster2,
    );

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/battle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        monster1,
        monster2,
      }),
    });

    expect(result).toEqual(mockBattleResult);
  });

  it('should handle battle tie correctly', async () => {
    const mockTieResult = {
      winner: monstersData.monsters[2],
      tie: true,
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTieResult,
    } as Response);

    const monster1 = monstersData.monsters[2];
    const monster2 = monstersData.monsters[3];

    const result = await MonsterServiceExtended.getBattleWinner(
      monster1,
      monster2,
    );

    expect(result.tie).toBe(true);
    expect(result.winner).toEqual(monstersData.monsters[2]);
  });

  it('should handle API errors gracefully', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('API Error'),
    );

    const monster1 = monstersData.monsters[0];
    const monster2 = monstersData.monsters[1];

    await expect(
      MonsterServiceExtended.getBattleWinner(monster1, monster2),
    ).rejects.toThrow('API Error');
  });

  it('should handle HTTP error responses', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    const monster1 = monstersData.monsters[0];
    const monster2 = monstersData.monsters[1];

    await expect(
      MonsterServiceExtended.getBattleWinner(monster1, monster2),
    ).rejects.toThrow();
  });

  it('should send correct battle data format', async () => {
    const mockBattleResult = {
      winner: monstersData.monsters[4],
      tie: false,
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBattleResult,
    } as Response);

    const monster1 = monstersData.monsters[3];
    const monster2 = monstersData.monsters[4];

    await MonsterServiceExtended.getBattleWinner(monster1, monster2);

    const callArgs = (fetch as jest.MockedFunction<typeof fetch>).mock.calls[0];
    const requestBody = JSON.parse(callArgs[1]?.body as string);

    expect(requestBody.monster1).toEqual(monster1);
    expect(requestBody.monster2).toEqual(monster2);
    expect(requestBody.monster1).toHaveProperty('id');
    expect(requestBody.monster1).toHaveProperty('name');
    expect(requestBody.monster1).toHaveProperty('attack');
    expect(requestBody.monster1).toHaveProperty('defense');
    expect(requestBody.monster1).toHaveProperty('hp');
    expect(requestBody.monster1).toHaveProperty('speed');
  });

  it('should handle different monster combinations', async () => {
    const testCases = [
      {
        monster1: monstersData.monsters[0],
        monster2: monstersData.monsters[1],
      },
      {
        monster1: monstersData.monsters[2],
        monster2: monstersData.monsters[3],
      },
      {
        monster1: monstersData.monsters[4],
        monster2: monstersData.monsters[0],
      },
    ];

    for (const testCase of testCases) {
      const mockResult = {
        winner: testCase.monster1,
        tie: false,
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult,
      } as Response);

      const result = await MonsterServiceExtended.getBattleWinner(
        testCase.monster1,
        testCase.monster2,
      );

      expect(result.winner).toEqual(testCase.monster1);
    }
  });
});
