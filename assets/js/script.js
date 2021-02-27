let hours = [];
let storeText = [];


//Generates array to hold working hours (i starts at 9 and ends at 5 military to account for a 9-5 schedule.)
for (i = 9; i < 18; i++) {
    let hoursObj = {hour: i,
                    shown: dayjs().set('hour', i).format("ha")
                    }
    hours.push(hoursObj);
};

//Set current day in header and updats the clock
function updateTime() {
    let todaysDate = (dayjs().format("dddd MM/DD/YYYY, hh:mm A"));
    $("#currentDay").text(todaysDate);
    setInterval(updateTime, 1000);
};

//Creates each hour block
function createTimeBlocks () {
    //Creates div to hold columns
    $(".container").append("<div class = 'row'></div>")
    
    //Creates 3 columns in row div
    for (i = 0; i < hours.length; i++) {
        let hourlyId = "text" + i
        let btnId = "button" + i
        $(".row").append(
            "<div class = 'col-2 hour'>" + hours[i].shown + "</div>",
            "<div class = 'col-8'><textarea class = 'time-block' id = "+ hourlyId + "></textarea></div>",
            "<div class = 'col-2'><button class = 'saveBtn' id = "+ btnId +"><span class='oi oi-task'></span></button></div>"
        );
        
        //Checks time and marks second column with proper color for past/present/future 
        if (hours[i].hour < dayjs().hour()) {
            $(".time-block").addClass("past");
        }else if (hours[i].hour === dayjs().hour()) {
            $(".time-block").last().addClass("present");
        } else {
            $(".time-block").last().addClass("future");
        } 

        //Adds clickability to each button 
        $("#" + btnId).on("click", function(event) {
            event.preventDefault();
            let currentIndex = hourlyId.split('t')[2];

            //On click will add to storage array and add it to local storage
            let hourlyPlan = document.querySelector("#" + hourlyId).value;
            storeText[currentIndex] = hourlyPlan;
            localStorage.setItem("storedPlans", JSON.stringify(storeText));
        });
    };

    loadHours();
};

//function to load stored stuff from local Storage
function loadHours () {
    savedHours = JSON.parse(localStorage.getItem("storedPlans"));

    //if there is nothing in local storage setting a new empty array. 
    if(!savedHours) {
        savedHours = [];
    }
    storeText = savedHours

    //Loops through each row and adds text from storeText array.
    for(i = 0; i < hours.length; i++) {
        document.querySelector("#text" + i).value = storeText[i];
    }; 
};

createTimeBlocks();
updateTime();


