//get DOM
//********data DOM
const driverId = document.querySelector('.formMain .inputs #driverId');
const busNum = document.querySelector('.formMain .inputs #busNo');
const vehicleNum = document.querySelector('.formMain .inputs #vehicleNo');
const startStop = document.querySelector('.formMain .inputs #startStop');
const button = document.querySelector('.formMain .inputs .Sendbtn .submitBtn');

button.addEventListener('click',()=>{
    console.log(driverId);
    console.log(busNum);
    console.log(vehicleNum);
    console.log(startStop);

})
