/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import Dashboard from './dashboard/Dashboard';
import Tabs from './ui/Tabs';

import Icons from './ui/Icons';



const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loading: Loading,
});

export default {
    Icons,WysiwygBundle,Dashboard,Tabs

}