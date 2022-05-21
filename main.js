
//system time depends on events 
//random digits indicate time arrival for each customer Math.random() generates values from 0 to 1 but never 1
//simulation will run for 20 customers

let serviceTime;  //random service time from tables
let interarrivalTime; // random arrival time from tables
let arrivalTime=[]; // arrival time after checking the ranges array
let cumulativeArrivalProb=[];
let endTime=[];
let idleTime=[];
let timeServiceBegins=[];
let timeCustomerWait=[];
let timeCustomerSpends=[];
let arrivalOnClock=[];
let serviceTimeArr=[];
let customerNum=0;
let Arrcounter=0;
let Servcounter=0;
//generate dynamic arrival range
let ArrivalRanges=[];
let ServiceRanges=[];
//static inputs 
let arrivalCounter=0;
let serviceCounter=0;
let interArrivalStaticArray=[10,72,53,4,29,54,92,16,33,71];
let serviceStaticArray=[89,76,81,55,96,86,63,36,58,9];

// arrival time calculations 
let timeBetArrivals=[10,11,12,13,14,15];
console.log("time bet arrivals : "+timeBetArrivals);
let probability=[0.08,0.18,0.30,0.20,0.19,0.05];
for(let i=0;i<probability.length;i++){
    cumulativeArrivalProb[i]=probability[i];   
}
for(let j=1;j<probability.length;j++){
    cumulativeArrivalProb[j]+=cumulativeArrivalProb[j-1];
}
console.log( "cumulative Arrival Probability : "+cumulativeArrivalProb);
//generate arrival ranges from cumulative probability cumulativeArrivalProb x 100
for(let i=0;i<cumulativeArrivalProb.length;i++){
    ArrivalRanges[i]=Math.floor(cumulativeArrivalProb[i]*100);
}
console.log("Arrival ranges  "+ ArrivalRanges);

//service time prob calculations 
let serviceTimeProbability=[0.05,0.10,0.15,0.45,0.25];
let serviceCumulativeProb=[];
for(let i=0;i<serviceTimeProbability.length;i++){
    serviceCumulativeProb[i]=serviceTimeProbability[i];   
}
for(let j=1;j<serviceTimeProbability.length;j++){
    serviceCumulativeProb[j]+=serviceCumulativeProb[j-1];
}
console.log( "service time cumulative probabilty : "+serviceCumulativeProb);
// generate service time ranges 
for(let i=0;i<serviceCumulativeProb.length;i++){
    ServiceRanges[i]=Math.floor(serviceCumulativeProb[i]*100);
}
console.log("service ranges  "+ ServiceRanges);
//start table A
function arrTime(){   
// //factors
// let customerArivalFactor=Math.random();
// //random values
// let interarrivalTime=customerArivalFactor*100;

//start static adjustment 
let interarrivalTime=interArrivalStaticArray[arrivalCounter];

if(interarrivalTime>0.0 && interarrivalTime<=ArrivalRanges[0]){
    interarrivalTime=10000;
    console.log("arrival range---> 1-8 ",  interarrivalTime+" ms"); 
}else if(interarrivalTime>ArrivalRanges[0] && interarrivalTime<=ArrivalRanges[1]){
    interarrivalTime=11000;
    console.log("arrival range---> 8-26 ",  interarrivalTime+" ms");
}else if(interarrivalTime>ArrivalRanges[1] && interarrivalTime<=ArrivalRanges[2]){
    interarrivalTime=12000;
    console.log("arrival range---> 26-56 ", interarrivalTime+" ms");
}else if(interarrivalTime>ArrivalRanges[2] && interarrivalTime<=ArrivalRanges[3]){
    interarrivalTime=13000;
    console.log("arrival range---> 56-76 ", interarrivalTime+" ms");
}else if(interarrivalTime>ArrivalRanges[3] && interarrivalTime<=ArrivalRanges[4]){
    interarrivalTime=14000;
    console.log("arrival range---> 76-95", interarrivalTime+" ms");
}else if(interarrivalTime>ArrivalRanges[4] && interarrivalTime<=ArrivalRanges[5]){
    interarrivalTime=15000;
    console.log("arrival range---> 95-100", interarrivalTime+" ms");
}  
   //add interarrival time values to arivalTime array & increment counter 
   arrivalTime[Arrcounter]=interarrivalTime/1000;
   Arrcounter++;
   console.log("Arrival time Table "+arrivalTime);
   arrivalCounter++;
    return interarrivalTime;
}

 //start service time table B

