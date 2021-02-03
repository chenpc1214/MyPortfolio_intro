document.addEventListener('DOMContentLoaded',() =>{

    const cardArray = [                         //做出卡片的陣列
        {
          name: 'fries',
          img: 'images/fries.png'
        },
        {
          name: 'cheeseburger',
          img: 'images/cheeseburger.png'
        },
        {
          name: 'ice-cream',
          img: 'images/ice-cream.png'
        },
        {
          name: 'pizza',
          img: 'images/pizza.png'
        },
        {
          name: 'milkshake',
          img: 'images/milkshake.png'
        },
        {
          name: 'hotdog',
          img: 'images/hotdog.png'
        },
        {
          name: 'fries',
          img: 'images/fries.png'
        },
        {
          name: 'cheeseburger',
          img: 'images/cheeseburger.png'
        },
        {
          name: 'ice-cream',
          img: 'images/ice-cream.png'
        },
        {
          name: 'pizza',
          img: 'images/pizza.png'
        },
        {
          name: 'milkshake',
          img: 'images/milkshake.png'
        },
        {
          name: 'hotdog',
          img: 'images/hotdog.png'
        }
      ]

      cardArray.sort(() => 0.5 - Math.random())   //JavaScript亂數排列

      const grid = document.querySelector('.grid')  //選取html上的id為grid的元素
      const resultDisplay = document.querySelector('#result')  //選取html上的id為result的元素
      var cardsChosen = []                       //選出的card
      var cardsChosenId = []                    //選出的card id
      var cardsWon = []                        

      function createBoard() {                          //將亂數排列的陣列，塞入grid元素中
        for (let i = 0; i < cardArray.length; i++) {    
          var card = document.createElement('img')      //為陣列中的元素加上<img>標籤
          card.setAttribute('src', 'images/test.jpg')  //img src屬性為images/blank.png
          card.setAttribute('class', "test")
          card.setAttribute('data-id', i)               //為img 加上data-id 屬性
          card.addEventListener('click', flipCard)      //註冊click事件，一旦觸發click會呼叫flipcard函數
          grid.appendChild(card)                        //為grid添加子標籤
        }
      }

      function checkForMatch() {                          //翻牌判斷
        var cards = document.querySelectorAll('img')     //選取所有img標籤
        const optionOneId = cardsChosenId[0]             //選取cardsChosenId陣列，前兩位
        const optionTwoId = cardsChosenId[1]
        
        if(optionOneId == optionTwoId) {                                //重複點擊同一張卡片
          cards[optionOneId].setAttribute('src', 'images/test.jpg')
          cards[optionTwoId].setAttribute('src', 'images/test.jpg')
          alert('You have clicked the same image!')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {                    //cardsChosen陣列，前兩位相同
          alert('You found a match')
          cards[optionOneId].setAttribute('src', 'images/white.png')     //更改兩者<img src> 屬性
          cards[optionTwoId].setAttribute('src', 'images/white.png')
          cards[optionOneId].removeEventListener('click', flipCard)
          cards[optionTwoId].removeEventListener('click', flipCard)
          cardsWon.push(cardsChosen)                                    //將正確翻牌答案，推入 cardsWon
        } else {
          cards[optionOneId].setAttribute('src', 'images/test.jpg')    //都錯就回復原狀
          cards[optionTwoId].setAttribute('src', 'images/test.jpg')
          alert('Sorry, try again')
        }

        cardsChosen = []
        cardsChosenId = []

        resultDisplay.textContent = cardsWon.length
        if  (cardsWon.length === cardArray.length/2) {                       //總數除二，等於原陣列個數，已經都翻玩了
        resultDisplay.textContent = 'Congratulations! You found them all!'
        }
      }

      function flipCard() {                                                 //翻牌動作
        var cardId = this.getAttribute('data-id')                          //擷取<img>的data-id
        cardsChosen.push(cardArray[cardId].name)                          //將原陣列的項目名稱，推入cardsChosen陣列中
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length ===2) {
          setTimeout(checkForMatch, 500)
        }
      }

    createBoard()
 
})