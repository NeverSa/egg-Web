
//const NodeServer="http://192.168.199.11:3000/router/";//本机用于测试
const NodeServer = "https://m.imuzhuang.com/router/"; //线上用于发布
// const NodeServer = "https://mz.mmcai.cn/router/"; //线上用于发布

//活动
const NodeServerActivity = "https://mz.mmcai.cn/router/";
// const NodeServerActivity = "http://192.168.0.200:7001/router/";


var Interface = {
  //H5
  //订单详情
  GetInvestDetals: NodeServer + "mz_app_myinvest_detail",
  //获取短信临时onceToken
  getRegOnceToken: NodeServer + "mz_app_once_token",
  //获得短信验证码（注册）
  getRegCod: NodeServer + "mz_app_register_code_get",
  //校验短信验证码（注册）
  CheckMsgCode: NodeServer + "mz_app_sms_code_valid",
  //设置登录密码（注册）
  setLoginPassword: NodeServer + "mz_app_mobile_register",


  //活动

  // 获取邀请状态
  GetInviteData: NodeServerActivity + "topic_invite_get",
  // 获取邀请的二维码图片
  GetShareQrCode: NodeServerActivity + "mz_app_tools_qr_code",

  //新手活动获取礼包完成状态
  getTaskStatus: NodeServerActivity + "topic_task_status_get_yx",
  //新手活动提交礼包
  postTaskReward: NodeServerActivity + "topic_task_reward_get_yx",

};

export default Interface;
