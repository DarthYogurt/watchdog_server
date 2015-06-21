var USER = 'abcd';
var PASSWORD = 'qwerty';


if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Assets CRUD", function(){
            var fakeAsset = {};
            before( function(done){
                Accounts.createUser({
                        'username': USER,
                        'password': PASSWORD
                    }
                );
                Meteor.loginWithPassword(USER, PASSWORD, function(e){
                    if(e){
                        console.log('[Login With Password', e);
                    }
                })
                Meteor.call('createFakeAsset', function(err,res){
                    fakeAsset = res;
                    done();
                });
            });

            after( function(done){
                var assetToRemove = Assets.findOne({'name': fakeAsset['name']});
                Meteor.call('assetRemove', assetToRemove['_id']);
                done();
            })

            it("Fake asset creates a viable asset", function(done){

                //console.log("[Fake asset in test]", fakeAsset);
                chai.assert( fakeAsset['name'], "No Name");
                chai.assert( fakeAsset['desc'], "Description not included");
                chai.assert( fakeAsset['desc']['year'], "Year not specified");
                done();
            });

            it( "Create a new fake asset and put into DB", function(done){
                Meteor.call( 'assetAdd', fakeAsset );
                var newAsset = Assets.findOne( {'name': fakeAsset['name']} );
                chai.assert( newAsset['name'] == fakeAsset['name'] );
                chai.assert( newAsset['year'] == fakeAsset['year'] );
                done();
            })
        });
    });
}