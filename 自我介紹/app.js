
const lastWord = document.querySelector("#fifth");
const animation = document.querySelector("div.animation");
const header = document.querySelector("header");

lastWord.addEventListener("animationend", () => {
  animation.style = "transition: all 3s ease; opacity: 0; pointer-events: none;";
})


var typed = new Typed(".typing", {
  strings: ["全端工程師", "網頁藝術家", "油土柏","自由工作者"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

$(".carousel").owlCarousel({

  margin: 10,
  loop: true,
  autoplay:true,
  autoplayTimeOut: 1000,
  autoplayHoverPause: true,
  responsive: {
      0:{
          items: 1,
          nav: false
      },
      600:{
          items: 2,
          nav: false
      },
      1000:{
          items: 3,
          nav: false
      }
  }

 })

window.addEventListener("scroll",()=>{
  if(window.pageYOffset!=0){
    header.style.background="#e08958";
    header.classList.add("NavOpc");
  }
  else{
    header.style.background="none";
  }

});