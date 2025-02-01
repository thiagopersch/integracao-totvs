'use client';

import * as S from '@/app/(administrative)/styles';
import withAuth from '@/app/withAuth';
import SQL from '../automations/sql/page';

const Administrative = () => {
  return (
    <S.Wrapper>
      <S.Title>Dashboard</S.Title>
      <SQL />
    </S.Wrapper>
  );
};

export default withAuth(Administrative);
