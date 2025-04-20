'use client';

import CustomTabs from '@/components/Tabs/Tab';
import Wrapper from '@/components/Wrapper';
import ReadViewPage from './_findAll/page';

const Workflow = () => {
  const tabs = [
    {
      label: 'Ler visão',
      content: <ReadViewPage />,
    },
  ];

  return (
    <Wrapper>
      <CustomTabs tabs={tabs} />
    </Wrapper>
  );
};
export default Workflow;