//end tables code
function servTime(){
//  serviceTimeFactor=Math.random();
//  serviceTime=serviceTimeFactor*100;

//start static service time 
let serviceTime=serviceStaticArray[serviceCounter];
if(serviceTime>0.0 && serviceTime<=ServiceRanges[0]){
    serviceTime=15000;
    console.log("service range---> 1-5 ",  serviceTime+" ms"); 
}else if(serviceTime>ServiceRanges[0] && serviceTime<=ServiceRanges[1]){
    serviceTime=16000;
    console.log("service  range---> 5-15 ",  serviceTime+" ms");
}else if(serviceTime>ServiceRanges[1] && serviceTime<=ServiceRanges[2]){
    serviceTime=17000;
    console.log("service range---> 15-30 ",  serviceTime+" ms");
}else if(serviceTime>ServiceRanges[2] && serviceTime<=ServiceRanges[3]){
    serviceTime=18000;
    console.log("service range---> 30-75 ",  serviceTime+" ms");
}else if(serviceTime>ServiceRanges[3] && serviceTime<=ServiceRanges[4]){
    serviceTime=19000;
    console.log("service range---> 75-100 ",  serviceTime+" ms");
}
   //add interarrival time values to arivalTime array & increment counter 
   serviceTimeArr[Servcounter]=serviceTime/1000;
   Servcounter++;
   serviceCounter++;
   console.log("Service Time Table "+serviceTimeArr);
    return serviceTime;
}
//arrival on the clock calculation 
function getArrivalTime(){
    //check arrivalTime length 
    let j=0;
    if(customerNum===0){
        arrivalOnClock[0]=customerNum;
    }else{
        for(let i=1;i<arrivalTime.length;i++){
            arrivalOnClock[i]=arrivalTime[i]+arrivalOnClock[j];
            j++;
        }
    }
    console.log(arrivalOnClock);
    return arrivalOnClock;

}
function fillTableVals(){
        for (i = 0; i <= customerNum; i++) {
            if (i == 0) { // first service
                endTime[i] = serviceTimeArr[i];
                timeCustomerSpends[i] = serviceTimeArr[i];
                idleTime[i]=0;
                timeCustomerWait[i]=0;
                timeServiceBegins[i]=arrivalOnClock[0];
            } else { // next services
                if (endTime[i - 1] >= arrivalOnClock[i]) { // customer waiting
                    timeServiceBegins[i] = endTime[i - 1];
                    timeCustomerWait[i] = endTime[i - 1] - arrivalOnClock[i];
                    timeCustomerSpends[i] = serviceTimeArr[i] + timeCustomerWait[i];
                    idleTime[i]=0;
                } else { // server idle
                    idleTime[i] = arrivalOnClock[i] - endTime[i - 1];
                    timeServiceBegins[i] = arrivalOnClock[i];
                    timeCustomerSpends[i] = serviceTimeArr[i];
                    timeCustomerWait[i]=0;
                }
                endTime[i] = timeServiceBegins[i] + serviceTimeArr[i]; // calculate end time after service
            }
        }

    console.log("time service ends "+endTime);
    console.log("timeCustomerSpends "+timeCustomerSpends);
    console.log("timeServiceBegins "+timeServiceBegins);
    console.log("time customer wait  "+timeCustomerWait);
    console.log("idleTime "+idleTime);
}
//**************************************** UI CODE *****************************************************//

//start button 
let startBtn=document.getElementById('start');
startBtn.addEventListener('click',function(){
    // for(let i=0;i<10;i++){}
        serviceTime=servTime();
        interarrivalTime=arrTime();
        setTimeout(arrival,interarrivalTime);
        getArrivalTime();
        fillTableVals();
        addElemToTable(); 
        AvgWaitingTime(); 
        probabilityWait();
        probabilityIdleServer();
        avgServiceTime(); 
        averageTimeBetArrivals();
        AvgWaitingOfThoseWhoWait();
        avgTimeCustomerSpends(); 
});

//reset button 
let resetBtn=document.getElementById('reset');
resetBtn.addEventListener('click',function(){
    window.location.reload();  
});

//departed customers 
let departedCustomers=parseInt(document.getElementById('departed').innerText);
//customers in queue
let queue=document.getElementById('queue');
console.log('current customers in queue '+queue.innerText);

