/**
 * @author  lijiancheng | lijiancheng@17guagua.com
 * @version 1.0 | 2015/10/12
 * @js作用说明  设置文件  CGI为后台接口;  Event_Type 为广播和订阅事件的通用事件名称, 如果新加事件请自行添加; Event_Code 为服务器推送消息的ID或者PID 可根据消息ID或者PID自行添加;
 * @param 参数说明
 * @example  使用示例
 */

exports.config = {
    CGI: { // 接口地址
    	
    	anchorTaskLevels : 'http://hot.active.qxiu.com/commontask/anchor/anchorTaskLevels',
		anchorTaskList : 'http://hot.active.qxiu.com/commontask/anchor/taskList',
		showPassLog : 'http://hot.active.qxiu.com/commontask/anchoraward/showPassLog',
		passLog : 'http://hot.active.qxiu.com/commontask/anchoraward/passLog',
		getUserNick : 'http://cgi.qxiu.com/agent/nio/user/get',
		
		
		
		userTaskList : 'http://hot.active.qxiu.com/commontask/user/taskList',
		stageaward : 'http://hot.active.qxiu.com/commontask/user/stageaward',
		cangetaward : 'http://hot.active.qxiu.com/commontask/user/cangetaward',
		usercurrentscore : 'http://hot.active.qxiu.com/commontask/user/usercurrentscore',
		userGetAward : 'http://hot.active.qxiu.com/commontask/user/award',//用户领取任务奖励
		usergetscore : 'http://hot.active.qxiu.com/commontask/user/usergetscore'
    },
    WebSiteConfig: {
        ver: '1.0.0'
    }

};