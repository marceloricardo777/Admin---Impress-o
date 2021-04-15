import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: '',
  pwa: false,
  menu: {
    locale: true,
  },
  headerHeight: 48,
  splitMenus: false,
  // iconfontUrl: 'http://transmobibeneficios.com.br/estudante/assets/images/logo.svg',
};

export type { DefaultSettings };

export default proSettings;
