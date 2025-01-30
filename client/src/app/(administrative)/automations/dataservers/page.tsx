'use client';

import GetSchemaPage from '@/app/administrative/automations/dataservers/get-schema/page';
import CustomTabs from '@/components/Tabs/Tab';
import { Box } from '@mui/material';

const Dataservers = () => {
  const tabs = [
    {
      label: 'Get Schema',
      content: <GetSchemaPage />,
    },
  ];

  return (
    <Box className="bg-white min-h-full min-w-screen m-10 md:m-2">
      <CustomTabs tabs={tabs} />
    </Box>
  );
};

export default Dataservers;
