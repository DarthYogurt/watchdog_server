Assets = new Mongo.Collection("assets");
Files = new Mongo.Collection('files');

AddressSchema = new SimpleSchema({
    "country": {
        type: String,
        optional: true
    },
    "city": {
        type: String,
        optional: true
    },
    "district": {
        type: String,
        optional: true
    },
    "postal": {
        type: String,
        optional: true
    },
    "street": {
        type: String,
        optional: true
    },
    "substreet": {
        type: String,
        optional: true
    }
});

AssetSchema = new SimpleSchema({
    "name": {
        type: String,
    },
    "desc": {
        type: AddressSchema,
        optional: true
    },
    "desc.year": {
        type: Number,
        optional: true
    },
    "desc.sqm": {
        type: Number,
        optional: true
    },
    "owner": {
        type: [ String ],
        optional: true
    },
    "manager": {
        type: [ String ],
        optional: true
    }
})

if (Meteor.isClient) {
    Template.body.helpers({
        assets: function () {
            return Assets.find({});
        }
    });

    Template.body.events({
        "submit .new-asset": function (event) {

            var assetName = event.target.name.value;
            var country = event.target.addressCountry.value;
            var city = event.target.addressCity.value;
            var postal = event.target.addressPostal.value;
            var street = event.target.addressStreet.value;
            var substreet = event.target.addressSubStreet.value;
            var year = Number(event.target.year.value);
            var sqm = Number(event.target.sqm.value);
            var manager = event.target.manager.value;
            var owner = event.target.owner.value;

            var newAsset = {
                'name': assetName,
                'desc': {
                    'country': country,
                    'city': city,
                    'postal': postal,
                    'street': street,
                    'substreet': substreet,
                    'year': year,
                    'sqm': sqm
                },
                'owner': [ owner ],
                'manager': [ manager ]
            };
            Meteor.call("assetAdd", newAsset);
            return false;
        },

        "click .delete": function (event) {
            Meteor.call("assetRemove", this._id);
            return false;
        }

    })
    ;

    Meteor.subscribe('assets');

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
    });
}


if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.publish("assets", function () {
            return Assets.find({});
            //return Assets.find({ owner: this.userId});
        });

    });
}

Meteor.methods({
    assetAdd: function (assetJson) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if (AssetSchema.namedContext("assetAdd").validate(assetJson)) {
            Assets.insert(assetJson);
        }
        Tracker.autorun(function () {
            var context = AssetSchema.namedContext("assetAdd");
            console.log(context.invalidKeys());
        });
    },
    assetList: function () {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        return ( Assets.find({}));
    },
    assetRemove: function (assetId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Assets.remove({'_id': assetId});
    },
    addPic: function (buffer, assetId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Assets.update({'_id': assetId}, {'$push': {'picture': buffer}});
    },
    'saveFile': function (buffer) {
        Files.insert({data: buffer})
    }
})
