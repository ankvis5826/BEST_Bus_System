
const busNumber = document.querySelector("#busNo");
const btn = document.querySelector(".btn");
const htmlBox = document.querySelector("#BusTrackOption .box");
btn.addEventListener('click', async () => {
    //geting data from database
    busNum = busNumber.value;
    const busesdata = await getBusesbyNum(busNum);
    if (busesdata.status === 'Unsuccess') {
        alert('error in busdata');
        return;
    }

    //data check
    if (busesdata.info.length === 0) {
        alert("no bus is there");
        return;
    }
    console.log(busesdata.info);
    updateUI(busesdata.info)
})

const getBusesbyNum = async (num) => {
    const res = await fetch(`/support/getBusInfoByNum?num=${num}`)
    const getBusesRes = await res.json()
    return getBusesRes;
}

const updateUI = (data) => {
    
    htmlBox.innerHTML = " ";
    data.forEach((ele) => {
        htmlBox.innerHTML += ` <div class="busHeader">
        <div class="icon">
            <img src="image/busIcon.png" alt="">
        </div>
        <div class="info">
            <h4><p id="busNo">${ele.busNo}</p><span>${ele.isAC}</span></h4>
            <h5><span id="start">${ele.startStop}</span> - <span id="end">${ele.endStop}</span></h5>
        </div>
    </div>`;
    })
    addListener();
}

const addListener = ()=>{
    const busBar = document.querySelectorAll('#BusTrackOption .box .busHeader');
    busBar.forEach((ele)=>{
       ele.addEventListener('click',(e)=>{
         const  busNum= ele.querySelector('#busNo').innerHTML;
         const start=ele.querySelector('#start').innerHTML;
         const end=ele.querySelector('#end').innerHTML;
         makeMapReq(busNum.toLowerCase(),start.toLowerCase(),end.toLowerCase())
       })
    })
}



const makeMapReq =  (busNo,startstop,endstop)=>{  
  let isTrackPage = window.location.href;
  if(isTrackPage.search('TrackBus')>=0){
    isTrackPage = 'true';
  }else{
    isTrackPage = 'false';
  }
 location.href= `/support/addmapInfo?busNo=${busNo}&startstop=${startstop}&endstop=${endstop}&totrack=${isTrackPage}`;
}
