let data = [{time: "", status: ""}];
const workType = document.getElementById('work-type');
const workTime = document.getElementById('work-time');
let table = document.querySelector("table");
const workForm = document.getElementById('work-form');

workType.addEventListener('change', function () {
    data = generateData();
    let header = Object.keys(data[0]);
    generateTable(table, data);
    generateTableHead(table, header);
});

workTime.addEventListener('input', function () {
    data = generateData();
    let header = Object.keys(data[0]);
    generateTable(table, data);
    generateTableHead(table, header);
});


function generateData() {
    if (!workForm.checkValidity()) {
        workForm.reportValidity();
        return [{time: "", status: ""}];
    }

    let type = workType.value;
    let time = workTime.value;

    if (!type || !time) {
        return [{time: "", status: ""}];
    }

    let result = [];


    let startTime = 6
    switch (type) {
        case "a":
            startTime = 6;
            break;
        case "b":
            startTime = 18;
            break;
        default:
            startTime = 6;
            break;
    }

    let rest = 1;

    result.push({time: formatTime(startTime), status: "Bekerja"});
    while (time > 1) {
        time--;
        startTime++;
        if (startTime > 24) {
            startTime = 0;
        }

        rest += 1;
        result.push({time: formatTime(startTime), status: "Bekerja"});

        if (rest === 3 && time > 1) {
            startTime++;
            if (startTime > 24) {
                startTime = 0;
            }

            rest = 0;
            result.push({time: formatTime(startTime), status: "Istirahat"});
        }
    }

    return result;
}

function formatTime(time){
    if (time < 10) {
        return "0" + time + ":00";
    }else{
        return time + ":00";
    }
}

function generateTableHead(table, data) {
    // clear header first
    table.deleteTHead();

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    // clear table rows first
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}


