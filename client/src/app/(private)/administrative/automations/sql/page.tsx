'use client';

import ReadRecord from '@/app/(private)/administrative/automations/sql/read-record/page';
import ReadView from '@/app/(private)/administrative/automations/sql/read-view/page';
import SaveRecord from '@/app/(private)/administrative/automations/sql/save-record/page';
import ExecuteSentece from '@/app/(private)/administrative/automations/sql/sentence/execute/page';
import CustomTabs from '@/components/Tabs/Tab';

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

  return <CustomTabs tabs={tabs} />;
};
export default SQL;
