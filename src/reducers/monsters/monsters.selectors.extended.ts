import { RootState } from '../../app/store';

export const selectRandomMonster = (state: RootState) => 
  state.monstersExtended.selectRandomMonster;

export const monsterWins = (state: RootState) => 
  state.monstersExtended.winner;

export const randomMonsters = (state: RootState) => {
  const monsters = state.monsters.monsters;
  const selectedMonster = state.monsters.selectedMonster;
  if (!selectedMonster || monsters.length === 0) return null;
  
  const availableMonsters = monsters.filter(monster => monster.id !== selectedMonster.id);
  const randomIndex = Math.floor(Math.random() * availableMonsters.length);
  return availableMonsters[randomIndex];
};