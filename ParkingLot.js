let car=[];
let ParkigSlots=[];
let MaxSlots;
let EmptySlots;
var create_parking_lot=async (noParkingLot)=>{
    try{
       // console.log(noParkingLot);
    MaxSlots=parseInt(noParkingLot);
    //console.log(MaxSlots);
    EmptySlots=noParkingLot;
    for(var i=0;i<MaxSlots;i++)
    {
        let sl=i+1;
        ParkigSlots.push({'slot':sl,
    'isParked':false
    });
    }
   // console.log(`Created Parking lot with capacity ${ParkigSlots.length}`);
    
    return `Created parking lot with Capacity : ${MaxSlots}`+'\n';
}catch(e)
{
return 'Could not create parking lot'+'\n'
}
}

var Park=async (carNumber)=>{
    if(MaxSlots==0)
    {
        return `Parking lot is not initialized`+'\n';
    }
    else if(EmptySlots==0)
    {
        return `Sorry, parking lot is full`+'\n';
    }
    else
    {
    var parkSlot=ParkigSlots.findIndex(p=>p.isParked===false);
    ParkigSlots[parkSlot].isParked=true;
    let slotAllocated=ParkigSlots[parkSlot].slot;
   
    car.push({'carNumber':carNumber,
'slot':slotAllocated});

    EmptySlots--;
    return `Allocated slot number:${slotAllocated}`+'\n';
    }
}

var leave=async (carNumber,hours)=>{
    if(MaxSlots==0)
    {
        return `Parking lot is not initialized`+'\n';
    }
    else if(EmptySlots!=MaxSlots)
    {
        var carIndex=car.findIndex(p=>p.carNumber===carNumber);
        if(carIndex===-1)
        {
            return `Registration number ${carNumber}  not found`+'\n';
        }
        var slot=car[carIndex].slot;
        var parkSlot=ParkigSlots.findIndex(p=>p.slot===slot);
        ParkigSlots[parkSlot].isParked=false;
        let hoursRemain=hours-2;
        EmptySlots++;
        if(hoursRemain>0)
        {
            var remainFair=hoursRemain*10;
        }
        var totalFair=remainFair+10;
        return `Registration number ${carNumber} with Slot Number ${slot} is free with Charge ${totalFair}`+'\n';
    }
}

var Status=async ()=>{
    var res="Slot No        Registration No"+'\n';
if(MaxSlots==0)
{
    return `Parking Slots is not initialized`+'\n';
}
else{
    
    car.forEach((car)=>{
        res+=car.slot+"              "+car.carNumber+'\n';
    })
    return res;
}
}
module.exports={
    create_parking_lot,
    Park,
    leave,
    Status
}