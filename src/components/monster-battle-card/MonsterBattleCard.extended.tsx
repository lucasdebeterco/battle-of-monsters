import React from 'react';

import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  ProgressBar,
} from './MonsterBattleCard.extended.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  return (
    <BattleMonsterCard>
      <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      {monster && (
        <>
          <img
            src={monster.imageUrl}
            alt={monster.name}
            style={{ width: '283px', height: '178px', borderRadius: '7px' }}
          />
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>HP</span>
              <span>{monster.hp}</span>
            </div>
            <ProgressBar variant="determinate" value={monster.hp} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', marginTop: '15px' }}>
              <span>Attack</span>
              <span>{monster.attack}</span>
            </div>
            <ProgressBar variant="determinate" value={monster.attack} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', marginTop: '15px' }}>
              <span>Defense</span>
              <span>{monster.defense}</span>
            </div>
            <ProgressBar variant="determinate" value={monster.defense} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', marginTop: '15px' }}>
              <span>Speed</span>
              <span>{monster.speed}</span>
            </div>
            <ProgressBar variant="determinate" value={monster.speed} />
          </div>
        </>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };