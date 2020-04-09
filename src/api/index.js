import qs from 'qs'

export default function ({Api, appStore}) {
    return {
        UserList(query){
            return Api({
                url: '/adminapi/user/user-list',
                method: 'get',
                params: query
            });
        },
        UserDel(query) {
            return Api({
                url: '/adminapi/user/user-del',
                method: 'post',
                params: query
            });
        },
        UserSave(query) {
            return Api({
                url: '/adminapi/user/user-save',
                method: 'post',
                params: query
            });
        },
        getDocumentarysList(query){
            return Api({
                url: '/adminapi/documentary/documentary-list',
                method: 'get',
                params: query
            });
        },
        postDocumentarySave(query) {
            return Api({
                url: '/adminapi/documentary/documentary-save',
                method: 'post',
                params: query
            });
        },
        postDocumentaryDel(query) {
            return Api({
                url: '/adminapi/documentary/documentary-del',
                method: 'post',
                params: query
            });
        },
        //管理员视角业绩概括列表
       getUserOrderList(query) {
            return Api({
                url: '/adminapi/userorder/user-order-list',
                method: 'get',
                params: query
            });
        },
        //excel列表
        getExcelList(query) {
            return Api({
                url: '/adminapi/excel/excel-list',
                method: 'get',
                params: query
            });
        },
        //excel删除 -1  删除导入excel记录但是保留订单表
        postExcelFalseDel(query) {
            return Api({
                url: '/adminapi/excel/excel-false-del',
                method: 'post',
                params: query
            });
        },
        //彻底删除excel表
        postExcelOrderDel(query) {
            return Api({
                url: '/adminapi/excel/excel-order-del',
                method: 'post',
                params: query
            });
        },
        //excel表格导出
        getExcelExport(query) {
            return Api({
                url: '/adminapi/excel/excel-export',
                method: 'get',
                params: query
            });
        },
        //excel导入
        OneSubjectImport(query) {
            return Api({
                url: '/adminapi/userorder/add-order',
                method: 'post',
                data: qs.stringify(query)
            });
        },
        //管理员登录
        getAdminLogin (query) {
            return Api({
                url: '/other/user/admin-login',
                method: 'get',
                params: query
            });
        },
        //用户登录
        getUserLogin(query) {
            return Api({
                url: '/other/user/user-login',
                method: 'get',
                params: query
            });
        },
        //用户登出
        getUserLoginOut(query){
            return Api({
                url: '/other/user/user-login-out',
                method: 'get',
                params: query
            });
        },
        //管理员用户退出
        getAdminLoginOut(query) {
            return Api({
                url: '/other/user/admin-login-out',
                method: 'get',
                params: query
            });
        },
        //下面为用户接口
        getUserDocumentarysList(query) {
            return Api({
                url: '/api/documentary/documentary-list',
                method: 'get',
                params: query
            });
        },
        //添加 and 编辑跟单记录
        postUserDocumentarySave(query) {
            return Api({
                url: '/api/documentary/documentary-save',
                method: 'post',
                params: query
            });
        },
        //用户视角
        getUserUserOrderList(query) {
            return Api({
                url: '/api/userorder/user-order-list',
                method: 'get',
                params: query
            });
        }
    }
}