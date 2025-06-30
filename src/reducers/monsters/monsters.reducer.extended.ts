import { createReducer } from '@reduxjs/toolkit';
import { Battle } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  fetchBattleWins,
  fetchMonstersData,
  selectMonster,
  setRandomMonster,
  setWinner,
  startBattle,
} from './monsters.actions.extended';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  battles: Battle[];
  winner: Battle | null;
  loading: boolean;
}

export const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  battles: [],
  winner: null,
  loading: false,
};

export const monstersReducer = createReducer(initialState, builder => {
  builder
    .addCase(setRandomMonster, (state, action) => {
      state.selectedMonster = action.payload;
    })
    .addCase(setWinner, (state, action) => {
      if (action.payload) {
        state.battles.push(action.payload);
        state.winner = action.payload;
      }
    })
    .addCase(fetchBattleWins.pending, state => {
      state.loading = true;
    })
    .addCase(fetchBattleWins.fulfilled, (state, action) => {
      state.loading = false;
      state.battles.push(action.payload);
      state.winner = action.payload;
    })
    .addCase(selectMonster, (state, action) => {
      state.selectedMonster = action.payload;
    })
    .addCase(startBattle.fulfilled, (state, action) => {
      state.loading = false;
      state.battles.push(action.payload);
      state.winner = action.payload;
    })
    .addCase(startBattle.pending, state => {
      state.loading = true;
    })
    .addCase(fetchMonstersData.fulfilled, (state, action) => {
      state.monsters = action.payload;
      state.loading = false;
    })
    .addCase(fetchMonstersData.pending, state => {
      state.loading = true;
    });
});

export const monstersReducerExtended = monstersReducer;
