$(document).ready(function(){
	// Setting helpers
	function noResults() {
			$(".results").append('<h2>Search Term returned no countries, please try again.</h2>');
	}
	function clearResults() {
		$('.results').html('');
	}

	// On Button Click get input value
	// and call restcountries
    $("button").click(function(){
    	var countryName = $("#country-name-search").val();
    	// If no value is provided, display error message.
    	// Otherwise call restcountries
	    if (countryName === '') {
	    	clearResults();
	    	noResults();
	    } else {
	        $.ajax({url: "https://restcountries.eu/rest/v2/name/" + countryName + "?fields=name;flag;nativeName;translations;capital;population", 
	        	// If call is successful, display country data
	        	success: function(data){
		        	// Set Result Display variable for ease of readability
		        	var resultDisplay = "";
		        	// Clear our results in case multiple searches
		        	// are performed.
		        	clearResults();
					$.each(data,function(index, value){
						resultDisplay += "<div class='country-result'>";
						// Note: Flag Data display will rely on 
						console.log(data[index].flag );
						resultDisplay += "<div class='image'><img alt='Flag for "+ data[index].name +"' class='country-flag' src=" + data[index].flag + "></div>";	
						resultDisplay += "<div class='text'>";
						resultDisplay += "<h2>" + data[index].name + "</h2>";
						resultDisplay += "<h3>Native Name: " + data[index].nativeName + "</h3>";
						resultDisplay += "<p><strong>Available Translations for Country Name</strong>:<br/>";
						$.each(data[index].translations,function(index, value){
							resultDisplay +="<em>"+ index + "</em>: " + value + " ";
						});
						resultDisplay += "<p><strong>Capital</strong>: " + data[index].capital + "";
						resultDisplay += " <strong>Population</strong>: " + data[index].population + "";
						resultDisplay += "</div>";
						resultDisplay += "</div>";
					});
					$(".results").append(resultDisplay);
				},
				// If call fails, display contact message
				fail: function() {
					$(".results").append('<h2>There was a technical error when trying to access country data, please try again later or contact https://restcountries.eu/ for more information</h2>');	
				},
				// If a call is made in error, display corrective message
				error: function() {
					clearResults();
					noResults();
				}
			});
	    }
    });
});