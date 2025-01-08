const countDownclock = document.querySelector(".count-down-clock");
const countDownDate = new Date('March 29, 2025').getTime();
const wrapper = document.querySelector('.carousel .carousel-wrapper');
const images = document.querySelectorAll('.carousel .carousel-wrapper img');
const hashTag = document.querySelector('.hash-tag');
const acc = document.querySelectorAll('.accordion');


function addScrollAnimation(targetSelector, animationClass, options={}){
    //function to add scroll animation to elements
    const elements = document.querySelectorAll(targetSelector);

    if(elements.length === 0){
        return;
    }

    const defaultOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    }

    const observerOptions = {...defaultOptions, ...options};

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) =>{
            if(entry.isIntersecting){
                entry.target.classList.add(animationClass);
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach((element)=> observer.observe(element));
}


const x = setInterval(()=>{
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance/(1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    const seconds = Math.floor((distance % (1000*60))/1000);

    document.querySelector("#days").innerHTML = days;
    document.querySelector("#hours").innerHTML = hours;
    document.querySelector("#minutes").innerHTML = minutes;
    document.querySelector("#seconds").innerHTML = seconds;

}, 1000)


for(let i = 0; i < acc.length; i++){
    acc[i].addEventListener("click", ()=>{
        acc[i].classList.toggle("active");
        const icon = acc[i].querySelector(".accordion-icon i");


        for(let j = 0; j < acc.length; j++){
            if(i!==j){
                acc[j].classList.remove("active");
                const otherPanel = acc[j].nextElementSibling;
                otherPanel.style.maxHeight = null;
                const otherIcon = acc[j].querySelector(".accordion-icon i");
                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            }

        }


        const panel = acc[i].nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight = null;
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        }else{
            panel.style.maxHeight = panel.scrollHeight + "px";
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
            
        }
    })
}



document.addEventListener("DOMContentLoaded", ()=>{
    //add scroll animation to elements
    addScrollAnimation(".hero-text", "animate");
    addScrollAnimation(".countdown-block", "animate");
    addScrollAnimation(".hash-tag-container .hash-tag", "animate");
    addScrollAnimation(".food-drink-section .heading", "animate");

    //carousel duplicate images
    function duplicateImages(){
        for(let i = 0; i < 3; i++){
            wrapper.innerHTML += wrapper.innerHTML;
        }
    }

    duplicateImages();
});














