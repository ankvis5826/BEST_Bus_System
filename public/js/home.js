
const from = document.querySelector('#Hero #from');
const to = document.querySelector('#Hero #to');
const searchBtn = document.querySelector('#Hero .btn');
let fromSource;
let toSource;
let busesData;
let busesWhichGoes = [];
//for two bus fun variable
let startStops = [];
let endStops = [];
let midStop = [];

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    busesWhichGoes = [];
    startStops = [];
    endStops = [];
    midStop= [];
    fromSource = from.value.toLowerCase();
    toSource = to.value.toLowerCase();

    if (fromSource.length <= 0 || toSource.length <= 0 || fromSource === toSource) {
        alert('Check From | To source')
        return;
    }

    busesData = await getBuses();
    if (busesData.status === 'Unsuccess') {
        alert('error in busdata');
        return;
    }
    //for one bus only 
    busesData.info.forEach((busobj, index) => {
        checkBuses(busobj.stops, index, fromSource, toSource);
    })
    //for more ten one buses
    if(busesWhichGoes.length==0){
        
        twoBus(fromSource,toSource);
    }
    updateUI();

})


//for one bus only 
const checkBuses = (stops, index, from, to) => {

    for (let i = 0; i < stops.length - 1; i++) {

        if (from == stops[i]) {
            //console.log('in if')
            for (let j = i + 1; j < stops.length; j++) {
                //  console.log('sec for');
                if (to == stops[j]) {
                    busesWhichGoes.push(index);
                }
            }
        }
        //console.log('out of if')
    }
}

const getBuses = async () => {
    const res = await fetch('/support/getBusInfo')
    const getBusesRes = await res.json()
    return getBusesRes;
}


//this for the two bus only
const twoBus = (from,to)=>{
    busesData.info.forEach((element, index) => {
        toGetStart(element.stops, index,from)
        toGetEnd(element.stops, index,to)
    });
    toGetMid();
}

const toGetStart = (stops, index,from) => {
    for (let i = 0; i < stops.length - 1; i++) {
        if (stops[i] == from) {
            startStops.push({ busindex: index, stopIndex: i })
            return;
        }
    }
}
const toGetEnd = (stops, index,to) => {
    let flag = false;
    startStops.forEach(ele=>{
        if(index ==ele.busindex && !flag){
            flag = true;
            return;
        }
    })

    if(flag){
        return;
    }

    for (let i = 0; i < stops.length; i++) {

        if (stops[i] == to) {
            endStops.push({ busindex: index, stopIndex: i })
            return;
        }
    }
}


const toGetMid = () => {
    startStops.forEach((startEle) => {
        endStops.forEach((endEle) => {
            //for start
            let startBusIndex = startEle.busindex;
            let startStopIndex = startEle.stopIndex;

            //for end
            let endBusIndex = endEle.busindex;
            let endStopIndex = endEle.stopIndex;

            //getting mid stop
            let startStopsList = busesData.info[startBusIndex].stops;
            let endStopsList = busesData.info[endBusIndex].stops;
            // flag for break from nested loop
            let flag = false;
            //test
            //console.log(startStopsList +"\n-------------\n"+endStopsList);
            for (let i = startStopIndex; i < startStopsList.length && !flag; i++) {
                for (let j = 0; j < endStopIndex; j++) {
                    //console.log(startStopsList[i] +"-------"+endStopsList[j]);   
                    if(startStopsList[i]===endStopsList[j]){
                        midStop.push({startBus:startBusIndex,endBus:endBusIndex,midStop:startStopsList[i]});
                        flag = true;
                        break;
                    }
                }
            }

        })
    })
}



//this is for the UI update
const updateUI = () => {
    let busCard = document.querySelector('#BusInfoCard');
    if (busesWhichGoes.length <= 0 && midStop.length <= 0) {
        busCard.innerHTML = `<h1>Sorry No Bus in the System</h1>`
        return
    }
    busCard.innerHTML = " ";
    busesWhichGoes.forEach((i) => {
        busCard.innerHTML += `<div class="busCard">
        <div class="cardTop">
            <div class="cardTopTitle">
                <span>Bus Number </span>
                <span>Ticket Price </span>
            </div>
            <div class="cardTopData">
                <h4>${busesData.info[i].busNo} <span>${busesData.info[i].isAC}</span> </h4>
                <h4>${busesData.info[i].maxPrice} <span>RS</span>
                </h4>
            </div>
        </div>
        <div class="cardBody">
            <div class="busInfo from">
                <div class="stop">
                    <img src="image/busIcon.png" alt="">
                    <span>${fromSource}</span>
                </div>
                <div class="busTime">
                    <span>Time</span>
                    <div class="data">
                        <i class="far fa-clock"></i>
                        <span>12.54</span>
                    </div>
                </div>
            </div>
            <div class="time">
                <p><-<span>---</span></p>
            </div>
            <div class="busInfo to">
                <div class="stop">
                    <img src="image/bus-stop.png" alt="">
                    <span>${toSource}</span>
                </div>
                <div class="busTime">
                    <span>Time</span>
                    <div class="data">
                        <i class="far fa-clock"></i>
                        <span>12.54</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })

   // this is for the two bus ui update
    midStop.forEach((ele) => {
        busCard.innerHTML +=`<div class="busCard">
        <div class="cardTop">
            <div class="cardTopTitle">
                <span>Bus Number </span>
                <span>Ticket Price </span>
            </div>
            <div class="cardTopData">
                <h4>${busesData.info[ele.startBus].busNo} <span>${busesData.info[ele.startBus].isAC}</span> </h4>
                <h4>${busesData.info[ele.startBus].maxPrice} <span>RS</span>
                </h4>
            </div>
            <div class="cardTopData">
                <h4>${busesData.info[ele.endBus].busNo} <span>${busesData.info[ele.endBus].isAC}</span> </h4>
                <h4>${busesData.info[ele.endBus].maxPrice} <span>RS</span>
                </h4>
            </div>
        </div>
        <div class="cardBody">
            <div class="busInfo from">
                <div class="stop">
                    <img src="image/busIcon.png" alt="">
                    <span>${fromSource}</span>
                </div>
                <div class="busTime">
                    <span>Time</span>
                    <div class="data">
                        <i class="far fa-clock"></i>
                        <span>12.54</span>
                    </div>
                </div>
            </div>
            <div class="time">
               <p><-<span>---</span></p>
            </div>
            <div class="busInfo to">
                <div class="stop">
                    <img src="image/bus-stop.png" alt="">
                    <span>${ele.midStop}</span>
                </div>
                <div class="busTime">
                    <span>Time</span>
                    <div class="data">
                        <i class="far fa-clock"></i>
                        <span>12.54</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider">
            <i class="fas fa-walking"></i>
            <i class="fas fa-car"></i>
        </div>
        <div class="cardBody">
            <div class="busInfo from">
                <div class="stop">
                    <img src="image/busIcon.png" alt="">
                    <span>${ele.midStop} </span>
                </div>
                <div class="busTime">
                    <span>Time</span>
                    <div class="data">
                        <i class="far fa-clock"></i>
                        <span>12.54</span>
                    </div>
                </div>
            </div>
            <div class="time">
                <p><-<span>---</span></p>
            </div>
            <div class="busInfo to">
                <div class="stop">
                    <img src="image/bus-stop.png" alt="">
                    <span>${toSource}</span>
                </div>
                <div class="busTime">
                    <span>Time</span>
                    <div class="data">
                        <i class="far fa-clock"></i>
                        <span>12.54</span>
                    </div>
                </div>
            </div>
        </div>
    </div>` 
    })
    
}
