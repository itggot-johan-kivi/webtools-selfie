<template>
    <div class="container">
    <wtmenu/>
    <section id="input">
        <div class="group-length"><b>{{ nameListLength }}</b> namn i listan</div>
        <textarea id="name-list" v-model="updateList" @change="validateList"></textarea>
        <div class="group-name" @click="excludeName = !excludeName">
            <div id="input-group-name" :class="{ selected: excludeName }"></div>
            <h3>Exkludera draget namn</h3>
        </div>
        <div class="group-leader" @click="showPicked = !showPicked">
            <div id="input-group-leader" :class="{ selected: showPicked }"></div>
            <h3>Visa dragna namn</h3>
        </div> 
        <a href="#" @click="go" id="create-groups">Slump me some namn</a>
    </section>
    </div>
</template>

<script>

import wtmenu from '@/components/Menu';

export default {
    name: 'wt-input',
    components: {
        wtmenu
    },
    data() {
        return {
            excludeName: true,
            showPicked: true
            }
    },
    methods: {
        go(){

            let data = {
                excludeName: this.excludeName,
                showPicked: this.showPicked,
                nameList: this.$store.state.nameList
            }

            shuffle(data.nameList);

            this.$store.commit('toggleState');
            this.$store.commit('setActiveGroupie', data);
            this.$router.push({name: 'wt-output'});
            
        },
        validateList(){
            let list = this.$store.state.nameList;
            let arr = list.filter(entry => entry.trim() != '');
            let newList = arr.join(`\n`);
            this.$store.commit("updateNameList", newList);
        }
    },
    computed: {
        updateList: {
            get: function () {
                let list = this.$store.state.nameList;
                let newList = list.join(`\n`);
                return newList;
            },
            set: function (newValue) {
                this.$store.commit("updateNameList", newValue)
            }
        },
        nameListLength(){
            return this.$store.state.nameList.length;
        }
    }
}

// Fisher Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

</script>

<style scoped>

.container {
    width:100vw;
    height: 100vh;
    display:flex;
}

#input {
    border-radius: 3px;
    width: 400px;
    box-sizing: border-box;
    margin: auto;
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40px 360px 40px 40px 80px;
    grid-template-areas: 
    "group-length group-length"
    "name-list name-list"
    "group-name group-name"
    "group-leader group-leader"
    "create-groups create-groups" !important;
}

#input .group-length {
        grid-area: group-length;
        color: rgba(0,0,0,.4);
        padding: 1rem .5rem;
        font-size: .8rem;
}

#name-list {
    grid-area: name-list;
    border: none;
    resize: none;
    padding: 0 1rem;
    box-sizing: border-box;
    font-size: .8rem;
    line-height: 30px;
    height: 360px;
    background: #fff url('/static/row.png');
    background-attachment: local;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}


#input h3 {
    margin: 0;
    padding: 0;
}

#input .group-name {
    grid-area: group-name;
    background: rgba(0,0,0,.1);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 0 0 1rem;
}

#input .group-leader {
    grid-area: group-leader;
    background: rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    padding: 0 0 0 1rem;
}

#input-group-name, #input-group-leader {
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: 3px;
    margin: 0 1rem 0 0;
}

#input-group-name.selected, #input-group-leader.selected {
    background: #222 url('/static/icon-close-white.svg') no-repeat;
    background-size: 100%;
}

#input #group-style-members {
    grid-area: group-style-members;
    background: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 500;
}

#input #group-style-groups {
    grid-area: group-style-groups;
    background: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 500;
}

#group-style-groups:hover, #group-style-members:hover, .group-leader:hover, .group-name:hover {
    cursor: pointer;
}

#group-style-members.selected, #group-style-groups.selected {
    background: rgb(80, 80, 80) !important;
    color: rgba(255,255,255,.8);
}

#group-style-members.selected:after, #group-style-groups.selected:after {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(0, 0, 0, 0);
	border-top-color: rgb(80, 80, 80);
	border-width: 6px;
	margin-left: -6px;
}


#input .group-scale {
    grid-area: scale;
    background: rgba(0,0,0,.4);
}

#input .group-scale #scale {
    list-style: none;
    display: flex;
    height: 40px;
    margin: 0 0.5rem;
    padding: 0;
}

#input .group-scale #scale li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
}

#input .group-scale #scale li span {
    display: block;
    width: 17px;
    padding: 2px;
    text-align: center;
    border-radius: 999rem;
}

#input .group-scale #scale li span:hover {
    background: rgba(255,255,255,.2);
    cursor: pointer;
}

#input .group-scale #scale li span.selected {
    background: #444;
    color: white;
}


#input #create-groups {
    grid-area: create-groups;
    background: rgba(0,0,0,.7);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    color: rgba(255,255,255,.9);
    text-decoration: none;
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

#input #create-groups:hover {
    background: rgba(0,0,0,.8);
}

#input #create-groups:active {
    background: rgba(0,0,0,1);
}


/* MOBILE */
@media screen and (max-width:650px) {

 #input {
    
 }

}

</style>
