'use client';

import * as S from '@/app/(private)/administrative/styles';
import SQL from '@/app/(private)/administrative/automations/sql/page';

export default function Administrative() {
  return (
    <S.Wrapper>
      <SQL />
    </S.Wrapper>
  );
}
