import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Battle, Players } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';
import { MonsterServiceExtended } from './monsters.service.extended';

export const fetchBattleWins = createAsyncThunk<Battle, Players>(
  'monsters/fetchBattleWins',
  MonsterServiceExtended.battle,
);

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  async () => {
    // Mock implementation for testing
    const response = await fetch('/data/monsters.json');
    return response.json();
  }
);

export const startBattle = createAsyncThunk<Battle, { monster1: Monster; monster2: Monster }>(
  'monsters/startBattle',
  async ({ monster1, monster2 }) => {
    return MonsterServiceExtended.getBattleWinner(monster1, monster2);
  }
);

export const setRandomMonster = createAction<Monster | null>(
  'monsters/setRandomMonster',
);

export const selectMonster = createAction<Monster>(
  'monsters/selectMonster',
);

export const setWinner = createAction<Battle | null>('monsters/setWinner');
