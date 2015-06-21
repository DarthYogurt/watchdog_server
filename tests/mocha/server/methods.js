var USER = 'cyrano821';
var PASSWORD = 'Rsupermanfly821';


if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Asset CRUD", function(){

            var fakeAsset = {};

            before( function(){

                fakeAsset = Meteor.call('createFakeAsset');
            })

            it("Fake asset creates a viable asset", function(){
                var fakeAsset = Meteor.call('createFakeAsset');

                chai.assert( fakeAsset['name'], "No Name");
                chai.assert( fakeAsset['desc'], "Description not included");
            });

            it( "create a new fake asset and put into DB", function(){

                // Meteor.call('loginUsername', USER, PASSWORD );
                // Meteor.loginWithPassword();
                //Meteor.call('assetAdd', fakeAsset);



            })
        });

    });
}