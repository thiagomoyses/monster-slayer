const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}


const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    methods: {
        attackMonster() {
            this.addNewRound();
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage("player", "attack", attackValue);
            this.attackPlayer();
        },
        specialAttackMonster() {
            this.addNewRound();
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage("player", "attack", attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(5, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage("monster", "attack", attackValue);
        },
        addNewRound() {
            this.currentRound++;
        },
        healPlayer() {
            if(this.playerHealth < 100){
                this.addNewRound();
                const healValue = getRandomValue(3, 5);
                const sumValues = this.playerHealth + healValue;
                if(sumValues > 100) {
                    healValue = 100;
                    this.playerHealth = healValue;
                } else {
                    this.playerHealth += healValue;
                }

                this.addLogMessage("player", "heal", healValue);
            }
        },
        playerSurrender() {
            this.winner = "m";
        },
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
    computed: {
        monsterBarStyle(){
            if(this.monsterHealth <= 0) {
                return { width: '0%' };
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyle(){
            if(this.playerHealth <= 0) {
                return { width: '0%' };
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            if(this.winner !== null) return true;
            return this.currentRound % 3 !== 0;
        },
        mayUseHeal(){
            if(this.winner !== null) return true;
            return this.currentRound % 5 !== 0;
        },
        mayBlockButtons() {
            return this.winner !== null ? true : false;
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0 ){
                this.winner = 'd';
            } else if (value <= 0) {
                this.winner = 'm';
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0 ){
                this.winner = 'd';
            } else if (value <= 0) {
                this.winner = 'p';
            }
        },
    }
});

app.mount('#game');