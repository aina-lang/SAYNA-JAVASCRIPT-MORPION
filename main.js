(function() {
    //variable pour stoper ou ccontinuer le match
    var end_game=false;
    var matchNb=1;
    var overlay=document.getElementById("overlay");

    //gestion du tour de chaque joueur
    var indiceFirstPlayerOnload=Math.floor(Math.random()*(2-0)+0);
    var indiceFirstPlayer=indiceFirstPlayerOnload; 
    var playeractuel=indiceFirstPlayer;
    var playerNow=playeractuel; 
    
    //creation des joueurs
    var createPlayer=function(name,symbole,score){
        return{
            name,symbole,score
        }
    }
    var human=createPlayer("human","O",0);
    var bot=createPlayer("bot","X",0);
    var playerTable=[human,bot];
    
    
    //choix du symbole a utiliser durant le jeu
    choose1=function (text){
        human.symbole=text;
        bot.symbole="O";
        document.querySelector(".layer").parentNode.style.display="none"
        if(playerTable[playerNow]==bot){
            botVerify();
        }    
    }
    
    choose2=function (text){
        human.symbole=text;
        bot.symbole="X";
        document.querySelector(".layer").parentNode.style.display="none"
        if(playerTable[playerNow]==bot){
            botVerify();
        }    
    }
    


    // Récupération des cases à clicker
    const items = document.getElementsByClassName('grid-item');

    //choisir une case a cocher
    var caseCheckedBot=[];
    var caseCheckedHuman=[];

    choiseCase=function(id) {
        var condition=0;
           if(!document.getElementById(id).classList.contains("checked") && end_game==false){
                document.getElementById(id).textContent=playerTable[playerNow].symbole;
                document.getElementById(id).classList.add("checked");
                document.getElementById(id).style.color="#4286f4";
                caseCheckedHuman.push(id);
                playerNow++;
                condition=verifyWhoWin(caseCheckedHuman);
                if(playerNow>1) {
                    playerNow=0;
                } 
                if(condition>2 && end_game==false){
                    matchNb++;
                    end_game=true;
                    human.score++;
                    document.querySelector(".you-score").textContent=human.score;
                    var newleaderboard=document.createElement("div");
                    newleaderboard.innerHTML="<p>match n°" +matchNb +": bot score="+bot.score +"-  your score ="+human.score+"</p>";
                    document.querySelector(".layer3").appendChild(newleaderboard);
                    overlay.firstElementChild.textContent="WIN"
                    overlay.style.display="block";
                }else{
                    botVerify();
                }
           }
    }

    // verifier si player now est le bot ,si on oui il peut cocher une case
    function botVerify() {
        var conditionbot=0;
        var caseIndice=Math.floor(Math.random()*(9-0)+0);
        if(end_game==false&&(caseCheckedBot.length+caseCheckedHuman.length)!=9){           
            while (items[caseIndice].classList.contains("checked") ) {
                    caseIndice=Math.floor(Math.random()*(9-0)+0);
            }
            items[caseIndice].classList.add("checked");
            items[caseIndice].textContent=bot.symbole;
            items[caseIndice].style.color="#e29126"
            caseCheckedBot.push(items[caseIndice].id);
            conditionbot=verifyWhoWin(caseCheckedBot);
            console.log(conditionbot);
            if(conditionbot>2){
                matchNb++;
                end_game=true;
                bot.score++;
                var newleaderboard=document.createElement("div");
                newleaderboard.innerHTML="<p>match n°" +matchNb +": bot score="+bot.score +"-  your score ="+human.score+"</p>";
                document.querySelector(".layer3").appendChild(newleaderboard);
                document.querySelector(".cpu-score").textContent=bot.score;
                overlay.firstElementChild.textContent="DEFEAT"
                overlay.style.display="block";
            } 
            playerNow++;
            if(playerNow>1) {
                playerNow=0;
            }    
        }
        
    }

    //verifier si un joueur a gagné
    
    var winCondition=
    [
        ["item1","item2","item3"],
        ["item1","item4","item7"],
        ["item1","item5","item9"],
        ["item2","item5","item8"],
        ["item3","item5","item7"],
        ["item3","item6","item9"],
        ["item7","item8","item9"],
        ["item4","item5","item6"]
    ];

    function verifyWhoWin(players){     
      var condition=0;
       for(let i=0;i<winCondition.length;i++){
           for (let j = 0; j < 3; j++) {
             for (let k = 0; k <players.length; k++) {
                if(players[k]==winCondition[i][j]){
                    condition++;
                }
             }
           }
           if(condition>2)break;
           else{
               condition=0;
           }
       }
       return condition;
    } 

    //leaderboard
    openleaderboard=function(){
        document.querySelector(".layer3").parentNode.style.display="block"
    }


    // button again qui recommence le match
    again=function (){
        end_game=false;
        caseCheckedBot=[];
        caseCheckedHuman=[];
        for (let i = 0; i < items.length; i++) {
            items[i].textContent=" ";
            items[i].classList.remove("checked");
        }
        indiceFirstPlayerOnload=Math.floor(Math.random()*(2-0)+0);
        indiceFirstPlayer=indiceFirstPlayerOnload; 
        playeractuel=indiceFirstPlayer;
        playerNow=playeractuel;
        document.querySelector(".layer").parentNode.style.display="block"
        overlay.style.display="none"
    }
    
     // Vide le contenu de toute les cases et reiinitialise les scores
    rest=function () {
        bot.score=0;
        human.score=0;
        document.querySelector(".you-score").textContent=human.score;
        document.querySelector(".cpu-score").textContent=bot.score;
        again();
        document.querySelector(".layer").parentNode.style.display="block"
        document.querySelector(".layer3").parentNode.style.display="none"
    }

    //les affichages dynamiques
    window.onload=function(){
        rest();                                                                                                                                                                                                                                                         
    }
})();

