/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({url, msg = '接口异常', headers}) =>

     new Promise(function(resolve, reject){
        axios.get(url, headers).then(res => {
            console.log(res)
            resolve(res)
        }).catch(err => {
            if(err.response) {
                if(err.response.status===404){
                    window.location.href='#/login'
                }
            }else if(err.request) {
                console.log(err.request);
            }else{
                console.log('err', err.message);
            }
            message.warn(msg);
            reject(err)
        })
    })

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, data, msg = '接口异常', headers}) =>
    axios.post(url, data, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });
