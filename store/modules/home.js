import request from "../../utils/request.js"
const state = {
	indexData:{},
	indexList:[],
}
const mutations = {
	SET_INDEXDATA(state,indexData){
		state.indexData = indexData
	},
	SET_INDEXLIST(state,indexList){
		state.indexList = indexList
	}
}
const actions = {
	async getIndexData({commit}){
		const result = await request('/getIndexData')
		commit('SET_INDEXDATA',result)
    },
	async getIndexList({commit}){
		const result = await request('/getIndexCateList')
        commit('SET_INDEXLIST',result)
	}
}
const getters = {
	navList(state){
		return (state.indexData.kingKongModule?state.indexData.kingKongModule:{}).kingKongList
	},
	iconList(state){
		return state.indexData.policyDescList || []
	},
	floorList(state){
		return state.indexData.categoryModule || []
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}