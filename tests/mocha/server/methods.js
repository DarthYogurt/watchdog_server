if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Asset CRUD", function(){
            it("Should not allow if not logged in", function(){
                var fakeAsset = Meteor.call('createFakeAsset');
                console.log(fakeAsset);

                var DEBUG = process.env.VELOCITY_DEBUG;
                DEBUG && console.log('[mocha] helpful debugging info', "testing");


                //chai.assert(Meteor.call('test') == true, "not working");
            });
        });

    });
}