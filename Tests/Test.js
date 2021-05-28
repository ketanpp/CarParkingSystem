var assert=require("assert");
var chi=require("chai");
const { error } = require("console");
var ParkSystem=require("../ParkingLot");

describe('Parking System Test1',()=>{
describe('Create_Parking_Lot 6',()=>{
    it('should create Parking slots',()=>{
        ParkSystem.create_parking_lot(6)
        .then(data=>{
            chi.expect(data).to.equal('Created parking lot with Capacity : 6');
            //assert.equal(data,`Created parking lot with Capacity : 6`);
        })
        .catch(err=>{
            assert.fail('Test Create_Parking_lot is failed');
        })
    })

});
describe('Park MH14GP8340 with slot expect to be 1',()=>{
    it('Should Park The Bike Number MH14GP8340',(done)=>{
        ParkSystem.Park('MH14GP8340')
        .then(data=>{
            let preRes='Allocated slot number:1';
            //console.log(data);
            try{
            chi.expect(data).to.be.equal(preRes);
            }catch(e)
            {
                done(e);
            }
            done();
            //assert.strictEqual(data,"Allocated slot number:2","Matched");
        })
        .catch(err=>{
            assert.fail("Test Park is failed");
        })
    })
})
describe('Fail case for Park',()=>{
    it('should get incorrect number of slot',(done)=>{
        ParkSystem.Park('MH14GP8341')
        .then(data=>{
            var preRes="Allocated slot number:1"
            try{
                //chi.expect(data).to.be.e(preRes);
                assert.notStrictEqual(data,preRes,"Should not match");
            }
            catch(e)
            {
                done(e);
            }
            done();
        })
        .catch(err=>{

        })
    })
})

describe('Leave parking slot by MH14GP8340 with hours:4',()=>{
    it('Should vacant the parking and return parking charges',(done)=>{
        ParkSystem.leave('MH14GP8340',4)
        .then(data=>{
            var preRes="Registration number MH14GP8340 with Slot Number 1 is free with Charge 30"
            try{
                chi.expect(data).to.be.equal(preRes);
            }
            catch(e)
            {
                done(e);
            }
            done();
        })
        .catch()
    })
})

describe('Leave the car which is not in parking',()=>{
    it('should return Registration Number MH5G123 is not found',(done)=>{
        ParkSystem.leave('MH5G123',2)
        .then(data=>{
            var preRes='Registration number MH5G123  not found';
            try{
            chi.expect(data).to.be.equal(preRes);
            }
            catch(e)
            {
                done(e);
            }
            done();
        })
        .catch()
    })
})
});