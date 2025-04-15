'use client';

import GetSchemaPage from '@/app/(private)/administrative/automations/dataservers/get-schema/page';
import CustomTabs from '@/components/Tabs/Tab';
import Wrapper from '@/components/Wrapper';

const Dataservers = () => {
  const tabs = [
    {
      label: 'Get Schema',
      content: <GetSchemaPage />,
    },
  ];

  return (
    <Wrapper>
      <CustomTabs tabs={tabs} />
    </Wrapper>
  );
};

export default Dataservers;
