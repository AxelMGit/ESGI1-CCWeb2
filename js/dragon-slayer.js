"use strict";

const game = document.querySelector(".game");
let choice;
let pvP = 100;
let pvD = 100;
let jesaispascommentappelercettevariable;
let initiativeP;
let initiativeD;
let dm;
let attacker;
let round = 0;
let pvPMax;
let pvDMax;
let imgP = "images/knight.png";
let imgD = "images/dragon.png";

function difficulty() {
  choice = requestInteger(
    "Niveau de difficulté du jeu :\n1:facile\n2:normal\n3:difficile",
    1,
    3
  );
  console.log("value = ", choice);
  if (choice == 1) {
    pvP += throwDices(10, 10);
    pvD += throwDices(5, 10);
    jesaispascommentappelercettevariable = throwDices(2, 6);
  } else if (choice == 2) {
    pvP += throwDices(10, 10);
    pvD += throwDices(10, 10);
    jesaispascommentappelercettevariable = 0;
  } else if (choice == 3) {
    pvP += throwDices(7, 10);
    pvD += throwDices(10, 10);
    jesaispascommentappelercettevariable = throwDices(1, 6) * -1;
  }
  pvPMax = pvP;
  pvDMax = pvD;
}

function choiceAttacker() {
  initiativeP = throwDices(10, 6);
  initiativeD = throwDices(10, 6);
  if (initiativeP > initiativeD) {
    attacker = "player";
  } else if (initiativeP < initiativeD) {
    attacker = "drake";
  } else {
    initiativeP = throwDices(1, 6);
    initiativeD = throwDices(1, 6);
    choiceAttacker();
  }
}

function displayRound(attacks) {
  if (attacks == "player") {
    dm = throwDices(2, 6) + jesaispascommentappelercettevariable;
    pvD -= dm;
    document.write(
      '<li class="round-log player-attacks"><h2 class="subtitle">Tour : ' +
        round +
        '</h2><img src="images/knight-winner.png" alt="Chevalier"><p>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ' +
        dm +
        " points de dommage !</p></li>"
    );
  } else {
    dm = throwDices(3, 6) + jesaispascommentappelercettevariable;
    pvP -= dm;
    document.write(
      '<li class="round-log dragon-attacks"><h2 class="subtitle">Tour : ' +
        round +
        '</h2> <img src="images/dragon-winner.png" alt="Dragon"><p>Le dragon prend l\'initiative, vous attaque et vous inflige ' +
        dm +
        " points de dommage !</p> </li>"
    );
  }
}

function displayGameState() {
  if (pvP > 0 && pvD > 0) {
    document.write("<li class='game-state'>");

    document.write("<figure> <img src=" + imgP + "><figcaption> ");

    document.write(pvP + " PV");

    document.write("</figcaption></figure>");

    document.write("<figure><img src=" + imgD + "><figcaption> ");

    document.write(pvD + " PV");

    document.write("</figcaption></figure> </li>");
  } else if (pvP <= 0) {
    document.write("<h2>Perdu !<h2/><p>Le dragon a eu raison de vous...<p/>");
  } else if (pvD <= 0) {
    document.write(
      "<h2>Victoire !<h2/><p>Incroyable vous avez vaincu le dragon avec brillault<p/>"
    );
  }
}

function loopGame() {
  while (pvD > 0 && pvP > 0) {
    round++;
    choiceAttacker();

    displayRound(attacker, dm);

    displayGameState();

    //BONUS 1
    if (pvP < pvPMax * 0.3) {
      imgP = "images/knight-wounded.png";
    }
    if (pvD < pvDMax * 0.3) {
      imgD = "images/dragon-wounded.png";
    }
  }
}

difficulty();
document.write(
  "<p>Vos PV : " + pvP + "</p><p>PV du méchant dragon : " + pvD + "<p/>"
);

loopGame();
console.log(choice);
console.log(pvPMax);
console.log(pvDMax);
