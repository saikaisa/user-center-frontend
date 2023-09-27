import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 粉色
  primaryColor: '#FE88B5',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '用户管理中心',
  pwa: false,
  logo: 'https://pics.saikaisa.top/web/group.png',
  iconfontUrl: '',
};

export default Settings;