//join queue (event)
let customersInQueue=parseInt(document.getElementById('queue').innerText);
function joinQueue(customersInQueue){
         customersInQueue=parseInt(document.getElementById('queue').innerText)+1;
         queue.innerText=customersInQueue;
         return true;
};
// calculate average waiting time
function AvgWaitingTime(){
    let totalCustomerWait=0;
    for(let i=0;i<timeCustomerWait.length;i++){
    totalCustomerWait+=timeCustomerWait[i];
    }
    console.log("totalCustomerWait "+totalCustomerWait);
    console.log("average waiting time  "+totalCustomerWait/customerNum);  
}
// probability wait 
function probabilityWait(){
    let waitingCustomers=0;
    for(i=0;i<timeCustomerWait.length;i++){
        if(timeCustomerWait[i]>0){
            waitingCustomers++;
        }
    }
    console.log("probability wait "+waitingCustomers/customerNum);
}
// probability of idle server 
function probabilityIdleServer(){
    let totalIdleTime=0;
    let totalEndTime=0;
    for(i=0;i<idleTime.length;i++){
        if(idleTime[i]>0){
            totalIdleTime+=idleTime[i];
        }
    }
    for(let i=0;i<endTime.length;i++){
        totalEndTime+=endTime[i];

    }

    console.log("probability of idle server "+totalIdleTime/totalEndTime);
}
//average service time 
function avgServiceTime(){
    let totalServiceTime=0;
    for(let i=0;i<serviceTimeArr.length;i++){
        totalServiceTime+=serviceTimeArr[i];
    }
  console.log("average service time " +totalServiceTime/customerNum);
};
//average time between arrivals 
function averageTimeBetArrivals(){
    //Recheck Logic!!!!!
    let totalTimeBetArrivals=0;
    for(let i=0;i<arrivalTime.length;i++){
        totalTimeBetArrivals+=arrivalTime[i];
    }
    console.log("average time between arrivals "+ totalTimeBetArrivals/customerNum);
}
// average waiting time of those who wait 
function AvgWaitingOfThoseWhoWait(){
    let totalCustomersWhoWait=0;
    let customersWaitTime=0;
    for(let i=0;i<timeCustomerWait.length;i++){ 
        customersWaitTime+=timeCustomerWait[i];
        if(timeCustomerWait[i]>0){
            totalCustomersWhoWait++;
           }
     } 
    console.log("average waiting time of those who wait  "+customersWaitTime/totalCustomersWhoWait);  
}
// average time customer spends in the system 
function avgTimeCustomerSpends(){
    let totalSpentTime=0;
    for(let i=0; i<timeCustomerSpends.length;i++){
        totalSpentTime+=timeCustomerSpends[i];
    }
    console.log("average time customer spends in the system  "+ totalSpentTime/customerNum);
}

function beginService(){
    setTimeout(changeServStat,serviceTime); 
}

function changeServStat(){
    let serverStat=document.getElementById('server-status').innerText.toLocaleLowerCase();
    let currentCustomers=parseInt(document.getElementById('customers-in-system').innerText); 
    if(serverStat==='idle'&& customersInQueue>0 ){
        document.getElementById('server-status').innerText='busy';
        departedCustomers++;
        customersInQueue--;
        document.getElementById('queue').innerText=customersInQueue;
        beginService();         
    }else if(serverStat==='busy'&& customersInQueue===0 && currentCustomers===0 ){
        document.getElementById('server-status').innerText='idle';
    }else if(serverStat==='busy'&& customersInQueue>=0 && currentCustomers>0){
        currentCustomers--;
        document.getElementById('queue').innerText=customersInQueue;
        departedCustomers++;
        beginService();    
    }else if(serverStat==='busy'&& customersInQueue>=0 && currentCustomers>0){
        joinQueue(customersInQueue);

    }else if(serverStat==='idle'&& customersInQueue>0 && customersinSys>=0){
        document.getElementById('server-status').innerText='busy';
        customersInQueue--;
        departedCustomers++;
        beginService();      
    } 
    //set new departed customer value 
    document.getElementById('departed').innerText=departedCustomers;
    //set customers in system 
    document.getElementById('customers-in-system').innerText=currentCustomers;
    console.log('customer departed');
    if(currentCustomers===0){
        document.getElementById('server-icon').classList.remove('busy');
        document.getElementById('server-status').innerText='idle';
    }else{
        document.getElementById('server-icon').classList.add('busy');
        document.getElementById('server-status').innerText='busy';
    }
}

let totalNumCustomers=parseInt(document.getElementById('customers-count').innerText);
let customersinSys=parseInt(document.getElementById('customers-in-system').innerText);
//customer arrived (event)
function arrival(){    
    // customer total number -1 & customer in system +1 
    if(customersinSys>=0){
        document.getElementById('customers-count').innerText=--totalNumCustomers;
        document.getElementById('customers-in-system').innerText=customersinSys+1;
         //check if server is idle or busy 
    let serverStat= document.getElementById('server-status').innerText;
    if(serverStat.toLocaleLowerCase()=='idle' && customersInQueue===0){
        customersinSys+=customersinSys;
        document.getElementById('server-status').innerText='busy';
        document.getElementById('server-icon').classList.add('busy');
        beginService();
    }else if(serverStat.toLocaleLowerCase()=='busy' && customersInQueue>=0){
        joinQueue(customersInQueue);
    }
     }else{
         return 0;
     }
}
// show data in the table  
function addElemToTable(){
    customerNum++;
    let tbody=document.getElementById('table-body');
    //appendChild to Table
    let trow=document.createElement("tr")
    trow.classList.add('text-center'); 
    trow.innerHTML=`
                    <td>${customerNum}</td>
                    <td>${interarrivalTime/1000}</td>
                    <td>${arrivalOnClock[customerNum-1]}</td>
                    <td>${serviceTime/1000}</td>
                    <td>${timeServiceBegins[customerNum-1]}</td>
                    <td>${timeCustomerWait[customerNum-1]}</td>
                    <td>${endTime[customerNum-1]}</td>
                    <td>${timeCustomerSpends[customerNum-1]}</td>
                    <td>${idleTime[customerNum-1]}</td>`;
                    tbody.appendChild(trow);
                    return true;
}




