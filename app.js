//Create a variable to store a random number 1-6. This variable will be used twice for each of the two dice giving a possible total of 12 when combined.
//Create different variables to hold and represent the two pair of dice that will be used for the game.
//Once you have the variables grabbing the correct data create a event listener so when either dice are clicked it will begin the dice to roll.
//The Random number will be stored and that will be used to tell the dice what number to display on the html page.
//On the first roll the diceRollNumb(point) of the two numbers will be stored because this will be the focus point of the game.
//If the diceRollNumb of the first number is 7 or 11 the player wins the wager for that roll. If the diceRollNumb on the the first roll is 2, 3, or 12 money is lost.
//Use a while loop to check every time the dice are rolled to see if the new diceRollNumb matches the point(diceRollNumb from first roll) or 7.
//if the point is matched before 7 appears the wager is won. If 7 appears before the point the wager is lost.

let displaySection = document.querySelector(".displaySection h1")
let dice1 = document.querySelector(".dice1"); //assigned this a variable to be able to click the dice and start the roll.
let dice2 = document.querySelector(".dice2");
let dice1Display = document.querySelectorAll(".dice1 .col"); //Allows access and control over the dots inside the dice(how i change dice number)
let dice2Display = document.querySelectorAll(".dice2 .col");
let playerWager = 0;
let playerPointsArr = [];
let playerPoint = 0;
let winningPoint = 0
let diceRollNumb = 0;
let rollCount = 0;
let gameOver = false;

function WagerValidation()
{
    playerWager = prompt("Enter dollar amount you wish to enter the game. Max: $500.00 - Min: $5.00");
    while (isNaN(playerWager))
    {
        alert("Invalid Input. Please enter a number to continue.");
        playerWager = prompt("Enter dollar amount you wish to enter the game. Max: $500.00 - Min: $5.00");
    }
    while (playerWager > 500.00)
    {
        alert("$500 Max.");
        playerWager = prompt("Enter dollar amount you wish to enter the game. Max: $500.00 - Min: $5.00");
    }
    while (playerWager < 5.00)
    {
        alert("$5 Min.");
        playerWager = prompt("Enter dollar amount you wish to enter the game. Max: $500.00 - Min: $5.00");
    }
    console.log(playerWager)
}

WagerValidation();


// dice1.addEventListener("click", () =>
// {
//      Dice1Display();
//      Dice2Display(); 
// })
dice1.addEventListener("click", () =>
{
    Dice1Display();
    Dice2Display();
    playerPointsArr.push(diceRollNumb);
    rollCount++
    

    if (playerPoint == 0 || playerPointsArr[0] != 7 || playerPointsArr[0] != 11 || playerPointsArr[0] != 2 || playerPointsArr[0] != 3 || playerPointsArr[0] != 12 )
    {displaySection.innerHTML = `You rolled a ${diceRollNumb} on your comeout roll. ${diceRollNumb} is your point.`;} //Introding the first roll of the game.

    playerPoint = playerPointsArr[0];

    CheckFirstRoll()

    for (let i = 0; i < playerPointsArr.length; i++) //Win or lose checks once player has a point.
    {
        for (let j = i + 1; j < playerPointsArr.length; j++)
        {
            if (playerPointsArr[0] == playerPointsArr[j])
            {
                displaySection.innerHTML = `You Win. Your point is ${playerPoint}. You rolled a ${diceRollNumb}.`; //Checks the first number then compare the next rolled number to see if they match. Indicating win if true.
                console.log(`You Win. Your point is ${playerPoint}. You rolled a ${diceRollNumb}.`);
            }
            else if (diceRollNumb == 7 && rollCount > 1)
            {
                displaySection.innerHTML = `You Lose! Your point is ${playerPoint}. You rolled a ${diceRollNumb}.`; //Checks for any number after the first roll checking for a 7 Indicating a lost if true.
                console.log(`You Lose! Your point is ${playerPoint}. You rolled a ${diceRollNumb}.`);
            }
            else if (diceRollNumb != 7 && rollCount < 1 || playerPointsArr[0] != playerPointsArr[j]) //If neither of the two checks above are true just keeps updating the user through the dice game.
            {
                displaySection.innerHTML = `Your point is ${playerPoint}. You rolled a ${diceRollNumb}. Keep rolling.`;
                console.log(`Your point is ${playerPoint}. You rolled a ${diceRollNumb}. Keep rolling.`);
            }
        }
    }
    // console.log(`player point: ${playerPoint}`);
    diceRollNumb = 0;
    console.log(playerPointsArr);
})

