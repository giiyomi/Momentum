const middle = document.getElementById("time");
const greeting = document.getElementById("greeting");
const screen = document.getElementById("screen");

let greetingellipsisContainer = document.querySelector('.greetingellipsisContainer')
let greetingellipsis = document.getElementById("greetingellipsis");
const goal = document.getElementById("goal");
const editname = document.getElementById("editname");
const editnametext = document.getElementById("editnametext");
const bubbletext = document.getElementById("bubbletext");
const center = document.getElementById("center");

const greetingname = document.getElementById("greetingname");
const greetinginput = document.getElementById("greetinginput");
const greetingtext = document.getElementById("greetingtext");
const goaltext = document.getElementById("goaltext");
const goallist = document.getElementById("goallist");
const inputGoal = document.getElementById("inputGoal");
const todaygoal = document.getElementById("todaygoal");
let numberOfToDo = 0;

const bottomRight = document.getElementById("bottom-right");
const bubbleTextTodo = document.getElementById("bubbletexttodo");
const todo = document.getElementById("todo");
let todoForm = document.getElementById("todoForm");
let inputTodo = document.getElementById("inputTodo");
let todoList = document.getElementById("todolist");
let editnameClicked = true;
let limitedGoal = true;
let maxTodos = 10; 
let repitition = 0;

let quote = document.getElementById("quote");
let quoteEllipsis = document.getElementById("quoteEllipsis");
let bottomMiddle = document.getElementById("bottom-middle")
let footer = document.querySelector("footer");
let toolTipText = document.getElementById("tooltiptext");
let refresh = document.getElementById("refresh");
let personalise = document.getElementById("personalise");
let personaliseQuote = document.getElementById("personaliseQuote");
let inputQuote = document.getElementById("inputQuote");
let grtngNameLclStrge = localStorage.getItem('nameForGreeting')
let todoListLclStrge = localStorage.getItem('todoList')



