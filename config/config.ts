// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV, REACT_APP_HOST } = process.env;
export default defineConfig({
  define: {
    REACT_APP_HOST: REACT_APP_HOST || '',
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'pt-BR',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'Login',
              component: './User/login',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/User/register',
              component: './User/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            // {
            //   authority: ['admin'],
            //   path: '/usersadmin/all',
            //   icon: 'smile',
            //   name: 'Alunos',
            //   component: './TableList',
            // },
            {
              authority: ['admin'],
              path: '/users/',
              icon: 'smile',
              name: 'Alunos',
              component: './User/list',
            },
            {
              authority: ['admin'],
              path: '/print-card',
              icon: 'idcard',
              name: 'Impresão de carteira',
              component: './impressao/impressao_client',
            },
            // {
            //   path: '/solicitacoes/',
            //   icon: 'send',
            //   name: 'Solicitações',

            //   routes: [
            //     {
            //       name: 'Aguardando Pagamento',
            //       path: '/solicitacoes/aguardandopagamento',
            //       component: './profile/basicnotpayment',
            //     },
            //     {
            //       name: 'Aguardando Documentos',
            //       path: '/solicitacoes/nao-concluidas',
            //       component: './profile/basicnotcompleteupdate',
            //     },
            //     {
            //       name: 'Aguardando Conferencia',
            //       path: '/solicitacoes/solicitadas',
            //       component: './profile/basic',
            //     },
            //     {
            //       name: 'Recusadas',
            //       path: '/solicitacoes/recusadas',
            //       component: './profile/basicrecused',
            //     },
            //     {
            //       name: 'Corrigidas',
            //       path: '/solicitacoes/corrigidas',
            //       component: './profile/basicrevised',
            //     },
            //   ],
            // },

            // {
            //   path: '/carteira/',
            //   icon: 'idcard',
            //   name: 'Passe Estudantil',

            //   routes: [
            //     {
            //       name: 'Em Confecção',
            //       path: '/carteira/confeccao',
            //       component: './profile/carteira',
            //     },
            //     {
            //       name: 'Aguardando Retirada',
            //       path: '/carteira/pronta',
            //       component: './profile/carteira',
            //     },
            //     {
            //       name: 'Entregue',
            //       path: '/carteira/entregue',
            //       component: './profile/carteira',
            //     },
            //   ],
            // },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: false,
  proxy: proxy[REACT_APP_ENV || 'pre'],
  manifest: {
    basePath: '/',
  },
});
