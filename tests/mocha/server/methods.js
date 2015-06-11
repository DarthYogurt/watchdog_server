if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Asset CRUD", function(){
            it("Should not allow if not logged in", function(){
                chai.assert(Meteor.addAsset);
            });
        });

    });
}