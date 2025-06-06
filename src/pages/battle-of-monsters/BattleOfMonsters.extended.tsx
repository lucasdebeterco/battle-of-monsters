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
import { monsterWins, randomMonsters, selectRandomMonster } from '../../reducers/monsters/monsters.selectors.extended';
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
      const randomMonster = useSelector(randomMonsters);
      if (randomMonster) {
        dispatch(setRandomMonster(randomMonster));
      }
    } else {
      dispatch(setRandomMonster(null));
      dispatch(setWinner(null));
    }
  }, [selectedMonster]);

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

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner && (
        <WinnerDisplay text={winner.winner?.name || (winner.tie ? "It's a tie" : '')} />
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