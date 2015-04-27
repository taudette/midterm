// $(document).on('ready', function() {
  
// });



// To make a link smooth scroll to another section on the page, give the link the .page-scroll class and set the link target to a corresponding ID on the page.


//declare Request constructor
var Request = function (name, state, area, style, grades, contact){
	this.name = name;
	this.state = state;
	this.area = area;
	this.style = style;
	this.grades = grades;
	this.contact = contact;

	this.render();

};

//Generate dom element for requests
Request.prototype.render = function(){
	if (this.el === undefined){
		this.el = $('#request-tpl')
		.clone()
		.attr('id', null);
	}

	this.el.find ('.request-name').text(this.name);
	this.el.find('.request-state').text(this.state);
	this.el.find('.request-area').text(this.area);
	this.el.find('.request-style').text(this.style);
	this.el.find('.request-grades').text(this.grades);
	this.el.find('.request-contact').text(this.contact);

	return this.el;
};

//make library of requests
var RequestLibrary = function (name){
	this.name = name ;
	this.requests = [];
	this.render();
};

//add requests to Library
RequestLibrary.prototype.addRequest = function(request){
	this.requests.push(request);
	this.render();
};

//Render Library to dom
RequestLibrary.prototype.render = function() {
	if (this.el === undefined) {
		this.el = $('#request-library-tpl')
			.clone()
			.attr('id', null);
			
		var originalLibrary = this;

		this.el.find('.new-request-form').on('submit',function(e){
			e.preventDefault();
			console.log('submitted');


			//grabbing values from inputs and changing the value of the form
			var requestName = $(this).find('[name = request-name]').val();
			var requestState = $(this).find('[name = request-state]').val();
			var requestArea = $(this).find('[name = request-area]').val();
			var requestStyle = $(this).find('[name = request-style]').val();
			var requestGrades = $(this).find('[name = request-grades]').val();
			var requestContact = $(this).find('[name = request-contact]').val();


			//generate new request instance
			var newRequest = new Request(requestName, requestState, requestArea, requestStyle, requestGrades, requestContact);
			originalLibrary.addRequest(newRequest);
			//clear form after submitting
			$(".name, .state, .area, .style, .grades, .contact").val('');

		});
			
	}
	//change lib name to given
	this.el.find('.library.name').text(this.name);

	var requestElements = this.requests.map(function(request){
		return request.render();
	});

	this.el.find('.request-list').append(requestElements);
	return this.el;
	};

	var firstRequest = new Request ('Tyler Audette', 'CO', 'Boulder', 'Sport', '5.12 - 5.13', 'tyleraudette@yahoo.com');
	var myLibrary = new RequestLibrary('');
	myLibrary.addRequest(firstRequest);
	var requestArray = myLibrary.requests;

	$('#about').append(myLibrary.render());












