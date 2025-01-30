'use client';

import * as S from '@/app/(administrative)/styles';
import withAuth from '@/app/withAuth';

const Administrative = () => {
  return (
    <S.Wrapper>
      <S.Title>Administrative</S.Title>
    </S.Wrapper>
  );
};

export default withAuth(Administrative);
