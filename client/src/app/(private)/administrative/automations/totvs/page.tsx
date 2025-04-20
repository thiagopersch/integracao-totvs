'use client';

import ReadRecord from '@/app/(private)/administrative/automations/totvs/dataservers/read-record/page';
import ReadView from '@/app/(private)/administrative/automations/totvs/dataservers/read-view/page';
import SaveRecord from '@/app/(private)/administrative/automations/totvs/dataservers/save-record/page';
import ExecuteSentece from '@/app/(private)/administrative/automations/totvs/sentence/execute/page';
import CustomTabs from '@/components/Tabs/Tab';
import Wrapper from '@/components/Wrapper';
import GetSchemaPage from './dataservers/get-schema/page';

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
      label: 'Obter esquema',
      content: <GetSchemaPage />,
    },
    {
      label: 'Executar sentença',
      content: <ExecuteSentece />,
    },
  ];

  return (
    <Wrapper>
      <CustomTabs cols={5} tabs={tabs} />
    </Wrapper>
  );
};
export default SQL;
