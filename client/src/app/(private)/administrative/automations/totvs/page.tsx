'use client';

import ReadRecord from '@/app/(private)/administrative/automations/totvs/read-record/page';
import ReadView from '@/app/(private)/administrative/automations/totvs/read-view/page';
import SaveRecord from '@/app/(private)/administrative/automations/totvs/save-record/page';
import ExecuteSentece from '@/app/(private)/administrative/automations/totvs/sentence/execute/page';
import CustomTabs from '@/components/Tabs/Tab';
import Wrapper from '@/components/Wrapper';

const SQL = () => {
  const tabs = [
    {
      label: 'Ler visão',
      content: <ReadView />,
    },
    {
      label: 'Ler registro',
      content: <ReadRecord />,
    },
    {
      label: 'Salvar registro',
      content: <SaveRecord />,
    },
    {
      label: 'Executar sentença',
      content: <ExecuteSentece />,
    },
  ];

  return (
    <Wrapper>
      <CustomTabs tabs={tabs} />
    </Wrapper>
  );
};
export default SQL;
