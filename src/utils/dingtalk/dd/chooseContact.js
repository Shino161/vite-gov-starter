import * as dd from 'dingtalk-jsapi';
import { openAuthMiniApp } from 'dingtalk-design-libs/biz/openAuthMiniApp';
const chooseContact = ({
  clientId,
  prompt = console.log,
}) => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      openAuthMiniApp({
        panelHeight: 'percent75',
        path: 'pages/home/home', //不要改,这里是小程序dingwlanwvdmrtjjwdmd下的一个页面地址
        extraData: {
          clientId, // 应用ID(唯一标识)
          rpcScope: 'Contact.User.Read',
          fieldScope: 'Contact.User.mobile',
          type: 0,
          ext: JSON.stringify({}),
          from: ''
        }
      }).then((res) => {
        // 处理返回数据
        if (res.result) {
          resolve(res);
        } else {
          prompt('统一授权套件调用失败');
        }
      })
    })
  })
}

export default chooseContact;
