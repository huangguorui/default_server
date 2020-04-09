export default function viewSetup(appStore) {
  appStore.addPage({
    name: '/ogin',
    path: '/login',
    component:()=>import('@/views/login/index'),
    hidden: true
  }).addView({
    path:'/',
    name:'index',
    component:()=>import('@/views/test/index'),
    meta:{ title:'测试', icon: 'dashboard'}
  }).addView({
    path:'/test-detail',
    name:'test-detail',
    component:()=>import('@/views/test-detail/view'),
    meta:{ title:'测试表单', icon: 'dashboard'}
  })
}
