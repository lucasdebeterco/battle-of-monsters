
import { monstersReducer, initialState } from './monsters.reducer.extended';
import { fetchMonstersData, selectMonster, startBattle } from './monsters.actions.extended';
import monstersData from '../../../data/monsters.json';

describe('Monsters Reducer', () => {
  it('should return the initial state', () => {
    expect(monstersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should change the battle on action fulfilled', () => {
    const battleResult = {
      winner: monstersData.monsters[0],
      tie: false
    };

    const action = {
      type: startBattle.fulfilled.type,
      payload: battleResult
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.battles).toHaveLength(1);
    expect(newState.battles[0]).toEqual(battleResult);
    expect(newState.winner).toEqual(battleResult);
  });

  it('should add the random monster to the state', () => {
    const selectedMonster = monstersData.monsters[1];
    
    const action = {
      type: selectMonster.type,
      payload: selectedMonster
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.selectedMonster).toEqual(selectedMonster);
  });

  it('should add the winner to the state', () => {
    const winner = monstersData.monsters[2];
    const battleResult = {
      winner: winner,
      tie: false
    };

    const action = {
      type: startBattle.fulfilled.type,
      payload: battleResult
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.winner).toEqual(battleResult);
    expect(newState.battles[0].winner).toEqual(winner);
  });

  it('should handle tie battles correctly', () => {
    const battleResult = {
      winner: monstersData.monsters[0],
      tie: true
    };

    const action = {
      type: startBattle.fulfilled.type,
      payload: battleResult
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.battles[0].tie).toBe(true);
    expect(newState.winner).toEqual(battleResult);
  });

  it('should load monsters data successfully', () => {
    const action = {
      type: fetchMonstersData.fulfilled.type,
      payload: monstersData.monsters
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.monsters).toEqual(monstersData.monsters);
    expect(newState.monsters).toHaveLength(5);
  });

  it('should handle loading state for fetch monsters', () => {
    const action = {
      type: fetchMonstersData.pending.type
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.loading).toBe(true);
  });

  it('should handle loading state for battle', () => {
    const action = {
      type: startBattle.pending.type
    };

    const newState = monstersReducer(initialState, action);

    expect(newState.loading).toBe(true);
  });

  it('should handle multiple battles in sequence', () => {
    let state = initialState;

    // First battle
    const firstBattle = {
      winner: monstersData.monsters[0],
      tie: false
    };

    const firstAction = {
      type: startBattle.fulfilled.type,
      payload: firstBattle
    };

    state = monstersReducer(state, firstAction);

    // Second battle
    const secondBattle = {
      winner: monstersData.monsters[1],
      tie: true
    };

    const secondAction = {
      type: startBattle.fulfilled.type,
      payload: secondBattle
    };

    state = monstersReducer(state, secondAction);

    expect(state.battles).toHaveLength(2);
    expect(state.battles[0]).toEqual(firstBattle);
    expect(state.battles[1]).toEqual(secondBattle);
    expect(state.winner).toEqual(secondBattle);
  });
});
