const BusNo = getCookie('num');
const startStop = getCookie('start');
const endStop = getCookie('end');

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function (ele) {
        let [key, value] = ele.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName].replace('%20', ' ');
}

const getBusData = async () => {
    const res = await fetch(`/support/getBusInfoByNumAndStartEnd?num=${BusNo}&start=${startStop}&end=${endStop}`)
    const getBusesRes = await res.json()
    return getBusesRes;
}

function initMap() {


    let options = {
        center: { lat: 19.193357, lng: 72.874343 },
        zoom: 16,
    }
    map = new google.maps.Map(document.getElementById("mapDiv"), options);

    // ---------------------getting UI Update---------------------
    getBusData().then((data) => {
        if (data.status !== "Success") {
            alert(" 1 server Proble we are back in some time")
        } else {
            updateInfoUI(data.info[0]);
            plotmarker(data.info[0]);
        }
    })
    const plotmarker = (busData) => {
        busData.stopGeoLoc.forEach((ele, i) => {
            getMarker(ele.lat, ele.lng, "./image/bus-stop-map.png", busData.stops[i]);

        })
    }
}



const getMarker = (lat, lng, icon, info) => {
    lat = Number(lat);
    lng = Number(lng);
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon
    });
    if (info) {
        var infoWindos = new google.maps.InfoWindow({
            content: info
        });
        marker.addListener('click', () => {
            infoWindos.open(map, marker)
        })
    }
}

// function getLocation() {
//         navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                      console.log(position.coords.latitude + " " + position.coords.longitude)
//                      getMarker(position.coords.latitude, position.coords.longitude,"./image/userLoc.png","me");

//                 });
// }


// ---------------------UI Update---------------------
const updateInfoUI = (busData) => {
    busHeaderUpdate(busData.busNo, busData.isAC, busData.startStop, busData.endStop)
    busStopUpdate(busData.stops);
}


const busHeaderUpdate = (num, isAC, start, end) => {
    document.querySelector("#Map .stopInfo .head").innerHTML = ` <div class="busHeader">
    <div class="icon">
        <img src="image/busIcon.png" alt="">
    </div>
    <div class="info">
        <h4><p id="busNo">${num}</p><span>${isAC}</span></h4>
        <h5><span id="start">${start}</span> - <span id="end">${end}</span></h5>
    </div>
</div>`;

}

const busStopUpdate = (stops) => {
    stops.forEach((ele) => {
        document.querySelector("#Map .stopInfo .stopNameBox").innerHTML += `<div class="stop">
        <img src="image/bus-stop.png" alt="">
        <h3>${ele}</h3>
    </div>`
    })
}


//this is for the back btn
const backBtn = document.querySelector('.backBtn');

backBtn.addEventListener('click', (e) => {
    window.history.back();
})