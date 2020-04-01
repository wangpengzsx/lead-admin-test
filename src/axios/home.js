import {get} from "./tools";

export default {
    getNoGroupAppList: value =>get({url:`lead-admin-api/someQuery/getNoGroupAppList`}).then(res=>{

        let arr=[];
        for(let i=0;i<res.data.length;i++){
            res.data[i].APP_ID? arr.push({name:res.data[i].NAME,value:res.data[i].APP_ID}): arr.push({name:res.data[i].NAME,value:res.data[i].APP_GROUP_ID})
        }
        return {data:arr};
    })
}