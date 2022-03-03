const stopName = document.querySelector('#Hero .searchBarTwo #stopName');
const searchBtn = document.querySelector('#Hero .SearchBarOne .btn');
const cardBox = document.querySelector('#BusOption .box')
//Listening btn
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cardBox.innerHTML =" ";
    getBusesdata().then((data) => {
        if (data.status == 'Unsuccess') {
            alert(" 2 Server problem we will back in some time")
        } else {
            if (data.info.length == 0) {
                alert("Stop is not in Database");
            } else {
                data.info.forEach(ele => {
                    checkstops(ele)
                });

            }
        }
    }).catch(() => {
        alert("Server problem we will back in some time")
    })
})

const checkstops = (data) => {
    let flage = 0;
    data.stops.forEach((ele) => {
        if (stopName.value.toLowerCase() === ele) {
            flage = 1;
        }
    })
    if (flage === 1) {
        updateUI(data);
    }
}

const updateUI = (data) => {
    cardBox.innerHTML += ` <div class="busHeader">
    <div class="icon">
        <img src="image/busIcon.png" alt="">
    </div>
    <div class="info">
        <h4><p id="busNo">${data.busNo}</p><span>${data.isAC}</span></h4>
        <h5><span id="start">${data.startStop}</span> - <span id="end">${data.endStop}</span></h5>
    </div>
</div>`
}











const getBusesdata = async () => {
    const res = await fetch('/support/getBusInfo')
    const getBusesRes = await res.json()
    return getBusesRes;
}