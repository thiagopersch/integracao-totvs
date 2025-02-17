'use client';

import CustomTabs from '@/components/Tabs/Tab';
import { Box } from '@mui/material';
import ReadViewPage from './_findAll/page';

const Workflow = () => {
  const tabs = [
    {
      label: 'Ler visão',
      content: <ReadViewPage />,
    },
  ];

  return (
    <Box className="min-h-full min-w-screen lg:m-4 lg:p-4 md:m-2 md:p-2">
      <CustomTabs tabs={tabs} />
    </Box>
  );
};
export default Workflow;
