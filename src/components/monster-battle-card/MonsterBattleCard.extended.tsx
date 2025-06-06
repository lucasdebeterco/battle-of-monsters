import React from 'react';

import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
} from './MonsterBattleCard.extended.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title }) => {
  return (
    <BattleMonsterCard centralized>
      <BattleMonsterTitle>{title!}</BattleMonsterTitle>
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
