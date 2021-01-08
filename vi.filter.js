
var isShown = false;
toggleDialog = function(){
	    if(!isShown){
	        $("#dialog").show();
	        isShown = true;
	    } else {
	        $("#dialog").hide();
	        isShown = false;
	    }
	}

vi.filter = {
	
	initialize: function(){
		
		/**var byService = [], byTestType = [];
		
		$("#at-home-test").on( "change", function() {
		  if (this.checked) byService.push($(this).attr("value"));
		  else removeA(byService, $(this).attr("value"));
		  console.log(byService);
		});


		$("input[name=fl-testype]").on( "change", function() {
		  if (this.checked) byTestType.push($(this).attr("value"));
		  else removeA(byTestType, $(this).attr("value"));
		  console.log(byTestType);
		});**/
		
		//{"labId":1,"longitude":"38.26709","latitude":"-121.94","updateDate":"28-Dec-20","sources":"http://www.1carediagnostics.com","country":"USA","state":"CA","county":"Solano","city":"Benicia","coverageAreas":"Bay Area; Northern California","managingOrganization":"1Care Medical Diagnostics","telecom":"laryy.coleman@1carediagnostics.com","phone":"","serviceCapabilities":"Drive-in, Walk-in, At-home Sample","prescription":"","sampleCollectionSupervision":"","typeOfSpecimenCollected":"Nasal Mid turbinate Swab Test; Nasopharyngeal Swab Test","typeOfCovidTest":"AntigenTests; PCR Molecular Tests","dailyCapacity":"501-1000 tests/day","testTurnaround":"Within 24-48 hrs","payorsBilledBy":"Aetna Payors; Anthem Blue Cross Payors; Blue Shield ofCalifornia Payors; Centene Payors; Cigna Payors; Kaiser Permanente Payors; LA Care Payors; Medi-Cal Payors; Medicare FFS Payors; Molina Healthcare Payors; United Healthcare","contractingEntities":"Congregate Living Facilities; Health Plans; Long Term Care Facilities; Outpatient Practices; Private Employers; SFCs","testPerformedByFacility":""}
		
		$("#lab_filter_button").on("click", function(){
			var filter_results = vi.map.all_lab_records;
			
			if($("#at-home-sample").is(":checked")){
				var new_filter_results = []
				for(var i=0;i<filter_results.length;i++){
					var thelab = filter_results[i];
					if(thelab.serviceCapabilities.indexOf("At-home Sample") >= 0){
						new_filter_results.push(thelab);
					}
				}
				filter_results = new_filter_results;
			}
			
			if($("#driven-in-test").is(":checked")){
				var new_filter_results = []
				for(var i=0;i<filter_results.length;i++){
					var thelab = filter_results[i];
					if(thelab.serviceCapabilities.indexOf("Drive-in Test") >= 0){	
						new_filter_results.push(thelab);	
					}
				}
				filter_results = new_filter_results;
			}

			if($("#walk-in-test").is(":checked")){
				var new_filter_results = []
				for(var i=0;i<vi.map.all_lab_records.length;i++){
					var thelab = vi.map.all_lab_records[i];
					if(thelab.serviceCapabilities.indexOf("Walk-in Test") >= 0){
						new_filter_results.push(thelab);
					}	
				}
				filter_results = new_filter_results;	
			}

			if($("#at-home-test").is(":checked")){
				var new_filter_results = []
				for(var i=0;i<filter_results.length;i++){
					var thelab = filter_results[i];
					if(thelab.serviceCapabilities.indexOf("At-Home Test") >= 0){	
						new_filter_results.push(thelab);	
					}
				}
				filter_results = new_filter_results;	
			}
			
			if($("#b2b-lab").is(":checked")){
				var new_filter_results = []
				for(var i=0;i<filter_results.length;i++){
					var thelab = filter_results[i];
					if(thelab.serviceCapabilities.indexOf("Testing Lab (B2B)") >= 0){	
						new_filter_results.push(thelab);	
					}
				}
				filter_results = new_filter_results;	
			}
			console.log("filtered results: ", filter_results);
			vi.map.displayLabs(filter_results);
		})
	},
	
	

	
	removeA: function (arr) {
	  var what, a = arguments, L = a.length, ax;
	  while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax= arr.indexOf(what)) !== -1) {
		  arr.splice(ax, 1);
		}
	  }
	  return arr;
	}
	
}