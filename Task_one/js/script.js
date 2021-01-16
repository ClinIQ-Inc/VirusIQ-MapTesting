$(document).ready(function(){

    var map;
    var pageData;
    function fetchLabInfo() {
        $(".spinner-wrapper").show()
        $.ajax({
			type: "POST",
			url: "https://ncoviq.com:9090/v2/api/getLabs",
			// The key needs to match your method's input parameter (case-sensitive).
			data: JSON.stringify({ "state": "all" }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
                $(".spinner-wrapper").hide();
                pageData = data.response.labData;
                displayLabs(data.response.labData);
                initMap(data.response.labData);
			},
			error: function(errMsg) {
                $(".spinner-wrapper").hide();
				alert(errMsg);
            }
        });
    }
    fetchLabInfo()

    // Initialize and add the map
    function initMap(data) {
        // The location of Uluru
        const initialPositon = { lat: parseFloat(data[0].latitude), lng: parseFloat(data[0].longitude) };
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
        });
        map.setCenter(initialPositon);

        var infowindow = new google.maps.InfoWindow();

        for(let i=0; i<data.length;i+=1) {
            let labData = data[i];
            // The marker, positioned at Uluru
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(labData.latitude, labData.longitude),
                map: map,
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    console.log($('#'+labData.labId).position().top);
                    $("#lab-list-screen").scrollTop(0);
                    console.log($('#'+labData.labId).position().top);

                    setTimeout(function(){ 
                        $("#lab-list-screen").animate({ scrollTop: $('#'+labData.labId).position().top + - 25 }, { duration: 'medium', easing: 'swing' });
                    }, 100);                    
                    infowindow.setContent(labData.managingOrganization);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }

    function displayLabs(data) {
        $("#lab-list-screen").empty();
        $(".lab-count").empty();
        $(".lab-count").append(data.length);
        for(let i=0; i<data.length;i+=1) {
            let labData = data[i];
            $("#lab-list-screen").append(`<div class="card card-section" id="${labData.labId}"	>   
                    <div class="card-body">			
                        <h5 class="card-title">${labData.managingOrganization}</h5>
                        <p class="card-text">${labData.serviceCapabilities}</p>			
                        <p class="card-text">${labData.typeOfCovidTest}</p>			
                        <p class="card-text">${labData.testTurnaround}</p>		  
                    </div>		
                </div>`)
        }
    }

    $("#lab_filter_button").click(function(e){
        $(".filter-container").toggle();
        e.stopPropagation();
    })

    $(".filter-option-wrapper").click(function(e){
        e.stopPropagation();
    })
    $(document).on("click", function () {
        if($(".filter-container").length>0) {
            $(".filter-container").hide();
        }
    });

    $(document).on("click",".card-section",function() {
        $(this).attr('id');
        var self = this;
        let index = pageData.findIndex(function(lab){
            return parseInt($(self).attr('id')) == lab.labId;
        });
        map.setZoom(17);
        map.panTo({ lat: parseFloat(pageData[index].latitude), lng: parseFloat(pageData[index].longitude) });
    });
});
