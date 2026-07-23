/* =====================================================
   NETHER NOVA CORPORATION
   MAIN SYSTEM SCRIPT
===================================================== */


/* === CORPORATE BOOT SEQUENCE === */


window.addEventListener("load", () => {

    const loader = document.querySelector(".loading-screen");


    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";


            setTimeout(() => {

                loader.style.display = "none";

            }, 800);


        }, 1800);

    }


});





/* === PAGE FADE IN === */


window.addEventListener("DOMContentLoaded", () => {


    document.body.style.opacity = "0";

    document.body.style.transition =
        "opacity 0.8s ease";


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            document.body.style.opacity = "1";

        });

    });


});






/* =====================================================
   CORPORATE TERMINAL LOG
===================================================== */


const systemMessages = [

    "NN-CORP DATABASE CONNECTED",

    "ARCHIVE ACCESS READY",

    "CREATIVE DIVISION ONLINE",

    "REALITY SIMULATION STABLE",

    "BACKSTAGE CHANNEL ACTIVE",

    "PROJECT DATABASE SYNCHRONIZED"

];



function randomSystemMessage(){


    const message =
        systemMessages[
            Math.floor(
                Math.random() * systemMessages.length
            )
        ];


    console.log(

        "[NN-CORP SYSTEM] "
        + message

    );


}



randomSystemMessage();







/* =====================================================
   ENTER CORPORATION BUTTON
===================================================== */


const enterButton =
    document.querySelector(".hero button");



if (enterButton){


    enterButton.addEventListener("click", () => {


        enterButton.innerText =
            "ACCESSING...";


        enterButton.style.pointerEvents =
            "none";



        setTimeout(() => {


            window.scrollTo({

                top:
                document.querySelector(".divisions").offsetTop,


                behavior:
                "smooth"

            });



            enterButton.innerText =
                "ACCESS GRANTED";



        },700);



    });


}






/* =====================================================
   DIVISION CARD INTERACTION
===================================================== */


const cards =
    document.querySelectorAll(".division-card");



cards.forEach(card => {


    card.addEventListener("mouseenter", () => {


        console.log(

            "[NN-CORP] Division accessed: "
            +
            card.querySelector("h3").innerText

        );


    });



});







/* =====================================================
   FAKE SECURITY GLITCH
===================================================== */


function systemGlitch(element){


    element.style.transform =
        "translateX(3px)";


    setTimeout(() => {


        element.style.transform =
            "translateX(-3px)";


    },50);



    setTimeout(() => {


        element.style.transform =
            "translateX(0)";


    },100);


}



setInterval(() => {


    const title =
        document.querySelector(".logo h1");


    if(title && Math.random() > 0.85){

        systemGlitch(title);

    }


},3000);

/* =====================================================
   NNC DATABASE ENTRY SEQUENCE
===================================================== */


function enterDatabase(){


    const screen =
        document.getElementById("nnc-transition");


    const text =
        document.getElementById("nnc-status");



    if(!screen) return;



    screen.classList.add("active");



    const messages = [

        "INITIALIZING DATABASE...",

        "VERIFYING CLEARANCE...",

        "CONNECTING ARCHIVE NETWORK...",

        "ACCESS GRANTED"

    ];



    let i = 0;



    const interval = setInterval(()=>{


        text.textContent =
            messages[i];



        i++;



        if(i >= messages.length){


            clearInterval(interval);



            setTimeout(()=>{


                window.location.href =
                "Archive/";



            },800);



        }



    },900);


}