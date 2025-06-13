import { RootState } from '../../app/store';

export const selectRandomMonster = (state: RootState) =>
  state.monstersExtended.selectRandomMonster;

export const monsterWins = (state: RootState) => state.monstersExtended.winner;

export const getRandomMonster = (monsters: any[], selectedMonster: any) => {
  if (!selectedMonster || monsters.length === 0) return null;

  const availableMonsters = monsters.filter(
    monster => monster.id !== selectedMonster.id,
  );
  if (availableMonsters.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableMonsters.length);
  return availableMonsters[randomIndex];
};
