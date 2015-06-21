var USER = 'abcd';
var PASSWORD = 'qwerty';


if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Asset CRUD", function(){

            var fakeAsset = {};

            before( function(){
                Accounts.createUser({
                        'username': USER,
                        'password': PASSWORD
                    }
                );

                //fakeAsset = Meteor.call('createFakeAsset');

                //console.log('[testing fake asset]', Session.get('fakeUser'));

                Meteor.loginWithPassword(USER, PASSWORD, function(e){
                    if(e){
                        console.log('[Login With Password', e);
                    }
                })


            });

            it("Fake asset creates a viable asset", function(){
                //var fakeAsset = Meteor.call('createFakeAsset');
                //console.log("[Crud Client]", fakeAsset);
                //chai.assert( fakeAsset['name'], "No Name");
                //chai.assert( fakeAsset['desc'], "Description not included");

                Meteor.call('test');
            });

            it( "create a new fake asset and put into DB", function(){

                // Meteor.call('loginUsername', USER, PASSWORD );
                // Meteor.loginWithPassword();
                //Meteor.call('assetAdd', fakeAsset);



            })
        });

    });
}