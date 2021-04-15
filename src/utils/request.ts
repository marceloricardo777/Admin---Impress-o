/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'Sucesso!',
  201: 'Sucesso!',
  202: 'Sucesso!',
  204: 'Sucesso!',
  400: 'Algo deu errado!',
  401: 'Algo deu errado!',
  403: 'Algo deu errado!',
  404: 'Algo deu errado!',
  406: 'Algo deu errado!',
  410: 'Algo deu errado!',
  422: 'Algo deu errado!',
  500: 'Erro no servidor!',
  502: 'Erro no servidor!',
  503: 'Erro no servidor!',
  504: 'Erro no servidor!',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
});

export default request;
