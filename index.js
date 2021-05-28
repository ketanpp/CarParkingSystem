let readLn=require("readline");
let parksystem=require("./ParkingLot");
let fs=require("fs");
const FileStream=fs.createReadStream(process.argv[2]);
const FileOut=fs.createWriteStream('./Output.txt');
const rd=readLn.createInterface({
    input:FileStream,
    output:process.stdout
    
});
//console.log(process.argv[2]);
let initMain=()=>{
    rd.on('line',async(input)=>{
        input=input.split(" ");
        switch(input[0])
        {
            case ('create_parking_lot'):
                parksystem.create_parking_lot(input[1])
                .then(data=>rd.write(data))
                .catch(err=>rd.write(err))
                break;
                case ('Park'):
                    parksystem.Park(input[1])
                    .then(data=>rd.write(data))
                    .catch(err=>rd.write(err))
                    
                    break;
                    case('leave'):
                    var res= await parksystem.leave(input[1],input[2])
                    .then(data=>rd.write(data))
                    .catch(err=>rd.write("error"))
                    //rd.write("leave");

                    break;
                    case('Status'):
                    parksystem.Status()
                    .then(data=>rd.write(data))
                    .catch(err=>rd.write(err))
                    //rd.write("Status is called");
                    break;
                default:
                    return 'Default Case Invoked';
        }
    });

}

rd.on('SIGINT', () => {
    rd.question('Are you sure you want to exit? (yes/no) ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rd.pause();
    });
}); 
 
initMain();