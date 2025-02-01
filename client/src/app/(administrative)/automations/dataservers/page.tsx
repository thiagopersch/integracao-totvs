'use client';

import GetSchemaPage from '@/app/(administrative)/automations/dataservers/get-schema/page';
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
    <Box className="min-h-full min-w-screen lg:m-4 lg:p-4 md:m-2 md:p-2">
      <CustomTabs tabs={tabs} />
    </Box>
  );
};

export default Dataservers;
