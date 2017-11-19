<template>
    <aside id="overlay">
        <section id="remote">
            <header>
                <img src="/static/icon-close.svg" id="close" @click="closeModal">
                <img src="/static/icon-remote.svg" id="icon" alt="remote">
                <h1>Fjärrkontroll</h1>
            </header>
            <main>
                <p>Gå in på följande URL med din mobil</p>
 
<b>https://webtools.itgonline.se/remote</b>

<p>Där får du en fyrsiffrig kod.<br>Skriv in den här.</p>
            </main>
            <footer>
                <input maxlength="4" v-model="roomCode" type="password" placeholder="••••" @keyup.enter="setRoomCode"/>
            </footer>
        </section>
    </aside>
</template>

<script>
export default {
    name: 'remote-overlay',
    data(){
        return {
            groupie: false,
            roomCode: ``
        }
    },
    methods:{
        setRoomCode(){
            this.$socket.emit('shakehands', { role: `reciever`, room: this.roomCode });
            this.$store.commit('toggleRemoteModal');
            this.$store.commit('toggleRemote');

        },
        closeModal(){
             this.$store.commit('toggleRemoteModal');
        }
    }
 
}
</script>

<style>

* {
    -webkit-appearance: none;
}

aside#overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.8);
    z-index: 99;
    display: flex;
}

section#remote {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 400px;
    height: 500px;
    border-radius: 3px;
    background: white;
    box-shadow: 5px 5px 20px rgba(0,0,0,.2);
}

#remote header {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

#remote header #close {
    position: absolute;
    width: 1.5rem;
    top:.75rem;
    right: .75rem;
}

#remote header #icon {
    width: 40px;
    background: rgba(0,0,0,.07);
    padding: .5rem;
    border-radius: 999rem;
}

#remote header h1 {
    font-size: 2rem;
    margin: .75rem;
}

#remote main {
    flex: 1;
    padding: 1rem;
    color:#222;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.2rem;
}

#remote footer {
    flex: 1;
    display: flex;
}

#remote footer input {
    text-align: center;
    font-size: 3rem;
    letter-spacing: 1rem;
    width: 200px;
    background: none;
    border: none;
    margin: 0 auto;
}

#remote footer input:focus {
    outline: none;
}

</style>
