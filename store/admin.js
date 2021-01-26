// import axios from '@nuxtjs/axios'

export const state = () => ({
  reports: [],
  pageinateData: null,
  loading:true,
})

export const getters = {
  reports(state){
    return state.reports;
  },
  pageinateData(state){
    return state.pageinateData;
  },
  loading(state){
    return state.loading;
  }
}

export const mutations = {
  SET_REPORTS: (state, reports)=>{
    state.reports = reports
  },
  REMOVE_FROM_REPORTS: (state, report) => {
    state.reports = state.reports.filter(item => item.id !== report);
  },
  SET_PAGINATE_DATA: (state, pageinateData)=>{
    state.pageinateData = pageinateData
  },
  SET_LOADING: (state, loading)=>{
    state.loading = loading
  }
}

export const actions = {

}
