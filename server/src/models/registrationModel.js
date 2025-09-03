const dbModel = require('../utilities/connection');
let db = {};

db.register = async (memObj) => {
    let dbm = await dbModel.getRegistrationCollection();
    let newMem = await dbm.create(memObj);
    if (newMem) {
        return true;
    } else {
        let err = new Error("Failed to add a member");
        err.status = 500;
        throw err;
    }
};

db.getMembers = async () => {
    let dbm = await dbModel.getRegistrationCollection();
    let members = await dbm.find({}, { __v: 0 });
    if (members) {
        return members;
    }
    else {
        let err = new Error("Failed to fetch the members");
        err.status = 500;
        throw err;
    }
};

db.updateMember = async (memObj) => {
    let dbm = await dbModel.getRegistrationCollection();
    let isUpdated = await dbm.findOneAndUpdate({ "_id": memObj._id }, { $set: { "name": memObj.name, "branch": memObj.branch, "year": memObj.year,"mobile":memObj.mobile,"mail":memObj.mail,"amount":memObj.amount,"paymentMode":memObj.paymentMode } });
    if (isUpdated) {
        return true;
    }
    else {
        let err = new Error("Failed to update the member");
        err.status = 500;
        throw err;
    }
};

db.deleteMember = async (memId) => {
    let dbm = await dbModel.getRegistrationCollection();
    let del = await dbm.deleteOne({ "_id": memId });
    if (del) {
        return del;
    }
    else {
        let err = new Error("Failed to delete the Member");
        err.status = 500;
        throw err;
    }
};


module.exports = db;