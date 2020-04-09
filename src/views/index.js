export default function viewSetup(appStore) {
  appStore.addPage({
    name: '/ogin',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }).addView({
    path:'/',
    name:'index',
    component:()=>import('@/views/test/index'),
    meta:{ title:'测试', icon: 'dashboard'}
  })
}
