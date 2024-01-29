import * as dd from 'dingtalk-jsapi';

const checkEnv = () => {
  return new Promise((resolve, reject) => {
    if (dd.env.platform === 'notInDingTalk') {
      reject('不在钉钉环境');
    } else {
      resolve();
    }
  });
};

export default checkEnv;
