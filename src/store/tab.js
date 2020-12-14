export default {
    state: {
        menu: [],
        currentMenu: null,
        activeTab: '',
        tabsList: [
        ]
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name != 'mainbox') {
                state.currentMenu = val
                var result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
            } else {
                state.currentMenu = null
            }
        },
        closeTab(state, val) {
            var result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        changeTab(state,val){
              state.activeTab=val
        }
    },
    action: {

    }
}