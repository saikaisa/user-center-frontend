export default [
  {
    path: '/user',
    layout: false,
    /** 这个是React Router组件，component即为src/pages文件夹里的组件，与path关联，path即为用户访问的地址
     *  访问path就会访问到其关联的组件component */
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    /** 下面是嵌套，表示 Admin 组件里可以再嵌套 routes 中的组件，
     * 在 Admin.tsx 中引入 children 可以将 routes 中的组件当作子页面显示 */
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理',
        icon: 'smile',
        component: './Admin/UserManage',
      },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
