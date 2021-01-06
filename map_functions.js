var locations = [];
var final_arr = [];
var dynamicfunc=[];






function fileReader(oEvent) {
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;

    var reader = new FileReader();
    var result = {};
    reader.onload = function(e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, {
            type: 'array'
        });
        console.log(workbook);
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            if (sheetName === 'Website Tracker Testing Lab Dir') {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], {
                    header: 1
                });
                if (roa.length) result[sheetName] = roa;
            }
        });

        // see the result, caution: it works after reader event is done.
        result['Website Tracker Testing Lab Dir'].forEach(function(val, id) {
            if (val.length > 0) {
                final_arr.push(val);
            }

        });
        console.log(final_arr);
    }
    reader.readAsArrayBuffer(oFile);
}

function load_locations() {
    locations = [];
    Lat_Idx = final_arr[0].indexOf("Latitude");
    Long_Idx = final_arr[0].indexOf("Longitude");
    Facility_Name = final_arr[0].indexOf("Organisation");
    Email_Idx = final_arr[0].indexOf("Email");
    Phone_Idx = final_arr[0].indexOf("Phone");
    Test_Turnaround_Idx = final_arr[0].indexOf("Test_Turnaround");
    Type_of_Specimen_Idx =  final_arr[0].indexOf("Type of Specimen Collected");
    Service = final_arr[0].indexOf("Service Capabilities");
    Test_Type = final_arr[0].indexOf("Type of COVID-19 test");
    Contracting_Entities = final_arr[0].indexOf("Contracting Entities");
    Payors_Billed = final_arr[0].indexOf("Payors Billed By");
    var service_compare_val = (document.getElementById("services").value ==="ALL") ? "" : document.getElementById("services").value;
    var type_compare_val = (document.getElementById("TestTypes").value ==="ALL") ? "" : document.getElementById("TestTypes").value;
    var contract_compare_val = (document.getElementById("ContractingEntities").value ==="ALL") ? "" : document.getElementById("ContractingEntities").value;
    var payors_compare_val = (document.getElementById("Payors").value ==="ALL") ? "" : document.getElementById("Payors").value;
    locations = [];
    for (var i = 2; i < final_arr.length; i++) {
        if ( (final_arr[i][Service] != undefined && final_arr[i][Service].includes(service_compare_val)) && (final_arr[i][Test_Type] != undefined && final_arr[i][Test_Type].includes(type_compare_val)) &&
          (final_arr[i][Contracting_Entities] != undefined && final_arr[i][Contracting_Entities].includes(contract_compare_val)) &&
          (final_arr[i][Payors_Billed] != undefined && final_arr[i][Payors_Billed].includes(payors_compare_val))) {




        var tmp_content = '<table id="t01"><tbody>';
          if(final_arr[i][Facility_Name] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Facility Name</th>'+
            '<td> '+final_arr[i][Facility_Name]+'</td>'+
          '</tr>'
          }
          if(final_arr[i][Email_Idx] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Email Id</th>'+
            '<td> '+final_arr[i][Email_Idx]+'</td>'+
          '</tr>'
          }
          if(final_arr[i][Phone_Idx] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Contact No</th>'+
            '<td> '+final_arr[i][Phone_Idx]+'</td>'+
          '</tr>'
          }
          if(final_arr[i][Service] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Service Capabilities</th>'+
            '<td> '+final_arr[i][Service]+'</td>'+
          '</tr>'
          }
          if(final_arr[i][Test_Type] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Type of COVID-19 test</th>'+
            '<td> '+final_arr[i][Test_Type]+'</td>'+
          '</tr>'
          }
          if(final_arr[i][Test_Turnaround_Idx] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Test Turnaround</th>'+
            '<td> '+final_arr[i][Test_Turnaround_Idx]+'</td>'+
          '</tr>'
          }
          if(final_arr[i][Type_of_Specimen_Idx] != undefined){
            tmp_content = tmp_content+'<tr text-align:left>'+
            '<th text-align:left>Type of Specimen Collected</th>'+
            '<td> '+final_arr[i][Type_of_Specimen_Idx]+'</td>'+
          '</tr>'
          }
            
           tmp_content = tmp_content+'</tbody></table>'
           tmp_content = tmp_content+'<br/>'
           tmp_content = tmp_content+'<a href = "https://virusiq.health/screening" target="_blank"> Book an appointment</a>'

            locations.push([tmp_content, final_arr[i][Lat_Idx], final_arr[i][Long_Idx], i]);
        }

    }
    console.log(locations);
    var x = document.getElementById("map");
    x.style.display = "block";
    initMap();
};

function initMap() {

 

    if (locations.length === 0) {

        var uluru = {
            lat: 36.778259,
            lng: -119.417931
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });


    } else {


        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: {
                lat: 37.0902,
                lng: -95.7129
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                animation: google.maps.Animation.DROP
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

    }
};

function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}

// function myFunction() {
//     var x = document.getElementById("map");
//     if (x.style.display === "none" || x.style.display === "") {
//         initMap();
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
// }