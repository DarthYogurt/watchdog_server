Assets = new Mongo.Collection("assets");
Files = new Mongo.Collection('files');
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
        type: [Object],
        optional: true
    },
    "createdAt": {
        type: Date,
        defaultValue: Date.now(),
        optional: true
    },
    "owner": {
        type: String
    },
    "manager": {
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


AddressSchema = new SimpleSchema({
    "name": {
        type: String,
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
    "address.street": {
        type: String,
        optional: true
    },
    "address.subStreet": {
        type: String,
        optional: true
    }
});

newAssetSchema = new SimpleSchema({

    "desc":{
        type: AddressSchema
    },
    "desc.year": {
        type: Number,
        optional: true
    },


    //
    //"leaseHistory.expire": {
    //    "type": Date,
    //    "optional": true
    //},
    //
    //"createdAt": {
    //    type: Date,
    //    defaultValue: Date.now(),
    //    optional: true
    //},
    //
    //"notes": {
    //    type: String,
    //    optional: true
    //}
})

if (Meteor.isClient) {
    Template.body.helpers({
        assets: function(){
            return Assets.find({});
        }
    });

    Template.body.events({
        "submit .new-asset": function (event) {
            //console.log(event.target.picture.value);
            //var file = event.target.picture.value; //assuming 1 file only
            ////if (!file) return;
            //console.log(file);
            //var reader = new FileReader();
            //
            //reader.onload = function(event){
            //    var buffer = new Uint8Array(reader.result); // convert to binary
            //    console.log(buffer);
            //
            //    //Meteor.call('saveFile', buffer);
            //}



            //reader.readAsArrayBuffer(file); //read the file as arraybuffer

            //var picture = "12311223123211";

            var assetName = event.target.name.value;
            var country = event.target.addressCountry.value;
            var city = event.target.addressCity.value;
            var postal = event.target.addressPostal.value;
            var addressStreet = event.target.addressStreet.value;
            var manager = event.target.manager.value;
            var sqft = event.target.sqft.value;

            var newAsset = {
                'name': assetName,
                'address': {
                    'country': country,
                    'city': city,
                    'postal': postal,
                    'street': addressStreet
                },
                'owner': Meteor.userId(),
                'manager': manager,
                'size': {
                    'sqft': Number(sqft)
                },
                //'picture': [picture]
            };

            Meteor.call("assetAdd", newAsset);
            return false;
        },
        "click .delete": function(event){
            Meteor.call("assetRemove", this._id);
            return false;
        }
        //"click .uploadpic": function(event){
        //    console.log(this._id);
        //
        //
        //
        //    return false;
        //}
    });

    Meteor.subscribe('assets');

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
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
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if(AssetSchema.namedContext("assetAdd").validate(assetJson) ){
            Assets.insert(assetJson);
        }
        Tracker.autorun(function() {
            var context = AssetSchema.namedContext("assetAdd");
            console.log( context.invalidKeys() );
        });
    },
    assetList: function(){
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        return ( Assets.find({} ));
    },
    assetRemove: function(assetId){
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Assets.remove({'_id': assetId});
    },
    addPic: function(buffer, assetId){
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Assets.update({ '_id': assetId }, { '$push': { 'picture': buffer }});
    },
    'saveFile': function(buffer){
        Files.insert({data:buffer})
    }
})
