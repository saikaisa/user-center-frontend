import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import { SYSTEM_LOGO, SAIKAI_SITE } from '@/constants';

const Register: React.FC = () => {
  // 下面一行是初始化 type 参数
  const [type, setType] = useState<string>('account');
  // handleSubmit：表单提交
  // values: API.LoginParams 限定了其接受的参数必须是 RegisterParams 类型，限定类型是 ts 语法特性
  const handleSubmit = async (values: API.RegisterParams) => {
    // 先从 values 中取出三个待校验的参数
    const { userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      /** ！！！对请求过程收发参数的解释 ！！！
       * value: 被限定为 RegisterParams 类型，只接收该类型中的属性。
       * register() 方法用了一个泛型 return request<API.RegisterResult>(...) ，
       * 表示向后端的 request 请求返回的类型应该与前端定义的 RegisterResult 类型匹配
       */
      // 这里返回参数可以从后端 Service 类的 userRegister 方法中看到，返回的是新用户 id
      const id = await register(values);
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 history.location 参数所在的位置
         * history：用户登录前访问的页面历史。
         * 用户在浏览页面时可能被登录拦截跳转到注册页面了，所以注册完之后需要让他跳转回去（增强用户体验）
         * */
        if (!history) return;
        const { query } = history.location;
        // query 即为 history.location，用 history.push 方法将重定向地址 query 与 pathname 拼接
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      } else {
        // id <= 0 时抛出异常，然后被下面的 catch 捕获到
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          // 将按钮显示的"登录"改为"注册"
          /** 找源码步骤：
           * 1. 点开 loginForm ，定位源码位置
           * 2. 找源码文件，在源码里搜索"登录"，找到它在 submitText 属性里
           * 3. 在这里通过 submitter 的 searchConfig 修改 submitText
           */
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="用户管理中心"
          subTitle={
            <a href={SAIKAI_SITE} target="_blank" rel="noreferrer">
              ovO 组的用户中心是本次课设最具影响力的 Web 设计样例
            </a>
          }
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          ></div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
