/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';
// const apiKey = 'a9d1d20082309c8b565331ffde14f207&units=imperial';
const apiKey = 'a9d1d20082309c8b565331ffde14f207'
document.addEventListener('click',(event)=>{
    if (event.target.nodeName == 'BUTTON'){
        // console.log(document.getElementById('zip'));
        // console.log(document.getElementById('zip').value);
        let zipCode = document.getElementById('zip').value;
        // console.log(zipCode);
        let feeling = document.getElementById('feelings').value;
        // console.log(feeling);

        // getData(baseURL,zipCode, apiKey)
        getData(baseURL+apiKey)
        .then(function(data){
            postData('/add', {temp:data.temp,date:newDate, feel:feeling});
            // console.log(data);
            retrieveData()
        })
    }
})

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



const postData = async(url='', data = '')=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error' + error);
    }

}

 const getData = async (url)=>{
    console.log(url)
    const res = await fetch(url);
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error'+error);
    }
}

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }