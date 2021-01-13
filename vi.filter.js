


vi.filter = {
	
	isShown : false,
	
	toggleDialog : function(){
	    if(!vi.filter.isShown){
	        $("#dialog").show();
	        vi.filter.isShown = true;
	    } else {
	        $("#dialog").hide();
	        vi.filter.isShown = false;
	    }
	},
	
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
		
		$("#lab_filter_button").on("click", vi.filter.filter_labs);
		
		$(".whatever-checkbox-is").on("change", vi.filter.filter_labs);
		
	},
	
	filter_labs: function(){
			
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
				if(thelab.serviceCapabilities.indexOf("Drive-in") >= 0){	
					new_filter_results.push(thelab);	
				}
			}
			filter_results = new_filter_results;
		}

		if($("#walk-in-test").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<vi.map.all_lab_records.length;i++){
				var thelab = vi.map.all_lab_records[i];
				if(thelab.serviceCapabilities.indexOf("Walk-in") >= 0){
					new_filter_results.push(thelab);
				}	
			}
			filter_results = new_filter_results;	
		}

		if($("#at-home-test").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("At-home Test") >= 0){	
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		
		if($("#community-test").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Community test") >= 0){ // here community test is not added in the database	
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}

		if($("#Antigen").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("AntigenTests") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}

		if($("#PCR_Molecular").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("PCR Molecular Tests") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}

		if($("#Serology").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Serology Tests") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}

		if($("#pooled-testing").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Pooled Testing") >= 0){ // here pooled test is not added in the database	
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		//sample type check
		if($("#saliva").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Saliva Test") >= 0){
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#oral_swab_sample").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Oropharyngeal Swab Test") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#nasal_swab_sample").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Nasopharyngeal Swab Test") >= 0){ 	
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#serology_sample").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Serum Test") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		//Turnaround Time
		if($("#less_than_30mins").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("less_than_30mins") >= 0){ //no data for less than 30 mins
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#less_than_24hrs").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Less than 24 hrs") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#24-48hrs").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("Within 24-48 hrs") >= 0){ 	
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#48-72hrs").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("48-72 hrs") >= 0){ 
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}
		if($("#72-96hrs").is(":checked")){
			var new_filter_results = []
			for(var i=0;i<filter_results.length;i++){
				var thelab = filter_results[i];
				if(thelab.serviceCapabilities.indexOf("72-96hrs") >= 0){ //no data for these hrs
					new_filter_results.push(thelab);
				}
			}
			filter_results = new_filter_results;	
		}


		console.log("filtered results: ", filter_results);
		
		if(filter_results.length>0){
			
			vi.map.displayLabs(filter_results);
			
		}
		
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