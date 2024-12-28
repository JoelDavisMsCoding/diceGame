let moneytotal = document.querySelector(".giCol1 p"); //shows the min/max bet limit until correct input then displays the money total
let inputBox = document.getElementById("wagerInput"); //area where they type the money they will bet for this round.
let addWagerBtn = document.getElementById("wagerButton"); //button sends the data once the wager is inserted
let displayMoney = document.querySelector(".displayMoney h3");
let displaySection = document.querySelector(".displaySection h1");
let dice1 = document.querySelector(".dice1"); //assigned this a variable to be able to click the dice and start the roll.
let dice2 = document.querySelector(".dice2");
let dice1Display = document.querySelectorAll(".dice1 .col"); //Allows access and control over the dots inside the dice(how i change dice number)
let dice2Display = document.querySelectorAll(".dice2 .col");
let cashOutBtn  = document.getElementById("cashOutBtn"); //clear/return the wager and allow the player to enter more money to gamble with.
let start_TotalWager = 200.00;
let wagerPerRound = 0;
let playerPointsArr = [];
let playerPoint = 0;
let winningPoint = 0;
let diceRollNumb = 0;
let rollCount = 0;
let winRound = false;
let isGameOn = false;


if (inputBox.disabled != true) {inputBox.removeAttribute("disabled");} //Stop the user from typing in the input box once they submit gambling wager until a new game.

inputBox.addEventListener("input", () => //Entering how much money they will use for the round.
{
    wagerPerRound = parseFloat(wagerPerRound);
    InputBoxValidation();
})

addWagerBtn.addEventListener("click", () =>
{
    StartGame();
    WagerLimit(wagerPerRound);
})

cashOutBtn.addEventListener("click", () =>
{
    ResetGame()
    ResetInputBox();
    let getChips = prompt("How much money do you want in chips? If you are finished enter 0 or press cancel.");
    while (isNaN(getChips)) {getChips = prompt("How much money do you want in chips? If you are finished enter 0.")}
    getChips = parseFloat(getChips);
    start_TotalWager = getChips;

    if (getChips == 0 || isNaN(getChips) == true)
    {
        if (isNaN(getChips) == true)
        {
            ResetGame();
            ResetInputBox();
            inputBox.disabled = "true";
            addWagerBtn.disabled = "true";
            isGameOn = false;
        }
        else
        {
            ResetGame();
            ResetInputBox();
            inputBox.disabled = "true";
            isGameOn = true;
        }
    }
})

dice1.addEventListener("mouseover", () => //Hover glow
{
    dice1.style.boxShadow = "10px 0px 150px 30px red";
    dice1.classList.add("jump");
    dice1.addEventListener("mouseout", () => 
    {
        dice1.style.boxShadow = "";
        setTimeout(() => 
        {
            dice1.classList.remove("jump")
        }, 200);
    })
})

dice2.addEventListener("mouseover", () => //Hover Glow
    {
        dice2.style.boxShadow = "10px 0px 150px 30px red";
        dice2.classList.add("jump");
        dice2.addEventListener("mouseout", () => 
        {
            dice2.style.boxShadow = "";
            setTimeout(() => 
            {
                dice2.classList.remove("jump")
            }, 200);
        })
    })

dice1.addEventListener("click", () =>
{
    if (isGameOn != false) //if wager amount is not loaded you will not be able to click the dice which starts the game.
    {   
        dice1.classList.add("bouncing");//makes the dice bounce and roll when
        dice2.classList.add("bouncing");
        setTimeout(() => { dice1.classList.remove("bouncing");dice2.classList.remove("bouncing")}, 1000);
        
        Dice1Display();
        Dice2Display();
        playerPointsArr.push(diceRollNumb);
        rollCount++
        playerPoint = playerPointsArr[0];
        CheckFirstRoll();
        CheckForPoint();
        InvalidFunds();
        diceRollNumb = 0;
    }
    else {};
})


