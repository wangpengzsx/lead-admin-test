/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';
import home from './home'

 const getBbcNews = () => get({ url: config.NEWS_BBC });

 const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

 const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

 const gitOauthLogin = () => get({ url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin` });
 const gitOauthToken = code => post({
    url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
    data: {
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
        redirect_uri: 'http://localhost:3006/',
        state: 'reactAdmin',
        code,
    }
});
 const postOauthlogin = values => post({
    url: `/lead-admin-api/auth/login`,
    data: {
        username: values.userName,
        password: values.password,
        captcha:''

    }
});
 const getNoGroupAppList=home.getNoGroupAppList
// {headers: {Accept: 'application/json'}}
 const gitOauthInfo = access_token => get({ url: `${config.GIT_USER}access_token=${access_token}` });



// easy-mock数据交互
// 管理员权限获取
 const admin1 = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
 const guest = () => get({ url: config.MOCK_AUTH_VISITOR });

export {
    getNoGroupAppList,getBbcNews,npmDependencies,weibo,gitOauthLogin,gitOauthToken,postOauthlogin,gitOauthInfo,admin1,guest
}
