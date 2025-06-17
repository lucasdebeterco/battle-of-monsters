import monstersData from '../../../data/monsters.json';
import { fetchBattle, fetchRandomMonster } from './monsters.actions';
import monsterReducer, { MonstersState, initialState } from './monsters.reducer';

describe('Monsters Reducer', () => {
  it('should change the battle on action fulfilled', () => {
    const mockBattle = { winner: { name: 'Monster A' }, battle: { monster1: { name: 'Monster A' }, monster2: { name: 'Monster B' } } };
    const action = {
      type: fetchBattle.fulfilled.type,
      payload: mockBattle,
    };
    const newState = monsterReducer(initialState, action);
    expect(newState.battle).toEqual(mockBattle);
  });

  it('should add the random monster to the state', () => {
    const mockMonster = monstersData[0];
    const action = {
      type: fetchRandomMonster.fulfilled.type,
      payload: mockMonster,
    };
    const newState: MonstersState = monsterReducer(initialState, action);
    expect(newState.selectedMonster).toEqual(mockMonster);
  });

  it('should add the winner to the state', () => {
    const mockWinner = { name: 'Monster A' };
    const action = {
      type: fetchBattle.fulfilled.type,
      payload: { winner: mockWinner, battle: {} },
    };
    const newState: MonstersState = monsterReducer(initialState, action);
    expect(newState.winner).toEqual(mockWinner);
  });
});
