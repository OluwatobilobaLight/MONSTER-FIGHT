new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        scores: [],
        playerHealthBar: {
            backgroundColor: 'green'
        },
        monsterHealthBar: {
            backgroundColor: 'green'
        }
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.scores = []
            this.healthBar.backgroundColor = 'green'
        },
        attack: function () {
            var damage = this.damage(3, 10)
            this.monsterHealth -= damage
            if (this.checkWin()) {
                return;
            }
            this.scores.unshift({
                isPlayer: true,
                text: ('Player hits Monster for ' + damage + 'hits')
            })
            this.monsterAttack()
        },
        heal: function () {
            if(this.playerHealth <= 100){
                this.playerHealth += 10
                if(this.playerHealth >= 100){
                    this.playerHealth = 100
                    console.log('Your health is ' + this.playerHealth + '%')
                }
            } 
            this.monsterAttack()
        },
        giveUp: function () {
                this.gameIsRunning = false
        },
        specialAttack: function () {
            var damage = this.damage(12, 20)
            this.monsterHealth -= damage
            this.scores.unshift({
                isPlayer: true,
                text: ('Player hits Monster Hard for ' + damage + ' hits')
            })
            if (this.checkWin()) {
                return
            }
            this.monsterAttack() 

        },
        monsterAttack: function(){
            var damage = this.damage(5, 12)
            this.playerHealth -= damage
            this.scores.unshift({
                isPlayer: false,
                text: ('Monster hit Player for ' + damage + ' hits')
            })
            this.checkWin()
            
        },
        damage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function () {
            if(this.playerHealth <= 49){
                this.playerHealthBar.backgroundColor = 'red'
            }
            if(this.playerHealth >= 50){
                this.playerHealthBar.backgroundColor = 'green'
            }
            if(this.monsterHealth <= 49){
                this.monsterHealthBar.backgroundColor = 'red'
            }
            if(this.monsterHealth >= 50){
                this.monsterHealthBar.backgroundColor = 'green'
            }
            if (this.monsterHealth <= 0) {
                    this.monsterHealth = 0                  
                return true;
                }
             if (this.playerHealth <= 0) {
                    this.playerHealth = 0
                }
            return false;
        }
    }
})