import {apiClient} from "src/services/api";

const state = {
  entries: null,
  pastHaircutsClient: null,
  currentEntryHaircut: null,
  currentHistoryHaircut: null,
  dateOfEntries: null,
  listRecordHistory: null,
};
const mutations = {
  SET_ENTRIES(state, entries) {
    state.entries = entries;
  },
  SET_HAIRCUTS_CLIENT(state, records) {
    state.pastHaircutsClient = records;
  },
  SET_CURRENT_ENTRY_HAIRCUT_CLIENT(state, entry) {
    state.currentEntryHaircut = entry;
  },
  SET_CURRENT_HISTORY_HAIRCUT_CLIENT(state, entry) {
    state.currentEntryHaircut = entry;
  },
  SET_DATE_OF_ENTRIES(state, dateOfEntries) {
    state.dateOfEntries = dateOfEntries;
  },
  SET_LIST_RECORD_HISTORY(state, listRecordHistory) {
    state.listRecordHistory = listRecordHistory
  },
  SET_LIST_RECORD_HISTORY_AFTER(state, listRecordHistoryAfter) {
    listRecordHistoryAfter.forEach(record => {
      state.listRecordHistory.after.push(record)
    })
  },
  SET_LIST_RECORD_HISTORY_BEFORE(state, listRecordHistoryBefore) {
    listRecordHistoryBefore.forEach(record => {
      state.listRecordHistory.before.unshift(record)
    })
  }
};
const actions = {
  async getEntries({commit, dispatch}) {
    try {
      const {data: {data}} = await apiClient.get('mobile-all-records-staff')
      commit('SET_ENTRIES', data)
    } catch (e) {

    }
  },
  async getEntry({commit, dispatch}, record_id) {
    try {
      const data = await apiClient.get(`/mobile-record-client/${record_id}`)
      /*commit('SET_ENTRIES', data)*/
    } catch (e) {

    }
  },
  async getPastHaircutsClient({commit, dispatch}, user_id) {
    try {
      const {data: {data}} = await apiClient.get(`/mobile-all-records-client/${user_id}`)
      commit('SET_HAIRCUTS_CLIENT', data)
      return data
    } catch (e) {

    }
  },
  async getCurrentEntryHaircut({commit, dispatch}, record_id) {
    try {
      const {data: {data}} = await apiClient.get(`/mobile-record-client/${record_id}`)
      commit('SET_CURRENT_ENTRY_HAIRCUT_CLIENT', data)
      return data
    } catch (e) {

    }
  },
  async getCurrentHistoryHaircut({commit, dispatch}, record_id) {
    try {
      const {data: {data}} = await apiClient.get(`/mobile-record-client/${record_id}`)
      commit('SET_CURRENT_HISTORY_HAIRCUT_CLIENT', data)
      return data
    } catch (e) {

    }
  },
  async setDataCurrentHaircut({commit, dispatch}, data) {
    try {
      const {record_id} = data
      const {formData} = data
      return await apiClient.post(`/mobile-record-client/${record_id}`, formData)
    } catch (e) {

    }
  },
  async getDateHaircut({commit, dispatch}, date) {
    try {
      const {data: {data}} = await apiClient.get(`/mobile-all-records-staff?date=${date}`)
      commit('SET_ENTRIES', data)
    } catch (e) {

    }
  },
  async getListRecordHistory({commit, dispatch}, data) {
    const {record_id} = data
    const {user_id} = data
    try {
      const {data: {data: data}} = await apiClient(`mobile-list-records-client/${record_id}?user_id=${user_id}`)
      console.log(data, 'SET_LIST_RECORD_HISTORY')
      commit('SET_LIST_RECORD_HISTORY', data)
    } catch (e) {

    }
  },
  async getListRecordHistoryBefore({commit, dispatch}, data) {
    const {record_id} = data
    const {user_id} = data
    const {length} = data
    try {
      const {data: {data: data}} = await apiClient(`mobile-next-records-client/${record_id}?user_id=${user_id}&skip=${length}&before=true`)
      console.log(data, 'getListRecordHistoryBefore')
      commit('SET_LIST_RECORD_HISTORY_BEFORE', data)
      return data
    } catch (e) {

    }
  },
  async getListRecordHistoryAfter({commit, dispatch}, data) {
    const {record_id} = data
    const {user_id} = data
    const {length} = data
    try {
      const {data: {data: data}} = await apiClient(`mobile-next-records-client/${record_id}?user_id=${user_id}&skip=${length}&after=true`)
      console.log(data, 'getListRecordHistoryAfter')
      commit('SET_LIST_RECORD_HISTORY_AFTER', data)
    } catch (e) {

    }
  },


};
const getters = {
  entries(state) {
    if (state.entries) {
      return state.entries;
    }
  },
  pastHaircutsClient(state) {
    if (state.pastHaircutsClient) {
      return state.pastHaircutsClient
    }
  },
  currentEntryHaircut(state) {
    if (state.currentEntryHaircut) {
      return state.currentEntryHaircut
    }
  },
  dateOfEntries(state) {
    return state.dateOfEntries
  },
  afterRecords(state) {
    if (state.listRecordHistory) {
      return state.listRecordHistory.after
    }
  },
  beforeRecords(state) {
    if (state.listRecordHistory) {
      return state.listRecordHistory.before
    }
  },
  activeRecords(state) {
    if (state.listRecordHistory) {
      return state.listRecordHistory.active
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
