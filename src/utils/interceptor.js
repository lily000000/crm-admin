import { Message } from 'element-ui';
import router from "../router/index";
export const reqHeader = {
  'Accept': '*/*',
  mode: 'cors',
  'Content-Type': 'application/json',
};

export function authBeforeRes(response) {
    switch (response.status) {
        case 200:
            return response;
        case 302:
             Message({
                message: '登录超时, 请重新登录！',
                type: 'warning'
             });
        case 401:
            router.push('/login');
        case 403:
            router.push('/login');
        default:
            if (process.env.NODE_ENV !== 'production') {
                console.error('Request error: ', response.code, response.message)
            }
            return response
    }
}

export function authAfterRes(response) {
    switch (response.result_code) {
        case 1:
            return response;
        case 0: // 无权限，需要登录
            //Api.logout() 这里需要重新登录处理
            return Promise.reject(response);
        default:
            if (response.message) {
                message.error(response.message, 5) // 异常消息默认显示5s
            }
            return response
    }
}
