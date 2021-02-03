let add = document.querySelector("form button");
let section= document.querySelector("section");   //選取頁面上section標籤

add.addEventListener("click",e=>{

    
    e.preventDefault();    //先防止表單傳出

    let form = e.target.parentElement;         //先抓取form button 元素的父層
    let thing = form.children[0].value;        //第一個輸入欄位
    let month= form.children[1].value;        //第二個輸入欄位
    let day = form.children[2].value;       //第三個輸入欄位

    if(thing===""){                         //設定第一欄位一定要輸入
        alert("請輸入要做的事情");
        return;
    }

    let NewDiv = document.createElement("div");       //用程式碼做出div標籤
    let NewP1 =  document.createElement("p");         //用程式碼做出第一個p標籤
    let NewP2 =  document.createElement("p");         //用程式碼做出第二個p標籤

    NewDiv.classList.add("todo");                    //為div標籤加上class屬性
    NewP1.classList.add("thing");                   //為第一個p標籤加上class屬性
    NewP2.classList.add("todo-day");               //為第二個p標籤加上class屬性

    NewP1.innerText=thing;
    NewP2.innerText=month + "/" + day;

    NewDiv.appendChild(NewP1);                    //在div加上第一個p標籤、和第二個p標籤
    NewDiv.appendChild(NewP2);
    section.appendChild(NewDiv);                  //在現有的section標籤上，內嵌程式碼所做的div標籤

    let trash = document.createElement("button");   //建立trash按鈕
    let check = document.createElement("button");    //建立check按鈕

    trash.classList.add("trash");                   //為trash按鈕加上class
    check.classList.add("ok");                      //為check按鈕加上class

    trash.innerHTML='<i class="fas fa-trash-alt"></i>';   //內嵌fontawesomw標籤，所以要用innerHTML
    check.innerHTML='<i class="fas fa-calendar-check"></i>';
    NewDiv.appendChild(check);                            //為程式碼所做的div標籤，又內嵌做好的按鈕
    NewDiv.appendChild(trash);

    check.addEventListener("click",e=>{                   //為trash按鈕，還有checked按鈕註冊事件
        let done = e.target.parentElement;
        done.classList.toggle("done");
    })

    trash.addEventListener("click",e=>{
        let cancel = e.target.parentElement;
        cancel.style.animation = "scaledown 1s forwards"

        cancel.addEventListener("animationend",e=>{         //想要同時使用remov()和移除時的動畫
                                                            //必先註冊動畫跑完的事件
                                                            //不能直接在cancel.style.animation = "scaledown 1s forwards"之後
                                                            //直接cancel.remove();
                                                            //不然不會有動畫效果

            let text = cancel.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item,index)=>{              //item代表整個array 而index是我們要的索引
                if(item.todo_thing==text){
                    myListArray.splice(index,1);
                    localStorage.setItem("list",JSON.stringify(myListArray));
                }
            })                                                                          
            cancel.remove();
        })
    })

    //----------------------local storage設定----------------------------------------------------------------------------------

    let mytodo = {

        todo_thing:thing,
        todo_month:month,
        todo_day:day

    };

    let mylist = localStorage.getItem("list");

    if(mylist==null){                                                  //假使原本自己建立的locoal storage的"list"就是空的

        localStorage.setItem("list",JSON.stringify([mytodo]));         //直接將mytodo拖入
    }

    else{                                                             //不是空的
        
        let MyListArray = JSON.parse(mylist);                       //先將建立的locoal storage的"list" 轉換成陣列模式
        MyListArray.push(mytodo);                                     //在推入mytodo
        localStorage.setItem("list",JSON.stringify(MyListArray));     //在轉換為json格式，推入local storage
    }

    //------------------------------------------------------------------------------------------------------------------------
    
    NewDiv.style.animation = "scaleup 2s forwards";

    form[0].value="";                                       //自動清空第一欄

})

let store_list = localStorage.getItem("list");                       //取出的locoal storage的內容

if(store_list!==null){                                               //如果不是空的

    let list_array = JSON.parse(store_list)                         //解析它並丟到新的物件中，這邊是list_array

    list_array.forEach(item => {

        let todo = document.createElement("div");
        let text = document.createElement("p");
        let time = document.createElement("p");

        todo.classList.add("todo");
        text.classList.add("thing");
        time.classList.add("todo-day");

        text.innerText=item.todo_thing;
        time.innerText=item.todo_month + "/" + item.todo_day;

        todo.appendChild(text);
        todo.appendChild(time);


        let trash = document.createElement("button");   
        let check = document.createElement("button");   
        
        trash.classList.add("trash");                   
        check.classList.add("ok");                      
        
        trash.innerHTML='<i class="fas fa-trash-alt"></i>';   
        check.innerHTML='<i class="fas fa-calendar-check"></i>';
        todo.appendChild(check);                            
        todo.appendChild(trash);
        
        check.addEventListener("click",e=>{                   
            let done = e.target.parentElement;
            done.classList.toggle("done");
        })
        
        trash.addEventListener("click",e=>{
            let cancel = e.target.parentElement;
            cancel.style.animation = "scaledown 1s forwards"
        
            cancel.addEventListener("animationend",e=>{
                
                let text = cancel.children[0].innerText;                                //抓取trash button父層元素
                let myListArray = JSON.parse(localStorage.getItem("list"));             //把local storage抓過來，轉成陣列，它的樣子轉成陣列會是
                                                                                        //{todo_thing:...todo_month..todo_day...} , {todo_thing:...todo_month..todo_day...} , ...{todo_thing:...todo_month..todo_day...}
                myListArray.forEach((item,index)=>{                                    //item代表整個array 而index是我們要的索引
                    if(item.todo_thing==text){                                         //假使locoal storage中todo_thing鍵所裝的數值，和網頁中值一樣
                        myListArray.splice(index,1);                                   //套用splice函數 ----> splice(從哪開始 , 刪除幾個元素 , 插入新的元素)
                        localStorage.setItem("list",JSON.stringify(myListArray));      //更新local storage
                    }
                })

                                                                    
                cancel.remove();
            })
        })

        section.appendChild(todo);
    });
}