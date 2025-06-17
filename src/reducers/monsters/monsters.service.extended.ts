import { API_URL } from '../../constants/env';
import { Battle, Players } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';

const battle = async (players: Players): Promise<Battle> => {
  const response = await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(players),
  });
  return response.json();
};

const getBattleWinner = async (
  monster1: Monster,
  monster2: Monster,
): Promise<Battle> => {
  const response = await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      monster1,
      monster2,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const MonsterServiceExtended = {
  battle,
  getBattleWinner,
};
