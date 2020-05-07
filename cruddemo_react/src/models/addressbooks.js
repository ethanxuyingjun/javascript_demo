import * as addressBookService from '../services/addressbooks';

export default {
  namespace: 'addressbooks',
  state: {
    list: [],
  },

  reducers: {
    add(state, { payload }) {
      const list = state.list.concat([]);
      list.sort((a, b) => a.id - b.id);
      const newId = list[list.length-1].id + 1;
      list.push({
        id: newId
      });
       return { ...state, list };
    },

    update(state, { payload: {id, values} }) {
       const list = state.list.concat([]);
       const found = list.find(item => item.id === id)
       const index = list.indexOf(found);
       values.id = id;
       list.splice(index, 1, values);
       return { ...state, list };
    },

    remove(state, { payload: selectKeys }) {
      const list = state.list.concat([]);
      selectKeys.forEach(key => {
            let found = list.find(item => item.id === key)
            if (found) {
              list.splice(list.indexOf(found), 1);
            }
      });
      return { ...state, list};
    },

    save(state, { payload: { data: list } }) {
      return { ...state, list};
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(addressBookService.fetch);
      yield put({ type: 'save', payload: { data, }, });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch', payload: {query}});
        }
      });
    },
  },
};