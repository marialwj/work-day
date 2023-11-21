
var localeSettings = {};
  dayjs.locale(localeSettings);
  $(function () {
    // Get the current hour of the day using the dayjs library.
    var currentHour = dayjs().format('H');
  // The function below changes the color of each time block based on whether it's in the "past, present, or future" relative to the current hour.
    function hourlyColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // The  function below will save the user's input in a textarea to localStorage 
    function textEntry() {
      $('.saveBtn').on('click', function() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // The function below will refresh the color of each time block based on whether it's in the past(grey), present(red), or future(green) relative to the current time. 
    function refreshColor() {
      $('.time-block').each(function() {
        console.log("this.id", this.id)
        var blocknumber = this.id.split("-")[1]
        var blockHour = parseInt(blocknumber);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      })
    };
    // This will get the user input from the localStorage and set textarea values for each time block.
    $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    function updateTime() {
      var dateElement = $('#date');
      var timeElement = $('#time');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
    
    hourlyColor();
    textEntry();                
    refreshColor();
    // This will update the time once per second for the current time once per second using setInterval() 
    // giving my beautiful diplay header a live time hours, minues and seconds coutner
    setInterval(updateTime, 1000);
  });