function CheckFirstRoll()
{
    //This section of code is checking for the number on the COME-OUT(first) roll.
    if (playerPointsArr[0] == 7 || playerPointsArr[0] == 11)
    {
        displaySection.innerHTML = `You Win. You rolled a ${playerPoint} on your comeout roll.`;
        console.log(`You Win. You have rolled ${playerPoint} on the comeout roll.`);
    }
    else if (playerPointsArr[0] == 2 || playerPointsArr[0] == 3 || playerPointsArr[0] == 12)
    {
        displaySection.innerHTML = `You Lose. You rolled a ${playerPoint} on your comeout roll.`;
        console.log(`You Lose. You have rolled ${playerPoint} on the comeout roll.`)
    }
}

function Dice1Display()
{
    let dice1Numb = Math.floor(Math.random() * 6) + 1;;
    diceRollNumb += dice1Numb;
    console.log(dice1Numb);
    switch (dice1Numb > 0)
    {
        case dice1Numb == 1:
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[3])
                {dice1Display[i].classList.remove("invisible");}
                else
                {dice1Display[i].classList.add("invisible");}
            }
        break;
        case dice1Numb == 2:
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[0] || dice1Display[i] == dice1Display[6]) {dice1Display[i].classList.remove("invisible");}
                
                else{dice1Display[i].classList.add("invisible");}   
            }
        break;
        case dice1Numb == 3:
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[0] || dice1Display[i] == dice1Display[6]) {dice1Display[i].classList.remove("invisible")}

                else if (dice1Display[i] == dice1Display[3])
                {dice1Display[i].classList.remove("invisible");}

                else {dice1Display[i].classList.add("invisible");}   
            }
        break;
        case dice1Numb == 4:
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[0] || dice1Display[i] == dice1Display[1]) {dice1Display[i].classList.remove("invisible")}

                else if (dice1Display[i] == dice1Display[5] || dice1Display[i] == dice1Display[6]) {dice1Display[i].classList.remove("invisible")}
                
                else {dice1Display[i].classList.add("invisible");}   
            }
        break;
        case dice1Numb == 5:
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[0] || dice1Display[i] == dice1Display[1]) {dice1Display[i].classList.remove("invisible")}

                else if (dice1Display[i] == dice1Display[3]) {dice1Display[i].classList.remove("invisible");}

                else if (dice1Display[i] == dice1Display[5] || dice1Display[i] == dice1Display[6]) {dice1Display[i].classList.remove("invisible")}
            
                else {dice1Display[i].classList.add("invisible");}   
            }
        break;
        case dice1Numb == 6: //no code needed the default dots are set as 6.
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[3]) {dice1Display[i].classList.add("invisible")}

                else {dice1Display[i].classList.remove("invisible")}
            }
        break;
    }
}//End of Dice1Display Function

function Dice2Display()
{
    let dice2Numb = Math.floor(Math.random() * 6) + 1;
    diceRollNumb += dice2Numb;
    console.log(dice2Numb);
    switch (dice2Numb > 0)
    {
        case dice2Numb == 1://set to one by default in html. no action needed here.
            for (let i = 0; i < dice2Display.length; i++)
            {
                if (dice2Display[i] == dice2Display[3])
                {dice2Display[i].classList.remove("invisible")}
                
                else{dice2Display[i].classList.add("invisible");}   
            }
        break;
        case dice2Numb == 2:
            for (let i = 0; i < dice2Display.length; i++)
            {
                if (dice2Display[i] == dice2Display[0] || dice2Display[i] == dice2Display[6])
                {dice2Display[i].classList.remove("invisible")}
                
                else{dice2Display[i].classList.add("invisible");}

            }
        break;
        case dice2Numb == 3:
            for (let i = 0; i < dice2Display.length; i++)
            {
                if (dice2Display[i] == dice2Display[0] || dice2Display[i] == dice2Display[6]) {dice2Display[i].classList.remove("invisible");}
                
                else if (dice2Display[i] == dice2Display[3]) {dice2Display[i].classList.remove("invisible");}

                else {dice2Display[i].classList.add("invisible");}
            }
        break;
        case dice2Numb == 4:
            for (let i = 0; i < dice2Display.length; i++)
            {
                if (dice2Display[i] == dice2Display[0] || dice2Display[i] == dice2Display[1]) {dice2Display[i].classList.remove("invisible");}

                else if (dice2Display[i] == dice2Display[5] || dice2Display[i] == dice2Display[6]) {dice2Display[i].classList.remove("invisible");}
             
                else {dice2Display[i].classList.add("invisible");}   
            }
        break;
        case dice2Numb == 5:
            for (let i = 0; i < dice2Display.length; i++)
            {
                if (dice2Display[i] == dice2Display[2] || dice2Display[i] == dice2Display[4]) {dice2Display[i].classList.add("invisible");}

                else {dice2Display[i].classList.remove("invisible")}
            }
        break;
        case dice2Numb == 6:
            for (let i = 0; i < dice2Display.length; i++)
            {
                if (dice2Display[i] == dice2Display[3]) {dice2Display[i].classList.add("invisible");}

                else {dice2Display[i].classList.remove("invisible");} 
            }
        break
    }
}//End Dice2Display Function

