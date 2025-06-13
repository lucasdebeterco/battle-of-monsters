import monstersData from '../../../data/monsters.json';
import {
  fetchMonsters,
  selectMonster,
  setBattleResult,
  setRandomMonster,
  setWinner,
} from './monsters.actions';
import monsterReducer, {
  initialState,
  MonsterState,
} from './monsters.reducer';

const monster1 = monstersData.monsters[0];
const monster2 = monstersData.monsters[1];

describe('Monsters Reducer', () => {
  let state: MonsterState;

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(monsterReducer(undefined, {
      type: undefined
    })).toEqual(initialState);
  });

  it('should handle fetchMonsters.fulfilled', () => {
    const nextState = monsterReducer(
      state,
      fetchMonsters.fulfilled(monstersData.monsters, 'requestId', undefined),
    );
    expect(nextState.monsters).toEqual(monstersData.monsters);
  });

  it('should handle selectMonster', () => {
    const nextState = monsterReducer(state, selectMonster(monster1));
    expect(nextState.selectedMonster).toEqual(monster1);
  });

  it('should change the battle on action fulfilled', () => {
    const nextState = monsterReducer(state, setBattleResult([monster1, monster2]));
    expect(nextState.battle).toEqual([monster1, monster2]);

  });

  it('should add the random monster to the state', () => {
    const nextState = monsterReducer(state, setRandomMonster(monster2));
    expect(nextState.randomMonster).toEqual(monster2);

  });

  it('should add the winner to the state', () => {
    const nextState = monsterReducer(state, setWinner(monster1.name));
    expect(nextState.winner).toEqual(monster1.name);
  });
});
