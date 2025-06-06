import { API_URL } from '../../constants/env';
import { Battle, Players } from '../../models/interfaces/battle.interface';

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

export const MonsterServiceExtended = {
  battle,
};