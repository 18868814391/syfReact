import request from './request.js'
export function _noteList(params) { return request({ url: '/apis/syf/php/upload/BlogList.php', method: 'post', data: params }) }//note列表
export function _noteDetail(params) { return request({ url: '/apis/syf/php/upload/BlogDetail.php', method: 'post', data: params }) }//node详情
export function _noteSearch(params) { return request({ url: '/apis/syf/php/yii/web/index.php?r=blog/search', method: 'post', data: params }) }//搜索note
export function _noteTabs(params) { return request({ url: '/apis/syf/php/yii/web/index.php?r=blog/tabs', method: 'post', data: params }) }//搜索note.tabs
export function _Login(params) { return request({ url: '/apis/syf/php/yii/web/index.php?r=user/login', method: 'post', data: params }) }//登录
export function _Register(params) { return request({ url: '/apis/syf/php/yii/web/index.php?r=user/register', method: 'post', data: params }) }//注册