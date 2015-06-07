Assets = new Mongo.Collection("assets");
//SCHEMA


AssetSchema = new SimpleSchema({
    "name": {
        type: String
    },
    "address.street": {
        type: String
    },
    "address.subStreet": {
        type: String
    },
    "address.country": {
        type: String
    },
    "address.city": {
        type: String
    },
    "address.zipCode": {
        type: String
    },
    "picture": {
        type: String
    },
    "createdAt": {
        type: Date,
        defaultValue: Date.now()
    },
    owner: {
        type: String
    },
    manager: {
        type: String
    },
    "size.sqft": {
        type: Number
    },
    "size.sqm": {
        type: Number
    },
    "year": {
        type: Number
    },
    "notes": {
        type: String
    }
})

if (Meteor.isClient) {

    Template.body.helpers({
        assets: function(){
            return Assets.find({});
        }
    })

    Template.body.events({
        "submit .new-asset": function (event) {
            var assetName = event.target.name.value;
            var addressStreet = event.target.addressStreet.value;
            //var owner = event.target.owner.value;


            var newAsset = {
                'name': assetName,
                'address': {
                    'street': addressStreet
                },
                'owner': Meteor.userId()
            };

            Assets.insert(newAsset);
            //check(newAsset);
            //if (AssetSchema.nameContext("myContext").validate(newAsset)) {
            //    Assets.insert(newAsset);
            //}
            return false;
        }
    })
    Meteor.subscribe('assets');

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}


if (Meteor.isServer) {
    Meteor.startup(function () {

        Meteor.publish("assets", function () {
            return Assets.find({ owner: this.userId});
        });

    });
}

Meteor.methods({
    assetAdd: function(assetJson){


        if(AssetSchema.namedContext("myContext").validate(assetJson) ){
            Asset.insert(assetJson);
        }
    },
    assetList: function(){

        return Asset.find({});
    }
})

//
//Meteor.methods({
//
//    addAsset: function(assetJson){
//        //    if (! Meteor.userId()) {
//        //        throw new Meteor.Error("not-authorized");
//        //    }
//
//        if(AssetSchema.namedContext("myContext").validate(assetJson) ){
//            Asset.insert(assetJson);
//        }
//    }
//    //addTask: function (text) {
//    //    // Make sure the user is logged in before inserting a task
//    //    if (! Meteor.userId()) {
//    //        throw new Meteor.Error("not-authorized");
//    //    }
//    //
//    //    Tasks.insert({
//    //        text: text,
//    //        createdAt: new Date(),
//    //        owner: Meteor.userId(),
//    //        username: Meteor.user().username
//    //    });
//    //},
//    //deleteTask: function (taskId) {
//    //    Tasks.remove(taskId);
//    //},
//    //setChecked: function (taskId, setChecked) {
//    //    Tasks.update(taskId, { $set: { checked: setChecked} });
//    //}
//});