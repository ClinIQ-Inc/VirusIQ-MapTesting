
vi.map =  {
	
	all_lab_records: [],
	
	leaflet_map: null,
	
	initialize: function(){
		
		this.leaflet_map = L.map('leafmap').setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(vi.map.leaflet_map);

		L.marker([51.5, -0.09]).addTo(vi.map.leaflet_map)
			.bindPopup('London')
			.openPopup();
		L.marker([52.5, -1]).addTo(vi.map.leaflet_map)
			.bindPopup('London')
			.openPopup();
		L.marker([50.5, 1]).addTo(vi.map.leaflet_map)
			.bindPopup('London')
			.openPopup();
		
	},
	
	displayLabs: function(all_labs){
		$("#lab-list").css({"overflow":"scroll", "height": "400px", "overflow-x": "hidden"})
		$("#lab-list").html("");

		var min_loc_latitude=38, min_loc_longitude=-100, max_loc_latitude=38, max_loc_longitude=-100;
		//window.alert(byService.find(a=>a.includes(all_labs[0].serviceCapabilities))) && byTestTypes.find(a=>a.includes(all_labs[0].typeOfCovidTest));
		//window.alert(all_labs[0].serviceCapabilities);
		
		var markerlist = []
		
		for(var i=0;i<all_labs.length;i+=1){
		
			//add it on the left panel
		
			var the_lab = all_labs[i];
			$("#lab-list").append('<div class="row">'+
			'	<div class="col-md-9">'+
			'		<div class="card">'+
			'		  <div class="card-body">'+
			'			<h5 class="card-title">'+the_lab.managingOrganization+'</h5>'+
			'			<p class="card-text">Service Capabilities: '+the_lab.serviceCapabilities+'</p>'+
			'			<p class="card-text">Type of COVID Tests: '+the_lab.typeOfCovidTest+'</p>'+
			'			<p class="card-text">Test Around: '+the_lab.testTurnaround+'</p>'+
			'			<a href="#" class="card-link">Order Here</a>'+
			'		  </div>'+
			'		</div>'+
			'	</div>'+
			'</div><br/>');
			
			//add it on the map
			var newmarker = L.marker([the_lab.longitude, the_lab.latitude]);
			
			markerlist.push(newmarker);
			
			newmarker.addTo(vi.map.leaflet_map)
			.bindPopup(the_lab.managingOrganization)
			.openPopup();
			
			if(min_loc_latitude>the_lab.longitude){
				min_loc_latitude = the_lab.longitude;
			}
			if(max_loc_latitude<the_lab.longitude){
				max_loc_latitude = the_lab.longitude;
			}
			if(min_loc_longitude>the_lab.latitude){
				min_loc_longitude = the_lab.latitude;
			}
			if(max_loc_longitude<the_lab.latitude){
				max_loc_longitude = the_lab.latitude;
			}
			//lastloc_longitude = the_lab.latitude;
			
		}
		//if(lastloc_latitude && lastloc_latitude){
		//map.panTo(new L.LatLng(lastloc_latitude, lastloc_longitude));
		//}
		//alert(JSON.stringify(data));
		var group = new L.featureGroup(markerlist);

		vi.map.leaflet_map.fitBounds(group.getBounds());
	},
	
	
	loadMap: function (){	
		
		$.ajax({
			type: "POST",
			url: "https://ncoviq.com:9090/v2/api/getLabs",
			// The key needs to match your method's input parameter (case-sensitive).
			data: JSON.stringify({ "state": "all" }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				 //{"responseCode":0,"response":{"labData":[{"labId":1,"longitude":"38.26709","latitude":"-121.94","updateDate":"28-Dec-20","sources":"http://www.1carediagnostics.com","country":"USA","state":"CA","county":"Solano","city":"Benicia","coverageAreas":"Bay
				 //{"Area; Northern California","managingOrganization":"1Care Medical
				 //{"Diagnostics","telecom":"laryy.coleman@1carediagnostics.com","phone":"","serviceCapabilities":"Drive-in,
				 //{"Walk-in, At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal
				 //{"Mid turbinate Swab Test; Nasopharyngeal Swab
				 //{"Test","typeOfCovidTest":"AntigenTests; PCR Molecular
				 //{"Tests","dailyCapacity":"501-1000 tests/day","testTurnaround":"Within
				 //{"24-48 hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross Payors;
				 //{"Blue Shield ofCalifornia Payors; Centene Payors; Cigna Payors; Kaiser
				 //{"Permanente Payors; LA Care Payors; Medi-Cal Payors; Medicare FFS
				 //{"Payors; Molina Healthcare Payors; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities;
				 //{"Health Plans; Long Term Care Facilities; Outpatient Practices;
				 //{"Private Employers;
				 //{"SFCs","testPerformedByFacility":""},{"labId":2,"longitude":"","latitude":"","updateDate":"","sources":"http://www.aegislabs.com","country":"USA","state":"TN","county":"Davidson","city":"Nashville","coverageAreas":"All","managingOrganization":"Aegis
				 //{"Labs","telecom":"covidtest@aegislabs.com","phone":"615-255-2400","serviceCapabilities":"At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Mid
				 //{"Turbinate Swab; Nasopharyngeal Swab; Oropharyngeal
				 //{"Swab","typeOfCovidTest":"PCR Molecular; Serology
				 //{"PCR","dailyCapacity":">10K tests/day","testTurnaround":"Within 24-48
				 //{"hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross; Blue Shield
				 //{"of California; Centene; Cigna; Kaiser Permanente; LA Care; Medi-Cal;
				 //{"Medicare FFS; Molina Healthcare; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities;
				 //{"Health Plans; Long Term Care Facilities; Outpatient Practices;
				 //{"Private Employers;
				 //{"SFCs","testPerformedByFacility":""},{"labId":3,"longitude":"","latitude":"","updateDate":"","sources":"https://www.ambrygen.com/covid","country":"","state":"","county":"Orange","city":"Aliso
				 //{"Viejo","coverageAreas":"","managingOrganization":"AMBRY GENETICS
				 //{"CORPORATION","telecom":"jotten@ambrygen.com","phone":"","serviceCapabilities":"At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Saliva","typeOfCovidTest":"PCR
				 //{"Molecular","dailyCapacity":"5001-10K
				 //{"tests/day","testTurnaround":"Within 24-48
				 //{"hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross; Facility Blue
				 //{"Shield of California; Centene; Cigna; Kaiser Permanente; LA Care;
				 //{"Medi-Cal; Medicare FFS; Molina Healthcare; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities
				 //{"Health Plans Long Term Care Facilities Outpatient Practices Private
				 //{"Employers
				 //{"SFCs","testPerformedByFacility":""},{"labId":4,"longitude":"32.71576","latitude":"-117.16382","updateDate":"19-12-2021","sources":"","country":"USA","state":"CA","county":"San
				 //{"Diego","city":"San Diego","coverageAreas":"Southern
				 //{"California","managingOrganization":"ALCALA TESTING & ANALYSIS
				 //{"SERVICES","telecom":"christian.tagwerker@alcalalabs.com","phone":"\"(619)
				 //{"450-5870 \"","serviceCapabilities":"At-home
				 //{"Test","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal
				 //{"Mid turbinate Swab Test; Nasopharyngeal Swab Test; Oropharyngeal Swab
				 //{"Test; Serum Test","typeOfCovidTest":"Serology Tests; PCR Molecular
				 //{"Tests","dailyCapacity":"","testTurnaround":"Within 24-48
				 //{"hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross Payors; Blue
				 //{"Shield ofCalifornia Payors; Centene Payors; Cigna Payors; Kaiser
				 //{"Permanente Payors; LA Care Payors; Medi-Cal Payors; Medicare FFS
				 //{"Payors; Molina Healthcare Payors; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities;
				 //{"Health Plans; Long Term Care Facilities; Outpatient Practices;
				 //{"Private Employers;
				 //{"SFCs","testPerformedByFacility":""},{"labId":5,"longitude":"29.81605","latitude":"-95.23767","updateDate":"","sources":"http://apollomdx.com","country":"USA","state":"CA","county":"Harris","city":"Houston","coverageAreas":"All
				 //{"California","managingOrganization":"ApolloMDx
				 //{"LLC","telecom":"emyleethai@apollomdx.com","phone":"","serviceCapabilities":"Drive-in,
				 //{"Walk-in, At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasopharyngeal
				 //{"Swab Test; Oropharyngeal Swab Test; Saliva
				 //{"Test","typeOfCovidTest":"PCR Molecular
				 //{"Tests","dailyCapacity":"2001-5000 tests/day","testTurnaround":"Within
				 //{"48-72 hrs","payorsBilledBy":"","contractingEntities":"Congregate
				 //{"Living Facilities; Health Plans; Long Term Care Facilities;
				 //{"Outpatient Practices; Private Employers;
				 //{"SFCs","testPerformedByFacility":""},{"labId":6,"longitude":"35.373871","latitude":"-119.019464","updateDate":"","sources":"http://arcpointlabs.com/bakersfield","country":"USA","state":"CA","county":"Kern","city":"Bakersfield","coverageAreas":"Central
				 //{"California","managingOrganization":"arcpoint labs of
				 //{"Bakersfield","telecom":"lelliott@arcpointlabs.com","phone":"","serviceCapabilities":"Drive-in,
				 //{"Walk-in, At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal
				 //{"Mid turbinate Swab Test; Nasopharyngeal Swab Test; Oropharyngeal Swab
				 //{"Test; Saliva Test; Serum Test","typeOfCovidTest":"Antigen
				 //{"Tests","dailyCapacity":"101-500 tests/day","testTurnaround":"Less
				 //{"than 24 hrs","payorsBilledBy":"Kaiser Permanente Payors; Medi-Cal
				 //{"Payors; Medicare FFS","contractingEntities":"Congregate Living
				 //{"Facilities; Health Plans; Long Term Care Facilities; Outpatient
				 //{"Practices; Private Employers;
				 //{"SFCs","testPerformedByFacility":""},{"labId":7,"longitude":"","latitude":"","updateDate":"","sources":"www.arcpointmartinez.com","country":"USA","state":"CA","county":"Martinez","city":"Contra
				 //{"Costa","coverageAreas":"Bay Area Northern
				 //{"California","managingOrganization":"arcpoint labs of
				 //{"Martinez","telecom":"maya@arcpointlabs.com","phone":"","serviceCapabilities":"Drive-in,
				 //{"Walk-in, At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal
				 //{"Mid turbinate Swab Nasopharyngeal Swab Saliva
				 //{"Serum","typeOfCovidTest":"Antigen Serology PCR
				 //{"Molecular","dailyCapacity":"101-500 tests/day","testTurnaround":"Less
				 //{"than 24 hrs","payorsBilledBy":"","contractingEntities":"Congregate
				 //{"Living Facilities Health Plans Long Term Care Facilities Outpatient
				 //{"Practices Private Employers
				 //{"SFCs","testPerformedByFacility":""},{"labId":8,"longitude":"34.05224","latitude":"-118.24334","updateDate":"","sources":"http://www.ashleylab.com","country":"USA","state":"CA","county":"Los
				 //{"Angeles","city":"Los Angeles","coverageAreas":"All
				 //{"California","managingOrganization":"Ashley clinical diagnostic lab
				 //{"inc.","telecom":"michael@ashleylab.com","phone":"","serviceCapabilities":"Drive-in,
				 //{"Walk-in, At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal
				 //{"Mid turbinate Swab Test; Nasopharyngeal Swab Test; Oropharyngeal Swab
				 //{"Test; Saliva Test","typeOfCovidTest":"PCR Molecular
				 //{"Tests","dailyCapacity":"5001-10K tests/day","testTurnaround":"Less
				 //{"than 24 hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross
				 //{"Payors; Blue Shield ofCalifornia Payors; Centene Payors; Cigna
				 //{"Payors; Kaiser Permanente Payors; LA Care Payors; Medi-Cal Payors;
				 //{"Medicare FFS Payors; Molina Healthcare Payors; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities;
				 //{"Health Plans; Hospitals; Long Term Care Facilities; Outpatient
				 //{"Practices; Private Employers;
				 //{"SFCs","testPerformedByFacility":""},{"labId":9,"longitude":"37.43989","latitude":"-122.18042","updateDate":"19-12-2021","sources":"","country":"USA","state":"CA","county":"San
				 //{"Mateo","city":"Menlo Park","coverageAreas":"All California; Out of
				 //{"State as Well","managingOrganization":"AVELLINO LAB USA
				 //{"INC","telecom":"connie@avellino.com","phone":"","serviceCapabilities":"At-home
				 //{"Test","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasopharyngeal
				 //{"Swab Test; Oropharyngeal Swab Test","typeOfCovidTest":"PCR Molecular
				 //{"Tests","dailyCapacity":"","testTurnaround":"Within 48-72
				 //{"hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross Payors; Blue
				 //{"Shield ofCalifornia Payors; Centene Payors; Cigna Payors; Kaiser
				 //{"Permanente Payors; LA Care Payors; Medi-Cal Payors; Medicare FFS
				 //{"Payors; Molina Healthcare Payors; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities
				 //{"Health Plans Hospitals Long Term Care Facilities Outpatient Practices
				 //{"Private Employers
				 //{"SFCs","testPerformedByFacility":""},{"labId":10,"longitude":"33.82898","latitude":"-117.92187","updateDate":"","sources":"http://bachdiagnostics.com","country":"USA","state":"CA","county":"Orange","city":"Santa
				 //{"Ana","coverageAreas":"All California","managingOrganization":"BACH
				 //{"MEDICAL GROUP DBA BACH
				 //{"DIAGNOSTICS","telecom":"rick@bachdiagnostics.com","phone":"","serviceCapabilities":"Drive-in,
				 //{"Walk-in, At-home
				 //{"Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal
				 //{"Mid turbinate Swab Test; Nasopharyngeal Swab Test; Serum
				 //{"Test","typeOfCovidTest":"SerologyTests; PCR Molecular
				 //{"Tests","dailyCapacity":"1001-2000 tests/day","testTurnaround":"Within
				 //{"24-48 hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross Payors;
				 //{"Blue Shield ofCalifornia Payors; Centene Payors; Cigna Payors; Kaiser
				 //{"Permanente Payors; LA Care Payors; Medicare FFS Payors; Molina
				 //{"Healthcare Payors; United
				 //{"Healthcare","contractingEntities":"Congregate Living Facilities
				 //{"Health Plans Hospitals Long Term Care Facilities Outpatient Practices
				 //{"Private Employers
				 //{"SFCs","testPerformedByFacility":""},{"labId":11,"longitude":"32.41372","latitude":"-95.38153","updateDate":"","sources":"http://CuurHealth.com","country":"USA","state":"CA","county":"Oos","city":"Las
				 //{"Vegas","coverageAreas":"All
				 //{"California","managingOrganization":"Bandar Enterprises LLC d.b.a.
				 //{"CUUR Diagnostics","telecom":"cdura@cuurhealth.com","phone":""
				
				var all_labs = data.response.labData;
				
				vi.map.all_lab_records = all_labs;
				
				vi.map.displayLabs(all_labs);
			},
			error: function(errMsg) {
				alert(errMsg);
			}
		});
	}
		
	
}