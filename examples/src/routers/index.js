const routes = [
  { path: '/axios', component: () => import('../containers/axios'), extact: true },
  { path: '/fetch', component: () => import('../containers/fetch'), extact: true },
];

export default routes;
