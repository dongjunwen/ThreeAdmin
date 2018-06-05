import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'PayOrder',

  state: {
    pageData: PageHelper.create(),
    orderLists: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/payOrder') {
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'orderLists',
              url: '/admin/order',
            }
          });
        }
      });
    }
  },

  effects: {
  },

  reducers: {
  },
});