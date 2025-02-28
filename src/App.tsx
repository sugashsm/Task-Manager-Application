import React from 'react';
import TaskManager from './components/TaskManager';
import { Layout, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={3} style={{ margin: '16px 0' }}>
          Task Manager
        </Title>
      </Header>
      <Content>
        <TaskManager />
      </Content>
    </Layout>
  );
};

export default App;