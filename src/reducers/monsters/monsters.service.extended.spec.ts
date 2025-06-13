import { MonsterServiceExtended } from './monsters.service.extended';
import { API_URL } from '../../constants/env';
import fetchMock from 'fetch-mock';

const mockWinner = {
  winner: {
    id: 'monster-1',
    name: 'Monster 1',
    hp: 100,
    attack: 50,
    defense: 30,
    speed: 40,
    type: 'Type A',
    imageUrl: 'image-a.png',
  },
};

describe('Monsters Service Extended', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should get the winner of the battle of monsters', async () => {
    fetchMock.post(`${API_URL}/battle`, { body: mockWinner });
    const winner = await MonsterServiceExtended.getWinner('monster-1', 'monster-2');
    expect(winner).toEqual(mockWinner.winner);
  });
});