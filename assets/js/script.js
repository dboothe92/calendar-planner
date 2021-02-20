let hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

//Creates eachhour block
    $(".container").append("<div class = 'row'></div>")
    for (i = 0; i < hours.length; i++) {
        $(".row").append(
            "<div class = 'col-2 hour'>" + hours[i] + "</div>",
            "<div class = 'col-8'><textarea class = 'time-block'></textarea></div>",
            "<div class = 'col-2'><button class = 'saveBtn'><span class='oi oi-aperture'></span></button></div>"
            );
    };
    