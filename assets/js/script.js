let  todaysDate = (dayjs().format("dddd MM/DD/YYYY, hh:mm A"));
let hours = [];

//Set current day in header
$("#currentDay").text(todaysDate);

//Generates array to hold working hours (i starts at 9 and ends at 5 military to account for a 9-5 schedule.)
for (i = 9; i < 18; i++) {
    let hoursObj = {hour: i,
                    shown: dayjs().set('hour', i).format("ha")
                    }
    hours.push(hoursObj);
};

//Creates each hour block
function createTimeBlocks () {
    //Creates div to hold columns
    $(".container").append("<div class = 'row'></div>")

    //Creates 3 columns in row div
    for (i = 0; i < hours.length; i++) {
        $(".row").append(
            "<div class = 'col-2 hour'>" + hours[i].shown + "</div>",
            "<div class = 'col-8'><textarea class = 'time-block' id = "+ 'text' + i + "></textarea></div>",
            "<div class = 'col-2'><button class = 'saveBtn' id =" + 'button' + i + "></button></div>"
            );

            $("#button" + i).on("click", saveText)
           
        //Checks time and marks second column with proper color for past/present/future 
        if (hours[i].hour < dayjs().hour()) {
            $(".time-block").addClass("past");
        }else if (hours[i].hour === dayjs().hour()) {
            $(".time-block").last().addClass("present");
        } else {
            $(".time-block").last().addClass("future");
        } 
    };
};

function saveText () {
    for (i = 0; i < hours.length; i++) {
        localStorage.setItem(("text" + i) , $("#text" + i).val());
    }
};

createTimeBlocks();