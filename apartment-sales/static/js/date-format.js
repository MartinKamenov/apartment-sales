function formatDate(date) {
    var monthNames = [
        "Януари", "Февруари", "Март",
        "Април", "Май", "Юли", "Юни",
        "Август", "Септември", "Октомври",
        "Ноември", "Декември"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
