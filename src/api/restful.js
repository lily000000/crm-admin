export default {
  //客户管理
  getUserData:{
    method:'get',
    url:'/mock/userData.json'
  },
  getNavData:{
    method:'get',
    url:'/mock/navData.json'
  },
  getHomeData:{
    method:'get',
    url:'/mock/homeData.json'
  },
  getCustomerTables:{
    method:'get',
    url:'/mock/customerTables.json',
   
  },
  getCustomer:{
    method:'get',
    url:'/crm/sys-dict-detail/list'
  },
  getTagData:{
    method:'get',
    url:'/mock/tagData.json'
  },
  /*----------------------登陆----------------------------------*/
  loginReq:{
    method:'post',
    url:'/crm/login/'
  },
  /*----------------------客户管理----------------------------------*/
  listByCodeReq:{ //获取字典
    method:'get',
    url:'/crm/sys-dict-detail/listByCodes'
  },
  treeListReq:{ //获取省市区
    method:'get',
    url:'/crm/sys-area/treeList'
  },
  saveCustomeReq:{  //保存系统角色
    method:'post',
    url:'/crm/parent/save'
  }
}
