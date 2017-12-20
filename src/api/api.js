import axios from "axios"
import config from "../config/default.json"
axios.defaults.withCredentials = true//设置cookie权限

function Myaxios(url,data,type) {
  if(type=="post"){
   return  axios.post(config.baseurl+url,data)
  }else if(type=="get"){

    return axios.get(config.baseurl+url,{params:data})
  }
}
//登录
export const login =data=> Myaxios('/admin/user/login', data, 'post')
//获取session信息
export const getUserInfo =data=> Myaxios('/admin/user/get_user_info',data, 'post')
//获取管理员列表
export const getUserList =data=> Myaxios('/admin/user/get_user_list',data, 'post')

//基础数据设置
//获取所有有支持币种
export const getAllCoin =data=> Myaxios('/pro/get_all_coin',data, 'get')
//获取单个币种的详情
export const getOneCoin=data=>Myaxios('/pro/get_one_coin',data, 'post')
//删除某个币种
export const deleteOneCoin =data=> Myaxios('/pro/delete_one_coin',data, 'post')
//修改某个币种
export const editOneCoin=data=> Myaxios('/pro/edit_one_coin',data, 'post')
//新增单个币种
export const addOneCoin=data=>Myaxios('/pro/add_one_coin',data, 'post')


//基础策略
//获取列表
export const getAllTactics=data=>Myaxios('/pro/get_all_tactics',data, 'post')
//获取某个单个币种策略
export const getOneTactics=data=>Myaxios('/pro/get_one_tactics',data, 'post')
//删除某个币种策略
export const deleteOneTactics=data=>Myaxios('/pro/delete_one_tactics',data, 'post')
//修改单个币种策略的详情
export const editOneTactics=data=>Myaxios('/pro/edit_one_tactics',data, 'post')
//新增单个币种策略
export const addOneTactics=data=>Myaxios('/pro/add_one_tactics',data, 'post')


//

