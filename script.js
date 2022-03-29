const getcard = document.querySelector(".getcard");
const gethold = document.querySelector(".hold");
const getplay = document.querySelector(".playagain");

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
    .then((response) => {
        return response.json();
    })
    .then((cardjson) => {
        console.log(cardjson);
        deck_id=cardjson.deck_id;
    })
    .catch((err) => {
        // handle errors
    });

getcard.onclick=draw;
gethold.onclick=holdconditions;
getplay.onclick=shuffle;

let message = document.querySelector(".message");
let hold = 0;

function draw(){
    if(hold===0){
        fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then((response) => {
                return response.json();
            })
            .then((drawjson) => {
                console.log(drawjson);
                let cards=drawjson.cards[0];
                createImage(cards);
                scoreline(cards);
                message.innerHTML="";
                // pic.src=cards.image;
            })
            .catch((err) => {
                // handle errors
            });

    }
        fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then((response) => {
            return response.json();
        })
        .then((drawjson) => {
            console.log(drawjson);
            let cards=drawjson.cards[0];
            if(scoreholder2<=15 && hold===0){
                createImage2(cards);
                scoreline2(cards);
            }
            
            if(scoreholder2<=scoreholder && hold===1){
                createImage2(cards);
                scoreline2(cards);
                afterhold();
            }

            if(scoreholder2>=16 && hold===0){
                message.innerHTML="Dealer Holds";
            }
            conditions();
            
            if(scoreholder2>=16 && scoreholder2<21 && hold===1){
                afterhold();
            }

            // pic.src=cards.image;
        })
        .catch((err) => {
            // handle errors
        });

}

let card=document.querySelector(".card");
function createImage(data){
    let nextcard=document.createElement("img");
    nextcard.setAttribute("src",data.image);
    nextcard.style.height="200px";
    card.appendChild(nextcard);
}

let card2=document.querySelector(".card2");
function createImage2(data){
    let nextcard=document.createElement("img");
    nextcard.setAttribute("src",data.image);
    nextcard.style.height="200px";
    card2.appendChild(nextcard);
}

let score=document.querySelector(".scorekeep");
let scoreholder=0;
let acecount=0;
function scoreline(data){
    if(data.value==="KING"||data.value==="QUEEN"||data.value==="JACK"){
        scoreholder=scoreholder+10;
        score.innerHTML=scoreholder;
    }else if(data.value==="ACE"){
        acecount=acecount+1;
        if(scoreholder<=10){
            scoreholder=scoreholder+11;
            score.innerHTML=scoreholder;
        }
        else{
            scoreholder=scoreholder+1;
            score.innerHTML=scoreholder;
            acecount=acecount-1;
        }
    }else{
        scoreholder=scoreholder+parseFloat(data.value);
        score.innerHTML=scoreholder;
    }
    if(scoreholder>21 && acecount>0){
        scoreholder=scoreholder-10;
        score.innerHTML=scoreholder;
        acecount=acecount-1;
    }
}

let score2=document.querySelector(".dealerkeep");
let scoreholder2=0;
let acecount2=0;
function scoreline2(data){
    if(data.value==="KING"||data.value==="QUEEN"||data.value==="JACK"){
        scoreholder2=scoreholder2+10;
        score2.innerHTML=scoreholder2;
    }else if(data.value==="ACE"){
        acecount2=acecount2+1;
        if(scoreholder2<=10){
            scoreholder2=scoreholder2+11;
            score2.innerHTML=scoreholder2;
        }
        else{
            scoreholder2=scoreholder2+1;
            score2.innerHTML=scoreholder2;
            acecount2=acecount2-1;
        }
    }else{
        scoreholder2=scoreholder2+parseFloat(data.value);
        score2.innerHTML=scoreholder2;
    }
    if(scoreholder2>21 && acecount2>0){
        scoreholder2=scoreholder2-10;
        score2.innerHTML=scoreholder2;
        acecount2=acecount2-1;
    }
}

function conditions(){
    if(scoreholder2>21 && scoreholder<=21){
        message.innerHTML="You Win!";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
    else if(scoreholder>21 && scoreholder2<=21){
        message.innerHTML="You Lose!";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
    else if((scoreholder>21 && scoreholder2>21)||(scoreholder===21 && scoreholder2===21)){
        message.innerHTML="Tie";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
    else if(scoreholder===21 && scoreholder2!=21){
        message.innerHTML="You Win!";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
    else if(scoreholder2===21 && scoreholder!=21){
        message.innerHTML="You Lose!";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
}

function holdconditions(){
    if(scoreholder!=0){
        hold=1;
        for(let i=0;i<5;i=i+1){
            if(scoreholder2<16){
                draw();
            }
        }
        if(scoreholder2<21){
            afterhold();
        }
    }
}

function afterhold(){
    if(scoreholder===scoreholder2){
        message.innerHTML="Tie";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
    else if(scoreholder>scoreholder2){
        message.innerHTML="You Win!";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
    else if(scoreholder<scoreholder2){
        message.innerHTML="You Lose!";
        getcard.style.visibility="hidden";
        gethold.style.visibility="hidden";
        getplay.style.visibility="visible";
    }
}

function shuffle(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
            .then((response) => {
                return response.json();
            })
            .then((drawjson) => {
                console.log(drawjson);
                card.innerHTML="";
                card2.innerHTML="";
                message.innerHTML="";
                getcard.style.visibility="visible";
                gethold.style.visibility="visible";
                getplay.style.visibility="hidden";
                scoreholder=0;
                scoreholder2=0;
                score.innerHTML=scoreholder;
                score2.innerHTML=scoreholder2;
                hold=0;
                acecount=0;
                acecount2=0;
            })
            .catch((err) => {
                // handle errors
            });
}
