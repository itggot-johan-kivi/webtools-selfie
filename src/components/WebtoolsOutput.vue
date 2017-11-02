<template>
     <div class="container">
        <wtmenu/>
        <section id="output">
            <article class="left">
                {{ activeGroupie.nameList.length }} kvar
            </article>
            <article class="main">
                <h1 id="active-name">{{ activeGroupie.nameList[0] }}</h1>
                <h2 id="next-name">{{ activeGroupie.nameList[1] }}</h2>
                <button @click="getName">Select name</button>
            </article>
            <article class="right">
                <ul class="picked-names">
                    <li v-for="name in pickedNames">{{name}}</li>
                </ul>
            </article>
        </section>
    </div>
</template>

<script>

import wtmenu from '@/components/Menu';

export default {
    name: 'wt-output',
    components: {
        wtmenu
    },
    data(){
        return {
        }
    },
    methods:{
        getName(){
            this.$store.commit(`pickName`);
        }
    },
    computed: {
        activeGroupie(){
            let arr = this.$store.state.activeGroupie;
            return arr;
        },
        pickedNames(){
            let arr = this.$store.state.pickedNames;
            return arr;
        }
    }
};

</script>

<style>

#output {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.left {
flex: 1;
}

.main {
    flex:2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#active-name {
    font-size: 2rem;
    margin: 0;
}

#next-name {
    font-size: 1.2rem;
    font-weight: 300;
    color: rgba(0,0,0,.4);
}

.right {
    flex: 1;
    display: flex;
    padding: 1rem;
}

.picked-names {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    margin-top: auto;
}
.picked-names li {
    text-align: right;
    margin: 0 0 .25rem 0;
    color: rgba(0,0,0,.4);
    font-size: .7rem;
}

</style>
