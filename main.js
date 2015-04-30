// $(document).on('ready', function() {

// });


// To make a link smooth scroll to another section on the page, give the link the .page-scroll class and set the link target to a corresponding ID on the page.



//declare Request constructor
var Request = function (date, name, state, area, style, grades, contact){
	this.date = date;
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
	this.el.find('.request-date').text(this.date);
	this.el.find('.request-name').text(this.name);
	this.el.find('.request-state').text(this.state);
	this.el.find('.request-area').text(this.area);
	this.el.find('.request-style').text(this.style);
	this.el.find('.request-grades').text(this.grades);
	this.el.find('.request-contact').text(this.contact);
	return this.el;
};

// Request.prototype.renderClimbers = function(){
// 	if (this.el === undefined){
// 		this.el = $('.climber-amount')
// 		.clone()
// 		.attr('id', null);
// 	}
// 	this.el.find('.request-date').text(this.date);


// Function for adding a marker to the page.
 Request.prototype.renderMarker = function(map) {
	if(!this.marker){
	 	var request = this;
	    this.marker = new google.maps.Marker({});
	    geocoder.geocode( { 'address': this.area + ',' + this.state}, function(results, status) {
			request.marker.setPosition(results[0].geometry.location);
			request.marker.setMap(map);
	  		});
	    // info on click//////
	    var marker = this.marker;
	    var contentString = request.date + '<br>' + request.name + '<br>' + request.area +  '<br>' + request.style +'<br>' + request.grades +'<br>' + request.contact ;
		var infowindow = new google.maps.InfoWindow({
		      content: contentString,
		 });
  		 google.maps.event.addListener(this.marker, 'click', function() {
  		 console.log('clicked');
    	 infowindow.open(map, marker);
 		 });
	}
};




//make library of requests
var RequestLibrary = function (name){
	this.name = name ;
	this.requests = [];
	// if this is null, fall back to the requests list for display
	this.requestsDisplay = null;	
	this.render();
};

//add requests to Library
RequestLibrary.prototype.addRequest = function(request){
	this.requests.push(request);
	var totalClimbers = (this.requests.length);
	
	$('.navbar').find('.climber-amount, h3').text(totalClimbers + ' people want to climb!');
	this.render();
};

RequestLibrary.prototype.renderMarkers = function(map){
	for (var i=0; i<this.requests.length; i++){
		this.requests[i].renderMarker(map);
	}
};

RequestLibrary.prototype.renderFilter = function(stateOnly){
	function findState(Request){
		if (Request.state === stateOnly){
			return true;
		}
	}

	// Once the filter is set up, we'll set a real value
	// for the display list.
	this.requestsDisplay = requestArray.filter(findState);
	var FilteredClimbers = requestArray.filter(findState).length;
	console.log(FilteredClimbers);



	
	$('.navbar').find('.filtered-climber-amount').text(FilteredClimbers + ' in ' + stateOnly + '!');

	myLibrary.render();

};

// Helper for clearing out the filter. Try calling it from console!
RequestLibrary.prototype.clearFilter = function () {
	this.requestsDisplay = null;
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

			//scrolls back to map on click
			$("html, body").animate({ scrollTop: 0 }, 600);
			//grabbing values from inputs and changing the value of the form
			var requestDate = $(this).find('[name = request-date]').val();
			var requestName = $(this).find('[name = request-name]').val();
			var requestState = $(this).find('[name = request-state]').val();
			var requestArea = $(this).find('[name = request-area]').val();
			var requestStyle = $(this).find('[name = request-style]').val();
			var requestGrades = $(this).find('[name = request-grades]').val();
			var requestContact = $(this).find('[name = request-contact]').val();

			//generate new request instance
			var newRequest = new Request(requestDate, requestName, requestState, requestArea, requestStyle, requestGrades, requestContact);
			originalLibrary.addRequest(newRequest);

			originalLibrary.renderMarkers(map);

			//clear form after submitting
			$(".date, .name, .state, .area, .style, .grades, .contact").val('');


		});

	}
	//change lib name to given
	this.el.find('.library.name').text(this.name);

	// short-hand defaults: requests will try to set itself
	// to the display list, but if it can't, it'll fall back to requests.
	var requests = this.requestsDisplay || this.requests;
	var requestElements = requests.map(function(request){
		return request.render();
	});

	// We now need to make sure the list is empty, just in case
	this.el.find('.request-list').empty().append(requestElements);
	return this.el;
	};

