import * as dd from 'dingtalk-jsapi';

const verificateJsApi = ({
  agentId,
  corpId,
  jsApiList,
  getTicket,
  prompt = console.log,
}) => {
  return new Promise((resolve, reject) => {
    getTicket({
      url: location.href,
      corpId
    })
      .then(res => {
        if (res && res.success) {
          console.log(res);
          const { data } = res;
          const ddConfig = {
            agentId: data.agentId, // 必填，微应用ID
            corpId, //必填，企业ID
            timeStamp: data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList, // 必填，需要使用的jsapi列表，注意：不要带dd
          };

          dd.config(ddConfig);

          dd.error(err => {
            prompt('钉钉鉴权失败。如需使用选人功能，请刷新页面重试');
            reject(err);
          });

          resolve(ddConfig);
        } else {
          reject({
            code: 'ticket_error',
            message: 'get ticket error',
          });
          prompt('获取签名失败。如需使用选人功能，请刷新页面重试');
        }
      })
      .catch(err => {
        reject(err);
        prompt('获取签名失败。如需使用选人功能，请刷新页面重试');
      });
  });
};

export default verificateJsApi;
