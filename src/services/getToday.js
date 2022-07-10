function GetToday(){
    return new Date().toISOString().replace(/T.*/,'').split('-').join('-');
}

function getDatesBetween(startDate , endDate){
    let dates = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
  
    dates = dates.map(date =>{ 
      return date.toISOString().replace(/T.*/,'').split('-').join('-');
    })

    return dates;
}

function getfirstLast(){
    let wDate = new Date();
    let dDay = wDate.getDay() > 0 ? wDate.getDay() : 7;
    let first = wDate.getDate() - dDay + 1;
    let firstDayWeek = new Date(wDate.setDate(first));
    let lastDayWeek = new Date(wDate.setDate(firstDayWeek.getDate()+6));
    return {
        firstDayWeek,
        lastDayWeek
    }
}

function moment(date){
    let dDate = new Date(date);
    let month  = dDate.toLocaleString('en-us' , {month : "long"});
    return dDate.getDate() + " " + month
}


module.exports = {
    getfirstLast,
    getDatesBetween,
    GetToday,
    moment
}
