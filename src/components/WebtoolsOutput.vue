<template>
     <div class="container">
        <wtmenu/>
        <section id="output">
            <article class="left">
                
            </article>
            <article class="main">
                <h1 id="active-name" :class="{ spin: spin}">
                    <section class="slider">
                        <span class="name" v-for="name in activeGroupie.nameList" :key="name">{{ name }}</span>
                    </section>
                </h1>
                    <a v-if="activeGroupie.nameList.length > 0" class="big-btn" @click="getName">{{ btnText }}</a>
                    <a v-if="activeGroupie.nameList.length < 1" class="big-btn" @click="resetNames">Restart namn</a>
                    <p v-if="activeGroupie.nameList.length > 0" class="names-left">{{ activeGroupie.nameList.length }} namn kvar</p>
            </article>
            <article class="right">
                <ul class="picked-names">
                    <li v-for="name in pickedNames" :key="name">{{name}}</li>
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
            spin: false,
            btnText: `Slump me a namn`
        }
    },
    methods:{
        resetNames(){

        },
        getName(){
            this.$store.commit(`pickName`);

            this.spin = true;

            let el = document.querySelector(`.slider`);
            let timing = el.childElementCount*50;

            el.style.animationDuration = `${timing}ms`;
            
            setTimeout(() => {
                
                this.spin = false;
            },timing);
        
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

.container {
    width: 100vw;
    height: 100vh;
    position: absolute;
}


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
    font-size: 1.8rem;
    margin: 0;
    height: 3rem;
    width: 100%;
    text-align: center;
    overflow: hidden;
}

#active-name .slider span {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

}

.spin .slider {
    animation-name: spin;
    animation-timing-function: linear;
}

@keyframes spin {
    from { transform: translate3d(0,0,0);  }
      to { transform: translate3d(0,-100%,0);  }
}

#next-name {
    font-size: 1.2rem;
    font-weight: 300;
    color: rgba(0,0,0,.4);

}

.names-left {
    color: rgba(0,0,0,.4);
    font-style: italic;
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

.big-btn {
    display: block;
    margin: 4rem 0 0 0;
    padding: 1rem 2rem;
    border: 1px solid rgba(0,0,0,.4);
    color: rgba(0,0,0,.4);
    font-size: 1.2rem;
    border-radius: 3px;
}

.big-btn:hover {
    cursor: pointer;
    background: rgba(0,0,0,.4);
    color: white;
}

.big-btn:active {
    cursor: pointer;
    background: rgba(0,0,0,.8);
}

</style>
