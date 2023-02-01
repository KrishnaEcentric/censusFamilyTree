$(document).ready(function(){

  var stompClient=null;

  var currentNoofNotification = 0;

  $('#notification.badge').html(currentNoofNotification);
  
  $('#discount').on('click', function(){
     stompClient.discount();
	 setConneced(false);
	 document.getElementById('name').value="";
	 console.log("Disconnected");
  
  });
  
  $('#connect').on('click',function(){
   var socket = new SockJS('/afs.web.live/notificationMsg');
   stompClient= stomp.over(socket);
   var user = document.getElementById('user').value;
   
   console.log("Disconnected");
   stompClient.subscribe('/notificationData/approvalnotice/' + user, function(message){
	   showGreeting(JSON.parse(message.body).content);
   });
  
     console.log('connecton stablished');
	 documnet.getElementById('name').value="";
  });
  
  
  $('#send').on('click',function(){
	  
	  var name=document.getElementById('name').value;
	  var user = document.getElementById(' user').value;
	  stompClient.send("/app/notifictionMsg/"+user,{}, JSON.stringify({
		  'message': parseInt(name)+1
	  }));
	  
	  documnet.getElementById('name').value="";
  });
  
  function setConnected(connected){
	  document.getElementById('connect').disabled=connected;
	  document.getElementById('disConnect').disabled= !connected;
	  document.getElementById(' converationDiv').style.visibility = connected ? 'visible'
        : 'hidden';
	   document.getElementById('response').innerHTML='';	
  }
  
  function showGreeting(message){
	  var response = document.getElementById('response');
	  var p = document.createElement('p');
	  p.style.wordWrap= 'break-word';
	  p.appendChild(document.createTextNode(message));
	  $('#notification.badge').html(message);
  }
  
})