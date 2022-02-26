const BusNo = getCookie('num');
const startStop=getCookie('start');
const endStop= getCookie('end');

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(ele) {
      let [key,value] = ele.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName].replace('%20',' ');
}
const getBusData = async()=>{
    const res = await fetch(`/support/getBusInfoByNumAndStartEnd?num=${BusNo}&start=${startStop}&end=${endStop}`)
    const getBusesRes = await res.json()
    return getBusesRes;
}