function StartGame()
{
    displaySection.style.backgroundColor = "green";
    displaySection.style.border = "solid";
    displayMoney.style.backgroundColor = "red";
    displayMoney.style.border = "solid";
    moneytotal.innerHTML = `Currency Total: $${start_TotalWager}`;
    inputBox.value = "";
    inputBox.placeholder = "Bet Placed"
    displayMoney.innerHTML = `Betting: $${wagerPerRound}`
    displaySection.innerHTML = "Click the dice to begin roll."
    inputBox.disabled = "true";
    addWagerBtn.disabled = "true";
}
function InvalidFunds()
{
    if (start_TotalWager < 5.00 && start_TotalWager != 0 )
        {
           console.log("less than 5 not zero")
            setTimeout(() =>
            {
                alert("Bets must be $5 or greater to roll the dice. Press Cash Out button to cash for chips.");               
                ResetGame();
                ResetInputBox();
                isGameOn = false;
            }, 3000);  
        }
    else if (start_TotalWager == 0)
    {
        console.log("equals to zero")
        setTimeout(() =>
        {
            alert("Game Over! You are out of money.");
            ResetGame();
            ResetInputBox();
            isGameOn = false;
        }, 3000);
    }
}

function InputBoxValidation() //controls the data coming in only allowing numbers.
{
    switch (isNaN(inputBox.value))
    {
        case true:
            inputBox.value = inputBox.value.slice(0, -1);
        break
        case false:
            wagerPerRound = inputBox.value;
            wagerPerRound = parseFloat(wagerPerRound);
        break
    }
}

function WagerLimit(wager) //make sure money amount fits the min and max requirements.
{
    wager = parseFloat(wager);
    if (wager > start_TotalWager)
    {
        alert("You do not have enough money");
        RollReset();
        isGameOn = false
    }
    else if (wager > 500.00)
    {
        alert("$500.00 Max Betting Limit");
        RollReset();
        isGameOn = false
    }
    else if (wager < 5.00)
    {
        alert("$5.00 Minimum Betting Limit")
        RollReset();
        isGameOn = false
    }
    else {isGameOn = true}
}

function Dice1Display() //displays the different sides of dice 1
{
    let dice1Numb = Math.floor(Math.random() * 6) + 1;;
    diceRollNumb += dice1Numb;
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
        case dice1Numb == 6:
            for (let i = 0; i < dice1Display.length; i++)
            {
                if (dice1Display[i] == dice1Display[3]) {dice1Display[i].classList.add("invisible")}

                else {dice1Display[i].classList.remove("invisible")}
            }
        break;
    }
}

function Dice2Display() //displays the different sides of dice 2
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
}

function CheckFirstRoll() //checks the first roll to see if its 7 or 11(win) or 2,3,or 12(lose)
{
    //This section of code is checking for the number on the COME-OUT(first) roll.
    if (playerPointsArr[0] == 7 || playerPointsArr[0] == 11)
    {
        inputBox.disabled = false;
        inputBox.value = "...";
        displaySection.innerHTML = `You Win. You rolled a ${playerPoint} on your comeout roll.`;
        winRound = true;
        PayOut_PayUp();
        isGameOn = false; //this code is what pauses the player from clicking the dice after a win or lose
        setTimeout(() => {isGameOn = true;}, 5000); //This code goes with the code above allowing them to click again after a certain time.
        setTimeout(() => { ResetPoint(); RollReset();}, 5000);
    }
    else if (playerPointsArr[0] == 2 || playerPointsArr[0] == 3 || playerPointsArr[0] == 12)
    {
        inputBox.disabled = false;
        inputBox.value = "...";
        displaySection.innerHTML = `You Lose. You rolled a ${playerPoint} on your comeout roll.`;
        winRound = false;
        PayOut_PayUp();
        isGameOn = false; //this code is what pauses the player from clicking the dice after a win or lose
        setTimeout(() => {isGameOn = true;}, 5000); //This code goes with the code above allowing them to click again after a certain time.
        setTimeout(() => { ResetPoint(); RollReset();}, 5000);
    }
    else
    {
        displaySection.innerHTML = `Rolled: ${diceRollNumb} Point: ${diceRollNumb}`;//Introding the point from the first roll.
    }
}

