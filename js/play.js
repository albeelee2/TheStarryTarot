let cardArray = []; //1-22張牌
let cardPage = []; //正反面
let front = document.getElementsByClassName("front");
let cards = document.getElementsByClassName("card");
let aside = document.getElementsByTagName("aside")[0];
let start = document.getElementById("start");
//生成元素
let button = document.createElement("button");
button.setAttribute("type","button");
button.setAttribute("onclick","window.location.reload()");
button.textContent = "重新抽牌";
button.style.position = "fixed";
button.style.right = "1em";
button.style.top = "6em";
button.style.padding = "0.5em 1em";
button.style.fontSize = "20px";
button.style.backgroundColor = "var(--boxColor)";
button.style.color = "var(--textColorW)";
button.style.border = "3px solid var(--mainColor)";
button.style.borderRadius = "10px";
//hover在要監聽兩次滑鼠移入、移出
button.addEventListener('mouseover', function() {
    button.style.backgroundColor = 'var(--textColorR)';
    button.style.border = '3px solid var(--logoColor)';
});
button.addEventListener('mouseout', function() {
    button.style.backgroundColor = "var(--boxColor)";
    button.style.border = "3px solid var(--mainColor)";
});

// 開始玩
start.addEventListener("click", function () {
    start.remove();
    playTarot();
})  
function playTarot() {  
    //牌型亂數設定
    runRandom();
    function runRandom() {
        for(i=0;i<3;i++){
            cardArray[i] = Math.round(Math.random() * 21); //random機率0.99X21，用round四捨五入至多22
        }
        for(j=0;j<3;j++){
            cardPage[j] = Math.round(Math.random()); //正反面0或1，0.99不用乘，四捨五入制多1
        }
        if(cardArray[0] == cardArray[1] || cardArray[0] == cardArray[2] ||cardArray[1] == cardArray[2] ){
            runRandom(); //若抽到重覆牌，則重跑亂數；||或
        }
    }
        for (x = 0; x < 3; x++) {
        front[x].style.backgroundImage = "url(" + data[cardArray[x]].page + ")";
        if (cardPage[x] == 1) {
            front[x].classList.add("reverse");
        }
    }

    /* 資料區 */
    let timeArray = ["past", "present", "future"];
    for (i = 0; i < 3; i++) {
        front[i].setAttribute("data-title", data[cardArray[i]].name)
        front[i].setAttribute("data-text", data[cardArray[i]][timeArray[i]][cardPage[i]]);
    }  
    //原本這樣寫front[0]、front[1]、front[2]，上面用let timeArray簡化
    // front[2].setAttribute("data-title",data[cardArray[2]].name);
    // front[2].setAttribute("data-text",data[cardArray[2]].future[cardPage[2]]);

    for (const card of cards) {
        card.addEventListener("click", function () {
            this.classList.add("rotate");
            this.children[1].classList.add("rotate");
            this.children[2].classList.add("rotate");
            aside.classList.add("info");
            aside.children[0].children[0].textContent = this.children[1].getAttribute("data-title");
            aside.children[0].children[1].innerHTML = this.children[1].getAttribute("data-text");
        })
    }
    aside.addEventListener("click", function () {
        this.classList.remove("info");
        
        document.getElementsByTagName("body")[0].appendChild(button);
    })
}
// console.log(cardArray,cardPage);

// 滑動動畫不同尺寸狀態控制
let slide = document.getElementsByClassName("slide")[0];
let runSlide; /*因層級問題，這裡要先宣告*/

if(window.innerWidth < 1024){
    run();
}else{
    slide.style.transform = "translateX(0)";
}

window.addEventListener("resize",function(){
    if(window.innerWidth < 1024){
        run();
    }else{
        slide.style.transform = "translateX(0)";
        clearInterval(runSlide);
    }
})

// 手機版控制滑動
function run(){
    let count = 0;
    clearInterval(runSlide);
    runSlide = setInterval(function(){
    count--;
    if(count < -2){
        count = 0;
    }
    slide.style.transform = "translateX(" + 100 / 3 * count + "%)"
},2000);
let prev = document.getElementById("prev");
let next = document.getElementById("next");
prev.addEventListener("click",function(){
    count++;
    if(count >0){
        count = -2;
    }
    slide.style.transform = "translateX(" + 100 / 3 * count + "%)"
})
next.addEventListener("click",function(){
    count--;
    if(count < -2){
        count = 0;
    }
    slide.style.transform = "translateX(" + 100 / 3 * count + "%)"
})
}
