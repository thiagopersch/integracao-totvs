'use client';

import CustomTabs from '@/components/Tabs/Tab';
import { Box } from '@mui/material';
import ReadViewPage from './findAll/page';

const Workflow = () => {
  const tabs = [
    {
      label: 'Ler visão',
      content: <ReadViewPage />,
    },
  ];

  return (
    <Box className="bg-white min-h-full min-w-screen m-10 md:m-2">
      <CustomTabs tabs={tabs} />
    </Box>
  );
};
export default Workflow;