function CheckForPoint() //checks to see if the point is matched(win) before rolling a 7(lose)
{
    for (let i = 0; i < playerPointsArr.length; i++) //Win or lose checks once player has a point.
    {
        for (let j = i + 1; j < playerPointsArr.length; j++)
        {
            if (playerPointsArr[0] == playerPointsArr[j])
            {
                inputBox.disabled = false;
                inputBox.value = "...";
                displaySection.innerHTML = `You Win. Point ${playerPoint}. Rolled: ${diceRollNumb}`; //Checks the first number then compare the next rolled number to see if they match. Indicating win if true.
                winRound = true;
                PayOut_PayUp();
                i = playerPointsArr.length;
                j = playerPointsArr.length;
                isGameOn = false; //this code is what pauses the player from clicking the dice after a win or lose
                setTimeout(() => {isGameOn = true;}, 5000); //This code goes with the code above allowing them to click again after a certain time.
                setTimeout(() => { ResetPoint(); RollReset();}, 5000);
            }
            else if (diceRollNumb == 7 && rollCount > 1)
            {
                inputBox.disabled = false;
                inputBox.value = "...";
                displaySection.innerHTML = `You Lose! Point: ${playerPoint} Rolled: ${diceRollNumb}`; //Checks for any number after the first roll checking for a 7 Indicating a lost if true.
                winRound = false;
                PayOut_PayUp();
                i = playerPointsArr.length;
                j = playerPointsArr.length;
                isGameOn = false; //this code is what pauses the player from clicking the dice after a win or lose
                setTimeout(() => {isGameOn = true;}, 5000); //This code goes with the code above allowing them to click again after a certain time.
                setTimeout(() => { ResetPoint(); RollReset();}, 5000);
            }
            else //If neither of the two checks above are true just keeps updating the user through the dice game.
            {
                displaySection.innerHTML = `Point: ${playerPoint} Rolled: ${diceRollNumb}`;
            }
        }
    }
}

function PayOut_PayUp() //determines to pay or collect based off conditions
{
    switch (winRound)
    {
        case true:
            payout = wagerPerRound;
            start_TotalWager += payout;
            displayMoney.innerHTML = `Payout: ${payout}`;
            moneytotal.innerHTML = `Currency Total: $${start_TotalWager}`;
        break;

        case false:
            payout = wagerPerRound;
            start_TotalWager -= wagerPerRound;
            displayMoney.innerHTML = `Lost: ${payout}`;
            moneytotal.innerHTML = `Currency Total: $${start_TotalWager}`;
        break;
    }
}

function ResetPoint() //Resets the point when the player wins or loses so they can keep rolling if they still have money and wants to continue
{
    wagerPerRound = 0;
    playerPointsArr = [];
    playerPoint = 0;
    winningPoint = 0
    diceRollNumb = 0;
    rollCount = 0;
    winRound = false;
    isGameOn = false;
    inputBox.disabled = "true";
}

function ResetGame() //Resets the whole game after checking to see if player wants to quit or automatically when they are out of money.
{
    start_TotalWager = 0;
    wagerPerRound = 0;
    playerPointsArr = [];
    playerPoint = 0;
    winningPoint = 0
    diceRollNumb = 0;
    rollCount = 0;
    winRound = false;
    isGameOn = false;
}

function RollReset() //Resets the default values of the page
{
    moneytotal.innerHTML = `Currency Total: $${start_TotalWager}`;
    inputBox.value = "";
    inputBox.placeholder = "Enter wager amount.";
    displayMoney.style.backgroundColor = "none";
    displayMoney.style.border = "none";
    displaySection.style.backgroundColor = "none";
    displaySection.style.border = "none";
    displayMoney.innerHTML = "";
    displaySection.innerHTML = "";
    wagerPerRound = 0;
    if (start_TotalWager != 0)
    {
        inputBox.removeAttribute("disabled");
        addWagerBtn.removeAttribute("disabled");

    }
}

function ResetInputBox() //Resets the default values of the page
{
    if (start_TotalWager == 0)
    {
        moneytotal.innerHTML = "Max: $500.00 - Min: $5.00";
        inputBox.value = "";
        inputBox.placeholder = "Enter wager amount.";
        displaySection.style.backgroundColor = "none";
        displaySection.style.border = "none";
        displayMoney.style.backgroundColor = "none";
        displayMoney.style.border = "none";
        displayMoney.innerHTML = "";
        displaySection.innerHTML = "";
        wagerPerRound = 0;
        inputBox.removeAttribute("disabled");
        addWagerBtn.removeAttribute("disabled");
    }
    else 
    {
        moneytotal.innerHTML = "Max: $500.00 - Min: $5.00";
        inputBox.value = "";
        inputBox.placeholder = "Enter wager amount.";
        displaySection.style.backgroundColor = "none";
        displaySection.style.border = "none";
        displayMoney.style.backgroundColor = "none";
        displayMoney.style.border = "none";
        displayMoney.innerHTML = "";
        displaySection.innerHTML = "";
        wagerPerRound = 0;
        inputBox.removeAttribute("disabled");
        addWagerBtn.removeAttribute("disabled");
    }
}//End of Reset InputBox
