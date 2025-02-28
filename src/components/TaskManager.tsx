import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
}

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[];
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL, { 
        withCredentials: true 
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch tasks');
    }
  };

  const handleCreate = async (values: any) => {
    try {
      await axios.post(API_BASE_URL, values, { 
        withCredentials: true 
      });
      message.success('Task created successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchTasks();
    } catch (error) {
      console.error('Create error:', error);
      message.error('Failed to create task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, { 
        withCredentials: true 
      });
      message.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Failed to delete task');
    }
  };

  const handleExecute = async (id: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${id}/execute`, {}, { 
        withCredentials: true 
      });
      if (response.data) {
        message.success('Task executed successfully');
        if (response.data.output) {
          message.info(`Output: ${response.data.output}`);
        }
        fetchTasks();
      } else {
        message.error('No response from server');
      }
    } catch (error: any) {
      console.error('Execution error:', error);
      message.error(error.response?.data?.message || 'Failed to execute task');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Command', dataIndex: 'command', key: 'command' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Task) => (
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => handleExecute(record.id)}
          >
            Execute
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        Create New Task
      </Button>

      <Table columns={columns} dataSource={tasks} rowKey="id" />

      <Modal
        title="Create New Task"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="name"
            label="Task Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="owner"
            label="Owner"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="command"
            label="Command"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManager; 