setInterval(() => {  
    var removeRemidian = window.matchMedia("(max-width: 800px)");
    if (removeRemidian.matches) {     
    let updatedTime = new Date();
    let movingTime = { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Melbourne' };
    let timeString = updatedTime.toLocaleTimeString('en-AU', movingTime);

    middle.innerHTML = timeString;
    middle.innerHTML = middle.innerHTML.slice(0,5)
    }else{
        let updatedTime = new Date();
        let movingTime = { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Melbourne' };
        let timeString = updatedTime.toLocaleTimeString('en-AU', movingTime);
        middle.innerHTML = timeString;
    }   
}, 1000);

// console.log(middle)

let date = new Date();
let hour = date.getHours();
let greetingMeridiem = "";
if (hour >= 0 && hour < 12) {
    greetingMeridiem = "Good Morning!";
} else if (hour >= 12 && hour < 18) {
    greetingMeridiem = "Good Afternoon!";
} else {
    greetingMeridiem = "Good Evening!";
}

greetingtext.innerText = greetingMeridiem;

center.addEventListener("mouseenter", function(){

    console.log('dumaan dito')
    if (editnameClicked === false) {//false yung editnameClicked once na hindi pa naglagay ng name sa greetinginput and pinindot yung enter.
        greetingellipsis.style.display = "none";
    } else {
        greetingellipsis.style.display = "flex";
    }
    center.addEventListener("mouseleave", function(){
        if (greetingellipsis.style.display === "flex") { //ellipsisClicked sya dati
            // greetingellipsis.style.display = "none";
            editname.style.display = "none";
        }
    });
});


greetingellipsis.addEventListener("mouseenter", function(){
    // console.log('nag  appear na yung ellipsis')
    greetingellipsis.style.background = 'rgba(245, 245, 245, 0.3)';
    greetingellipsis.addEventListener("mouseleave", function(){
        greetingellipsis.style.background = "none";
    });
});

greetingellipsis.addEventListener("click", function () { //once ellipsis is clicked,
    // console.log('owky')
    editname.style.display === "flex"
    ? (editname.style.display = "none")
    : (editname.style.display = "flex")
    
});



function handleEditNameClick() {

    if(!grtngNameLclStrge){
        if (editnameClicked) {
            greetingellipsisContainer.style.display = "none";
            greeting.style.transition = "1.5s ease";
            greetingtext.style.transition = "1.5s ease";

            greeting.style.marginTop = "5px";
            greetingtext.style.position = "static";
            greetingellipsis.style.display = "none";
            editname.style.display = "none";
            greetingname.style.display = "flex";
            greetinginput.style.display = "flex";
            greetingname.style.paddingLeft = "9px";

            greetingtext.innerText = `${greetingtext.innerText.slice(0, -1)}, `;

            let dotDiv = document.createElement("div"); // create new div element
            dotDiv.textContent = "."; // add a dot inside the new div
            greetingname.appendChild(dotDiv); // append the dotDiv inside greetingname
            greetingname.insertBefore(dotDiv, greetinginput.nextSibling); // insert the dotDiv after greetinginput
        }
    } else {
        greetingellipsisContainer.style.display = "none";
        greeting.style.transition = "1.5s ease";
        greetingtext.style.transition = "1.5s ease";

        greeting.style.marginTop = "5px";
        greetingtext.style.position = "static";
        greetingellipsis.style.display = "none";
        editname.style.display = "none";
        greetingname.style.display = "flex";
        greetinginput.style.display = "none";
        greetingname.style.paddingLeft = "9px";

        greetingtext.innerText = `${greetingtext.innerText.slice(0, -1)}, `;

    }
}

editname.addEventListener("click", handleEditNameClick);


greetinginput.addEventListener("input", function(){
    let numberOfCharacters = this.value.length;
    if (numberOfCharacters >= 0) {
        let width = numberOfCharacters + "ch";
        this.style.width = width;
        this.style.maxWidth = "15ch"
    } else {
        this.style.width = "2ch";
    }
});

const handleGreetingInputKeydown = (event) => {
    editnameClicked = false;

    if (!grtngNameLclStrge) {
        if (event.key === "Enter") {
            // Check if the input is empty or only whitespace
            if (event.target.value.trim() === "") {
                event.preventDefault(); // Prevent refresh if input is empty
                return;
            }
            // Proceed with saving the value if input is not empty
            event.preventDefault();
            greetinginput.style.display = "none";

            let dotDiv = document.createElement("div");
            dotDiv.textContent = event.target.value.trim(); // Remove leading/trailing spaces
            greetingname.insertBefore(dotDiv, greetinginput.nextSibling);
            event.target.value = ""; // Reset input value
            dotDiv.style.display = "flex";
            dotDiv.style.whiteSpace = "nowrap";
            greetingellipsis.style.display = "none"; // Hide ellipsis
            
            localStorage.setItem('nameForGreeting', dotDiv.textContent);
        }
    } else {
        let dotDiv = document.createElement("div");
        dotDiv.textContent = grtngNameLclStrge;
        greetingname.insertBefore(dotDiv, greetinginput.nextSibling);
        dotDiv.style.display = "flex";
        dotDiv.style.whiteSpace = "nowrap";
    }
}

greetinginput.addEventListener("keydown", handleGreetingInputKeydown);


grtngNameLclStrge && handleEditNameClick()
grtngNameLclStrge && handleGreetingInputKeydown()



goaltext.addEventListener("keydown",function (pressEnter) {
    if (pressEnter.key === "Enter" && inputGoal.value.trim() !== "") {


        let charLengthChecker = inputGoal.value.length >= 20 ? inputGoal.value.slice(0,17) + "..." : inputGoal.value

        console.log(charLengthChecker)

        pressEnter.preventDefault();
        inputGoal.style.display = "none";
        goal.style.display = "none";
        goallist.style.display = "flex"
        let label = document.createElement("label");
        label.textContent = charLengthChecker;
        label.setAttribute("for", `id${numberOfToDo}`);
        label.style.whiteSpace = "nowrap";


        let mainDiv = document.createElement("div");
        let todo = document.createElement("input");
        todo.setAttribute("type", "checkbox");
        todo.setAttribute("id", `id${numberOfToDo}`);
        todo.style.height = "30px";
        todo.style.width = "50px";
        mainDiv.style.display = "flex";
        mainDiv.style.flexDirection = "flex-start";

        mainDiv.style.margin = "0px";


        todo.addEventListener("change", function(checkEvent) {
            let checkbox = checkEvent.target;
            let label = document.querySelector(`label[for="${checkbox.id}"]`);
            if (checkbox.checked) {
                label.style.textDecoration = "line-through";

                goallist.classList.add('main-goal-fadeaway')

                setTimeout(() => {
                    goallist.style.display  = 'none'
                    inputGoal.style.display = 'flex'
                    goal.style.display = 'flex'
                    mainDiv.remove()
                    goallist.classList.remove('main-goal-fadeaway')
                }, 1500);

            }
        });

        if (label.innerHTML.length <= 20) {

        }

        mainDiv.appendChild(todo);
        mainDiv.appendChild(label);
        todaygoal.appendChild(mainDiv);
        numberOfToDo++;
        inputGoal.value = "";
        limitedGoal = false;
    }
});

inputGoal.addEventListener("input", function() {
    if (inputGoal.value.trim() === "") {
        limitedGoal = true;
    }
});

todo.addEventListener("mouseenter", function () {
    todo.style.borderRadius = "20px";
    todo.style.padding = "2%";
    todo.style.background = 'rgba(245, 245, 245, .2)';
    todo.addEventListener("mouseleave", function () {
        todo.style.background = 'none';
    })
});

todo.addEventListener("click", function () {
    if (bubbleTextTodo.style.display == "none") {
        todoForm.style.display = "flex";
        bubbleTextTodo.style.display = "flex";
        toolTipText.style.display = "none";
    } else {
        todoForm.style.display = "none";
        bubbleTextTodo.style.display = "none";
    }
});

bottomRight.addEventListener("mouseleave", function(){
    bubbleTextTodo.style.display = "none";
    todoForm.style.display = "none";
    greetingellipsis = "none";
})


const handleSaveTodo = (pressEnter) => {

    if (pressEnter.key === "Enter" && inputTodo.value.trim() !== "" && repitition < maxTodos) {
        pressEnter.preventDefault();

        let label1 = document.createElement("label");
        label1.textContent = inputTodo.value;
        label1.setAttribute("for", `id${repitition}`);

        let mainDiv = document.createElement("div");
        let todo1 = document.createElement("input");
        todo1.setAttribute("type", "checkbox");
        todo1.setAttribute("id", `id${repitition}`);
        mainDiv.style.display = "flex";
        mainDiv.style.gap = "2%";


        todo1.addEventListener("change", function(checkEvent) {
            let checkbox = checkEvent.target;
            let label1 = document.querySelector(`label[for="${checkbox.id}"]`);

            if (checkbox.checked) {
                label1.style.textDecoration = "line-through";

                mainDiv.classList.add('main-goal-fadeaway')

                setTimeout(() => {
                    mainDiv.classList.remove('main-goal-fadeaway')
                    mainDiv.remove()
                }, 1500);
            } else {
                label1.style.textDecoration = "none";
            }
        });

        mainDiv.appendChild(todo1);
        mainDiv.appendChild(label1);

        localStorage.setItem('todoList', mainDiv)

        todoList.appendChild(mainDiv);
        repitition++;
        inputTodo.value = "";
    }

};

todoForm.addEventListener("keydown", handleSaveTodo)



let quoteList = [
    {
        Quote: "The Lord is on my side; I will not fear.",
        Verse: "Psalm 118:6"
    },
    {
        Quote: "Draw near to God, and he will draw near to you.",
        Verse: "James 4:8"
    },
    {
        Quote: "Blessed is the one who trusts in the Lord.",
        Verse: "Jeremiah 17:7"
    },
    {
        Quote: "In all things, give thanks.",
        Verse: "1 Thessalonians 5:18"
    },
    {
        Quote: "So much to be grateful for.",
        Verse: "Psalm 23"
    },
    {
        Quote: "The Lord is my shepherd; I shall not want.",
        Verse: "Psalm 23:1"
    },
    {
        Quote: "I can do all things through Christ who strengthens me.",
        Verse: "Philippians 4:13"
    },
    {
        Quote: "For I know the plans I have for you, declares the Lord.",
        Verse: "Jeremiah 29:11"
    },
    {
        Quote: "The joy of the Lord is your strength.",
        Verse: "Nehemiah 8:10"
    },
    {
        Quote: "Be strong and courageous. Do not be afraid.",
        Verse: "Joshua 1:9"
    },
    {
        Quote: "The steadfast love of the Lord never ceases.",
        Verse: "Lamentations 3:22"
    },
    {
        Quote: "Cast all your anxiety on Him because He cares for you.",
        Verse: "1 Peter 5:7"
    },
    {
        Quote: "God is our refuge and strength, an ever-present help in trouble.",
        Verse: "Psalm 46:1"
    },
    {
        Quote: "With God all things are possible.",
        Verse: "Matthew 19:26"
    },
    {
        Quote: "Trust in the Lord with all your heart and lean not on your own understanding.",
        Verse: "Proverbs 3:5"
    }
];


let randomiser = Math.floor(Math.random() * quoteList.length);
let randomQuote = quoteList[randomiser].Quote;
let randomVerse = quoteList[randomiser].Verse;
let quoteDiv = document.createElement("div");
quoteDiv.className = 'quoteContainer'
let verseDiv = document.createElement("div");

quoteDiv.textContent = randomQuote;
verseDiv.textContent = randomVerse;
quote.appendChild(quoteDiv);
quote.appendChild(verseDiv);
quoteDiv.style.whiteSpace = "nowrap";

const defaultFS = window.matchMedia("(min-width: 1000px)");
const firtScreenSizeChange = window.matchMedia("(max-width: 1000px) and (min-width: 801px)");
const secondScreenSizeChange = window.matchMedia("(max-width: 800px) and (min-width: 601px)");
const thirdScreenSizeChange = window.matchMedia("(max-width: 600px) and (min-width: 401px)");

function fonts() {
    if(defaultFS.matches){
        quoteDiv.style.fontSize = "25px";
    } else if(firtScreenSizeChange.matches){
        quoteDiv.style.fontSize = "20px";
    } else if(secondScreenSizeChange.matches){
        quoteDiv.style.fontSize = "18px";
    } else {
        quoteDiv.style.fontSize = "16px";
    }
}
fonts();

defaultFS.addEventListener("change", function(defaultFS){
    if (defaultFS.matches) {
        quoteDiv.style.fontSize = "25px";
        }     
})
firtScreenSizeChange.addEventListener("change", function(firtScreenSizeChange){
    if (firtScreenSizeChange.matches) {
        quoteDiv.style.fontSize = "20px";
        }     
})
secondScreenSizeChange.addEventListener("change", function(secondScreenSizeChange){
    if (secondScreenSizeChange.matches) {
        quoteDiv.style.fontSize = "18px";
        }     
})
thirdScreenSizeChange.addEventListener("change", function(thirdScreenSizeChange){
    if (thirdScreenSizeChange.matches) {
        quoteDiv.style.fontSize = "16px";
        }     
})

quoteEllipsis.addEventListener("mouseenter", function(){
    quoteEllipsis.style.background = 'rgba(245, 245, 245, 0.3)';
    quoteEllipsis.addEventListener("mouseleave", function(){
        quoteEllipsis.style.background = "none";
    });
});

bottomMiddle.addEventListener("mouseenter", function(){
    if( newQuoteEntered === true) {
        quoteEllipsis.style.display = "flex";
        bottomMiddle.addEventListener("mouseleave", function(){
            quoteEllipsis.style.display = "none";
            toolTipText.style.display = "none";
        })
    }
})

quoteEllipsis.addEventListener("click", function () { //once ellipsis is clicked,
    if (toolTipText.style.display === "flex") {
        hideTooltipText();      
    } else {
        showTooltipText();  
    }
});

const showTooltipText = () => {
        toolTipText.style.display = "flex";
        bubbleTextTodo.style.display = "none"
        todoForm.style.display = "none";
}

const hideTooltipText = () => {
    toolTipText.style.display = "none";
}

refresh.addEventListener("mouseenter",function(){
    refresh.style.background = "rgba(229,229,228,4)";
    refresh.addEventListener("mouseleave",function(){
        refresh.style.background = "rgb(253,253,253)";
    })
})

personalise.addEventListener("mouseenter",function(){
    personalise.style.background = "rgba(229,229,228,4)";
    personalise.addEventListener("mouseleave",function(){
        personalise.style.background = "rgb(253,253,253)";
    })
})

function updateQuote() {
    let randomiser = Math.floor(Math.random() * quoteList.length);
    let randomQuote = quoteList[randomiser].Quote;
    let randomVerse = quoteList[randomiser].Verse;

    quoteDiv.textContent = randomQuote;
    verseDiv.textContent = randomVerse;
}
setInterval(updateQuote, 60000);

toolTipText.addEventListener("mouseleave",function(){
    toolTipText.style.display = "none";
})

refresh.addEventListener("click", function(){
    if(inputQuote.style.display = "flex"){
    let randomiser = Math.floor(Math.random() * quoteList.length);
    let randomQuote = quoteList[randomiser].Quote;
    let randomVerse = quoteList[randomiser].Verse;
    quoteDiv.textContent = randomQuote;
    verseDiv.textContent = randomVerse;

    quoteDiv.style.display = "flex"
    verseDiv.style.display = "flex"
    personaliseQuote.style.display = "none";

    } else {
        
        let randomiser = Math.floor(Math.random() * quoteList.length);
        let randomQuote = quoteList[randomiser].Quote;
        let randomVerse = quoteList[randomiser].Verse;
    
        quoteDiv.textContent = randomQuote;
        verseDiv.textContent = randomVerse;
    }
});

personalise.addEventListener("click",function(){
    toolTipText.style.display = "none";
    quoteDiv.style.display = "none";
    verseDiv.style.display ="none";
    personaliseQuote.style.display = "flex";
    newQuote.style.display = "none";


});

let newQuoteEntered = true

inputQuote.addEventListener("keydown", function(enterQuote){

    if (enterQuote.key === "Enter" && this.value.trim() !== "" && newQuoteEntered) {
        enterQuote.preventDefault();
        this.style.display = "none";
        newQuote = document.createElement("div");
        newQuote.innerText = this.value.trim();
        personaliseQuote.appendChild(newQuote);
        // peronsaliseQuote.insertBefore(newQuote, quote.inputPersonalise); // nilagay ko sa loob ng greetingname yung greetinginput

        newQuote.style.whiteSpace = "nowrap";
        quoteEllipsis.style.display = "none"
        quoteDiv.style.display = "none";
        verseDiv.style.display ="none";
        }

        newQuote.style.display = "flex";
        newQuote.style.justifyContent = "center";
        newQuote.style.alignItems = "center";

        newQuote.style.fontSize = "25px";
        newQuote.style.whiteSpace = "wrap";
        newQuote.style.maxWidth = "500px";

        newQuoteEntered = false;
})


function bglists(){
    const backgrounds = [
        'url("https://wallpapers.com/images/hd/pacific-island-coral-reef-hok73i2u0h6ve3uu.jpg")',
        'url("https://wallpapercave.com/wp/ReDBvXB.jpg")',
        'url("https://c4.wallpaperflare.com/wallpaper/129/691/612/coral-reef-fish-ocean-water-wallpaper-preview.jpg")',
        'url("https://images6.alphacoders.com/561/thumb-1920-561853.jpg")',
        'url("https://img.freepik.com/free-photo/3d-rendering-cartoon-like-dog_23-2150780984.jpg")',
        'url("https://dogtime.com/wp-content/uploads/sites/12/2023/07/GettyImages-936521948.jpg?resize=1200,630")',
        'url("https://wallpapers.com/images/hd/puppy-background-wjo0p1kuhrluyl4w.jpg")',
        'url("https://t3.ftcdn.net/jpg/06/26/16/58/360_F_626165821_8RRKhypLWBlAfrYW5HZ9zCMLJjPumc8r.jpg")',
        'url("https://wallpapers.com/images/hd/super-cute-rottweiler-puppy-fqgyb2baq1hbms32.jpg")',
        'url("https://static.vecteezy.com/system/resources/thumbnails/028/115/207/small_2x/cute-dog-on-pet-themed-background-ai-generative-free-photo.jpg")',
    ]
    randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    screen.style.backgroundImage = randomBg;
    screen.style.transition = "2s";
}
setInterval(bglists,30000);






// Call the updateTime function initially to set the time


// middle.style.display="none"







