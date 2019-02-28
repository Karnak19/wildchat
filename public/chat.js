$(function() {
   var socket = io.connect("http://192.168.88.27:3000");

   var message = $("#message");
   var username = $("#username");
   var sendMessage = $("#send_message");
   var sendUsername = $("#send_username");
   var chatroom = $("#chatroom");

   sendMessage.click(function() {
      socket.emit("new_message", { message: message.val() });
   });

   socket.on("new_message", data => {
      console.log(data);
      chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
   });

   sendUsername.click(function() {
      console.log(username.val());
      socket.emit("change_username", { username: username.val() });
   });
});
