'use client';

import ReadRecord from '@/app/(administrative)/automations/sql/read-record/page';
import ReadView from '@/app/(administrative)/automations/sql/read-view/page';
import SaveRecord from '@/app/(administrative)/automations/sql/save-record/page';
import ExecuteSentece from '@/app/(administrative)/automations/sql/sentence/execute/page';
import CustomTabs from '@/components/Tabs/Tab';
import { Box } from '@mui/material';

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
    <Box className="min-h-full min-w-screen lg:m-4 lg:p-4 md:m-2 md:p-2">
      <CustomTabs tabs={tabs} />
    </Box>
  );
};
export default SQL;
