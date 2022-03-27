//get DOM


//********data DOM
const driverId = document.querySelector('.formMain .inputs #driverId');
const busNum = document.querySelector('.formMain .inputs #busNo');
const vehicleNum = document.querySelector('.formMain .inputs #vehicleNo');
const startStop = document.querySelector('.formMain .inputs #startStop');
const button = document.querySelector('.formMain .inputs .Sendbtn .submitBtn');

//system variable 
let flage = 0;
let intervalCall;
let data;

button.addEventListener('click', () => {
    if(driverId.value.length===0||busNum.value.length===0||vehicleNum.value.length===0||startStop.value.length===0){
        alert("check you input");
        return;
    }
    if (!flage) {
        startRide();
    } else {
        stopRide()
    }
})


function startRide(){
    button.innerHTML = "Stop";
        flage = 1;

        //disable input function  
        inputDisable();
        updateLoc();

}

function stopRide(){
    button.innerHTML = "Start Ride";
    flage = 0;
    //Undisable input function  
    clearInterval(intervalCall);
    deleteLiveBus();
    inputUnDisable();
}



async function updateLoc() {
    intervalCall = setInterval(()=>{
        userLoc();
    },9000)
}

//for user location
function userLoc() {
    navigator.geolocation.getCurrentPosition((position) => {
        data = {
            dId:driverId.value,
            busNo:busNum.value,
            vehicleNo:vehicleNum.value,
            startStop:startStop.value,
            liveLoc:{ lat: position.coords.latitude, lng: position.coords.longitude}
        } 
        console.log("hello");
        fetch('/update/liveBus2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((data)=>{
           console.log('Good');
        }).catch((error)=>{
            alert("server down We will back in some time")
            stopRide();
        })
    }, (error) => {
        alert(error.message);
        stopRide();
    });

}



//deleteing live buses 
function deleteLiveBus(){
    fetch('/update/deleteBus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}



function inputDisable() {
    driverId.disabled = true;
    busNum.disabled = true;
    vehicleNum.disabled = true;
    startStop.disabled = true;
}

function inputUnDisable() {
    driverId.disabled = false;
    busNum.disabled = false;
    vehicleNum.disabled = false;
    startStop.disabled = false;
}



