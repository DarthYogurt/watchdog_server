Tasks = new Mongo.Collection("tasks");

//SCHEMA

TaskSchema = new SimpleSchema({
    text: {
        type: String
    },
    createdAt: {
        type: Date
    }
})


if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.body.helpers({
        tasks: function () {
            //Tasks.update({}, {'$set': {'random': Math.random()}, {'multi': true}});
            return Tasks.find();
        }
        //tasks: [
        //    {text: "This is task 1"},
        //    {text: "This is task 2"},
        //    {text: "This is task 3"}
        //]
    });

    Template.body.events({
        "submit .new-task": function (event) {
            // This function is called when the new task form is submitted

            var text = event.target.text.value;

            var taskToAdd = {
                text: text,
                createdAt: new Date() // current time
            }

            if(TaskSchema.namedContext("myContext").validate(taskToAdd)){
                Tasks.insert(taskToAdd);
            }
            else{
                console.log("Error, task is not validated");
            }

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        }
    });


}


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
