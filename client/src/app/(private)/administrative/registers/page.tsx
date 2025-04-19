import CustomTabs from '@/components/Tabs/Tab';
import Wrapper from '@/components/Wrapper';
import Client from './client/page';
import TBCPage from './tbc/page';
import Users from './users/page';

const RegistersPage = () => {
  const tabs = [
    {
      label: 'Clientes',
      content: <Client />,
    },
    {
      label: 'TBC',
      content: <TBCPage />,
    },
    {
      label: 'Usuários',
      content: <Users />,
    },
  ];
  return (
    <Wrapper>
      <CustomTabs tabs={tabs} />
    </Wrapper>
  );
};
export default RegistersPage;
