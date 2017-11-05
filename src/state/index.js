import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showGroups: false,
    groupieObj: [],
    nameList: [],
    stateOutput: false,
    activeGroupie: {},
    pickedNames: []
  },
  mutations: {
    setGroupieObj(state, data){
      this.state.groupieObj = data;
    },
    removeGroup(state, index){
      let arr = this.state.groupieObj;
      arr.splice(index, 1);
      localStorage.setItem('groupie', JSON.stringify(arr));
    },
    pickName(state){
      let activeGroupie = this.state.activeGroupie;
      let firstName = activeGroupie.nameList.shift();
      this.state.pickedNames.push(firstName);
      this.state.activeGroupie = activeGroupie;
    },
    cleanPickedNames(state){
      this.state.pickedNames = [];
    },
    updateGroupieObj(state, data){
      let arr = this.state.groupieObj;
      arr.push(data);
      localStorage.setItem('groupie', JSON.stringify(arr));
    },
    updateNameList(state, arr){
      let newArr = arr.split(`\n`);
      this.state.nameList = newArr;
    },
    toggleShowGroups(state){
      this.state.showGroups = !this.state.showGroups;
    },
    toggleState(state){
      this.state.stateOutput = !this.state.stateOutput;
    },
    setActiveGroupie(state, obj){
      this.state.activeGroupie = obj;
    }
  }
});