import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'ovO 组出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'saikai',
          title: 'Saikai Home',
          href: 'https://saikaisa.top',
          blankTarget: true,
        },
        {
          key: 'github1',
          title: (
            <>
              <GithubOutlined /> Saikai Github
            </>
          ),
          href: 'https://github.com/saikaisa',
          blankTarget: true,
        },
        {
          key: 'github2',
          title: (
            <>
              <GithubOutlined /> SDQDX Github
            </>
          ),
          href: 'https://github.com/SDQDX',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
