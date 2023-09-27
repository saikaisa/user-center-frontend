import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import styles from './Welcome.less';
const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'成功登录用户管理中心！'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          欢迎使用，
          <a href="https://saikaisa.top/notes/588/" rel="noopener noreferrer" target="__blank">
            点击查看项目文档
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
export default Welcome;
