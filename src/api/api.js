import axios from "axios"
import config from "../config/default.json"

function Myaxios(url,data,type) {
  if(type=="post"){
   return  axios.post(config.baseurl+url,data)
  }else if(type=="get"){

    return axios.get(config.baseurl+url,{params:data})
  }
}
//登录
export const login =data=> Myaxios('/user/login', data, 'post')

