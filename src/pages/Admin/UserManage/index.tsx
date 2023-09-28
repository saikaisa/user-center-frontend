import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { deleteUsers, searchUsers } from '@/services/ant-design-pro/api';
import { Image, message, Modal } from 'antd';
import { zip } from 'lodash';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

// @ts-ignore
export default () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 用于保存待删除的记录 ID
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteUsers(id);
      message.success('删除成功');
      return true;
    } catch (error) {
      message.error('删除失败');
      return false;
    }
  };

  const handleConfirmDelete = async (id: number) => {
    setIsModalVisible(true);
    setDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteId) {
      setIsModalVisible(false);
      const success = await handleDelete(deleteId);
      if (success) {
        actionRef.current.reload();
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteId(null);
  };

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
    },
    {
      title: '用户账户',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (_, record) => (
        <div>
          <Image src={record.avatarUrl} height={50} />
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: {
          text: '男',
        },
        1: {
          text: '女',
        },
      },
    },
    {
      title: '电话',
      dataIndex: 'phone',
      copyable: true,
    },
    {
      title: '邮件',
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: '邀请码',
      dataIndex: 'invitationCode',
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueEnum: {
        0: {
          text: '正常',
          status: 'Success',
        },
        1: {
          text: '封禁',
          status: 'Error',
        },
      },
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueEnum: {
        0: {
          text: '普通用户',
          status: 'Default',
        },
        1: {
          text: '管理员',
          status: 'processing' /** processing 只是表示蓝色图标 */,
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <div>
          <a key="delete" onClick={() => handleConfirmDelete(record.id)}>
            删除
          </a>

          <Modal
            title="确认删除"
            visible={isModalVisible}
            onOk={handleDeleteConfirmed}
            onCancel={handleCancel}
          >
            <p>确定要删除吗？</p>
          </Modal>
        </div>,
      ],
    },
  ];

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
