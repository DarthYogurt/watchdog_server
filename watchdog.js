Assets = new Mongo.Collection("assets");
//SCHEMA


AssetSchema = new SimpleSchema({
    "name": {
        type: String,
    },
    "address.street": {
        type: String,
        optional: true

    },
    "address.subStreet": {
        type: String,
        optional: true
    },
    "address.country": {
        type: String,
        optional: true
    },
    "address.city": {
        type: String,
        optional: true
    },
    "address.postal": {
        type: String,
        optional: true
    },
    "picture": {
        type: String,
        optional: true
    },
    "createdAt": {
        type: Date,
        defaultValue: Date.now(),
        optional: true
    },
    owner: {
        type: String
    },
    manager: {
        type: String,
        optional: true
    },
    "size.sqft": {
        type: Number,
        optional: true
    },
    "size.sqm": {
        type: Number,
        optional: true
    },
    "year": {
        type: Number,
        optional: true
    },
    "notes": {
        type: String,
        optional: true
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
            var country = event.target.addressCountry.value;
            var city = event.target.addressCity.value;
            var postal = event.target.addressPostal.value;
            var addressStreet = event.target.addressStreet.value;
            //var owner = event.target.owner.value;


            var newAsset = {
                'name': assetName,
                'address': {
                    'country': country,
                    'city': city,
                    'postal': postal,
                    'street': addressStreet
                },
                'owner': Meteor.userId()
            };

            if (AssetSchema.namedContext("myContext").validate(newAsset)) {
                Assets.insert(newAsset);
            }
            Tracker.autorun(function() {
                var context = AssetSchema.namedContext("myContext");
                console.log(context.invalidKeys());
            });
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
        if(AssetSchema.namedContext("assetAdd").validate(assetJson) ){
            Assets.insert(assetJson);
        }
        Tracker.autorun(function() {
            var context = AssetSchema.namedContext("assetAdd");
            console.log( context.invalidKeys() );
        });
    },
    assetList: function(){
        return ( Assets.find({} ));
    },
    assetRemove: function(assetId){
        Assets.remove({'_id': assetId});
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