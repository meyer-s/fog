$(document).ready(function() {
	var questionForm = $("#question").submit(submit);
});

function submit(event){
	event.preventDefault();

	var text = $("#response").val();
	$.post('/', {text: text}, function(res){
		$("#words").empty();
		for(var i = 0; i < res.table.length; i++){
			var li = $('<li></li>');
        	li.text(res.table[i]);
        	$("#words").append(li);
		}
    });
}