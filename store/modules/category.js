import request from "../../utils/request.js"
const state = {
	categoryList:[]
}
const mutations = {
	SET_CATEGORYLIST(state,categoryList){
		state.categoryList = categoryList
	}
}
const actions = {
	async getCategoryList({commit}){
		const result = await request('/getCateGoryData')
		console.log(result)
		commit('SET_CATEGORYLIST',result)
	}
}
const getters = {

}
export default {
	state,
	mutations,
	actions,
	getters
}