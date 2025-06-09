import React from 'react';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard.extended';
import { MonstersList } from '../../components/monsters-list/MonstersList.extended';
import { Title } from '../../components/title/Title';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay.extended';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import { fetchBattleWins, setRandomMonster, setWinner } from '../../reducers/monsters/monsters.actions.extended';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import { monsterWins, selectRandomMonster, getRandomMonster } from '../../reducers/monsters/monsters.selectors.extended';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.extended.styled';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const computerMonster = useSelector(selectRandomMonster);
  const winner = useSelector(monsterWins);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  useEffect(() => {
    if (selectedMonster) {
      const randomMonster = getRandomMonster(monsters, selectedMonster);
      dispatch(setRandomMonster(randomMonster));
    } else {
      dispatch(setRandomMonster(null));
      dispatch(setWinner(null));
    }
  }, [selectedMonster, monsters, dispatch]);

  const handleStartBattleClick = () => {
    if (selectedMonster && computerMonster) {
      dispatch(
        fetchBattleWins({
          monster1Id: selectedMonster.id,
          monster2Id: computerMonster.id,
        }),
      );
    }
  };

  const getWinnerText = () => {
    if (!winner) return '';
    if (winner.tie) return "It's a tie";
    return winner.winner?.name || '';
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner && (
        <WinnerDisplay text={getWinnerText()} />
      )}

      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title={selectedMonster?.name || 'Player'}
        />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={!selectedMonster || !computerMonster}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          monster={computerMonster}
          title={computerMonster?.name || 'Computer'}
        />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };