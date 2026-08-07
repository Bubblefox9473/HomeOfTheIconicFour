const chapters = document.querySelectorAll(".chapter");

const recordNumber = document.querySelector(".chapter-number");
const recordTitle = document.querySelector(".current-card h3");
const recordStatus = document.querySelector(".production-status span");
const recordDescription = document.querySelector(".chapter-description");

const recordFile = document.querySelector(".record-file");
const recordDate = document.querySelector(".record-date");
const recordAccess = document.querySelector(".record-access");

const projectAccess = document.querySelector(".project-access");
const currentCard = document.querySelector(".current-card");

const slider = document.querySelector(".chapter-scroll");



let isDragging = false;
let mouseDown = false;

let startX = 0;
let scrollLeft = 0;



function updateAccess(chapter) {

    if(!projectAccess)
        return;


    const link = chapter.dataset.link;


    if(link && link.trim() !== "") {

        projectAccess.href = link;

        projectAccess.textContent =
            "ACCESS PROJECT FILES >";

        projectAccess.style.opacity = "1";

    }


    else {

        projectAccess.href = "#";

        projectAccess.textContent =
            "ACCESS RESTRICTED >";

        projectAccess.style.opacity = ".5";

    }

}





function loadChapter(chapter) {


    if(!chapter)
        return;



    if(currentCard) {

        currentCard.classList.add("loading");

    }



    setTimeout(() => {


        recordNumber.textContent =
            chapter.dataset.chapter;



        recordTitle.textContent =
            chapter.dataset.title;



        recordStatus.textContent =
            chapter.dataset.status;



        recordDescription.textContent =
            chapter.dataset.description;



        recordFile.textContent =
            chapter.dataset.file;



        recordDate.textContent =
            chapter.dataset.date;



        recordAccess.textContent =
            chapter.dataset.access;



        updateAccess(chapter);



        if(currentCard) {

            currentCard.classList.remove("loading");

        }



    },300);

}





chapters.forEach(chapter => {



    chapter.addEventListener("click", function(event){



        if(isDragging) {

            event.preventDefault();

            return;

        }



        event.preventDefault();



        chapters.forEach(card => {

            card.classList.remove("selected");

        });



        this.classList.add("selected");



        loadChapter(this);



        this.scrollIntoView({

            behavior:"smooth",

            block:"nearest",

            inline:"center"

        });



    });



});





const closeButtons =
document.querySelectorAll(".chapter-close");



closeButtons.forEach(button => {



    button.addEventListener("click", function(event){



        event.stopPropagation();



        const chapter =
            this.closest(".chapter");



        chapter.classList.remove("selected");



    });



});







/* =========================
DRAG SCROLLING
========================= */


if(slider) {



    slider.addEventListener("mousedown", event => {


        mouseDown = true;

        isDragging = false;


        startX =
            event.pageX - slider.offsetLeft;


        scrollLeft =
            slider.scrollLeft;



        slider.classList.add("dragging");


    });





    slider.addEventListener("mousemove", event => {



        if(!mouseDown)
            return;



        const x =
            event.pageX - slider.offsetLeft;



        const distance =
            x - startX;



        if(Math.abs(distance) > 5) {

            isDragging = true;

        }



        slider.scrollLeft =
            scrollLeft - distance * 1.5;



    });





    slider.addEventListener("mouseup", () => {



        mouseDown = false;


        slider.classList.remove("dragging");



        setTimeout(() => {

            isDragging = false;

        },100);



    });





    slider.addEventListener("mouseleave", () => {



        mouseDown = false;


        slider.classList.remove("dragging");



    });



}







/* =========================
ACCESS BLOCK
========================= */


if(projectAccess) {



    projectAccess.addEventListener("click", event => {



        if(projectAccess.textContent.includes("RESTRICTED")) {


            event.preventDefault();


        }



    });



}







/* =========================
LOAD DEFAULT CHAPTER
========================= */


const defaultChapter =
document.querySelector(".chapter.selected");



if(defaultChapter) {



    loadChapter(defaultChapter);



    setTimeout(() => {



        defaultChapter.scrollIntoView({

            behavior:"smooth",

            block:"nearest",

            inline:"center"

        });



    },500);



}