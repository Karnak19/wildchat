$(function() {
   var socket = io.connect("http://localhost:3000");

   var message = $("#message");
   var username = $("#username");
   var sendMessage = $("#send_message");
   var sendUsername = $("#send_username");
   var chatroom = $("#chatroom");

   sendMessage.click(function() {
      socket.emit("new_message", { message: message.val() });
   });

   sendMessage.click(function() {
      message.val("");
   });

   message.bind("enterKey", function(e) {
      socket.emit("new_message", { message: message.val() });
   });
   message.bind("enterKey", function(e) {
      message.val("");
   });

   message.keyup(function(e) {
      if (e.keyCode == 13) {
         $(this).trigger("enterKey");
      }
   });

   socket.on("new_message", data => {
      console.log(data);
      chatroom.append("<p class='alert alertt alert-secondary col-lg-10 offset-lg-1 col-8 offset-2'>" + data.username + ": " + data.message + "</p>");
   });

   sendUsername.click(function() {
      console.log(username.val());
      socket.emit("change_username", { username: username.val() });
      chatroom.append("<p class='alert alert-warning col-lg-10 offset-lg-1 col-8 offset-2'>" + username.val() + " changes his pseudo</p>");
   });

   sendUsername.click(function() {
      username.val("");
   });
});