//////hardcoded climbers
	var firstRequest = new Request ('05/21/2015', 'Tyler', 'Utah', 'Maple Canyon', 'Sport', '5.12 - 5.13', 'tyleraudette5@gmail.com');
	var secondRequest = new Request ('05/01/2015','Random Dude', 'Massachusetts', 'Clear Creek Canyon', 'Sport', '5.11 - 5.12', '867-5309');
	var thirdRequest = new Request ('05/10/2015','Dirty Hippy', 'Colorado', 'Eldorado Canyon', 'Trad', '5.10 - 5.11', 'White van outside The Spot');
	var fourthRequest = new Request ('05/20/2015','Strong Man', 'Colorado', 'rifle mountain park', 'Bouldering', 'v13', 'myspace.com/rockclimber33');
	var fifthRequest = new Request ('05/05/2015','Adam Ondra', 'Nevada', 'Virgin River Gorge', 'Sport', '5.14 - 5.15', 'iscreamalot@hotmail.com');
	var sixthRequest = new Request ('05/10/2015','Alex Honnold', 'California', 'Yosemite', 'Scary-Trad', '5.13 - 5.14', 'ropesareforbabies@gmail.com');
	var seventhRequest = new Request ('04/30/2015','Chris Sharma', 'California', 'Clark Mountain', 'Sport', '5.14 - 5.15', 'Sattelite Phone');
	var eighthRequest = new Request ('04/29/2015','Daniel Woods', 'Colorado', 'Rocky Mountain National Park', 'Bouldering', 'v15', 'iloverocks@gmail.com');

	var myLibrary = new RequestLibrary('');
	myLibrary.addRequest(firstRequest);
	myLibrary.addRequest(secondRequest);
    myLibrary.addRequest(thirdRequest);
	myLibrary.addRequest(fourthRequest);
	myLibrary.addRequest(fifthRequest);
	myLibrary.addRequest(sixthRequest);
    myLibrary.addRequest(seventhRequest);
	myLibrary.addRequest(eighthRequest);
	var requestArray = myLibrary.requests;


	/////Render everything to body/////

	$('#contact').append(myLibrary.render());

//maps///////////
var geocoder;
var map;

function initialize() {
	geocoder = new google.maps.Geocoder();


	var mapCanvas = document.getElementById('map-canvas');
	var mapOptions = {
		zoom: 4,
		center: new google.maps.LatLng(39.8282, -98.5795), // New York
		styles: [{"featureType":"water","elementType":"all","stylers":[{"hue":"#4EACDE"},{"saturation":10},{"lightness":10},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#FFFFFF"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[]},{"featureType":"landscape.natural","elementType":"all","stylers":[]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#333333"},{"saturation":-100},{"lightness":-69},{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]}]
	};

	map = new google.maps.Map(mapCanvas, mapOptions);

	// Create the search box and link it to the UI element.
  	var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  	map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));


 	google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    // sorted list by state on search//////
    var enteredplace = (places[0].formatted_address);
    var locationStrung = String(enteredplace);
    var split = locationStrung.split(',');
    var stateOnly= split[0];
    console.log(places);
  	myLibrary.renderFilter(stateOnly);

    if (places.length === 0) {
      return;
    }

    //search function//
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      bounds.extend(place.geometry.location);
    }
    // Don't zoom in too far on only one marker
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
       var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 1.5, bounds.getNorthEast().lng() + 1.5);
       var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 1.5, bounds.getNorthEast().lng() - 1.5);
       bounds.extend(extendPoint1);
       bounds.extend(extendPoint2);
    }

    map.fitBounds(bounds);
    console.log(bounds);
  	});


	google.maps.event.addDomListener(window, 'load', initialize);
	google.maps.event.addListenerOnce(map, 'idle', function(){
		myLibrary.renderMarkers(map);
    // do something only the first time the map is loaded
});
}
