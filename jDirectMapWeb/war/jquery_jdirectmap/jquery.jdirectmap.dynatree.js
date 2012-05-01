	 
	jQuery(document).ready(function(){

						$("#mapping_main").hide();
						$("form").submit(function () {    
										
							helper_read_xml();
							helper_grid();
							$("form").hide();
							$("#mapping_main").show();
							return false; // so it won't submit
						}); 			
								
					});
	 
	function helper_read_xml(){

			//var jTreeSource = new jDirectMapTreeProcessor("TEXT",$("#source_xml_area").val(), $("#tree_source"));
			//var jTreeDestination = new jDirectMapTreeProcessor("TEXT",$("#dest_xml_area").val(), $("#tree_destination"));
			var jTreeSource = new jDirectMapTreeProcessor("TEXT","customer.json", $("#tree_source"));
			var jTreeDestination = new jDirectMapTreeProcessor("TEXT","person.json", $("#tree_destination"));
		
			
	}	
	
	
	function helper_grid(){
	
	var $table = $("#mapping_list");	
	$table.jqGrid({        
				datatype: "local",
				colNames:['id','Source Parameter', 'Destination Parameter'],
				colModel:[
					{name:'id',index:'id', width:1 , sortable: false},
					{name:'sparam',index:'sparam', width:280 , sortable: false},
					{name:'dparam',index:'dparam', width:280, align:"right",  sortable: false}  		
				],
				sortname: 'id',
				viewrecords: false,
				height: "100%",
				width:"auto",
				editurl:"someurl.php", // local processing
				pager: '#gridpager'  // remove the data
	});

	
	
	
	
	$("#deletedata").click(function(){
				var tableData = new Array();
				var ids = '';
				$table.delRowData($table.getGridParam('selrow'));
				ids = $table.getDataIDs();
					for(var i = 0; i < ids.length; i++){
						 tableData[i] = $table.getRowData(ids[i]);
						 tableData[i].id = i + 1;
					 }
				$table.clearGridData(false);
					for(i = 0; i < tableData.length; i++){
						 $table.addRowData(i + 1, tableData[i]);
					}
				});

	$("#getrow").click(function(){
				 var dataString = '';
				 var ids = $table.getDataIDs();
				 dataString += 'Selected Row: ' + $table.getGridParam('selrow') + '\nRow ID: ' + ids[$table.getGridParam('selrow') - 1];
				 alert(dataString);
				});	
	
	$("#getdata").click(function(){
				 var ids = $table.getDataIDs();
				 var dataString = '';
					 for(var i = 0; i < ids.length; i++){
						dataString += 'postion: ' + i + ' ' + ids[i] + '\n';
					 }
				 alert(dataString);
				 });
	
	$("#clear").click(function(){
					// get IDs of all the rows odf jqGrid 
					var rowIds = $table.jqGrid('getDataIDs');
					// iterate through the rows and delete each of them
					for(var i=0,len=rowIds.length;i<len;i++){
						var currRow = rowIds[i];
						$table.jqGrid('delRowData', currRow);
					}	
					
				 });
				 
	$("#import").click(function(){
					// get IDs of all the rows odf jqGrid 
					var rowIds = $table.jqGrid('getDataIDs');
					// iterate through the rows and delete each of them
					for(var i=0,len=rowIds.length;i<len;i++){
						var currRow = rowIds[i];
						$table.jqGrid('delRowData', currRow);
					}	
					$("form").show();
					//$("#mapping_main").hide();
				 });
				 			 
	$("#export").click(function(){
					alert("Check out https://github.com/dcneiner/Downloadify ");
					
					helper_grid();
					
					$.download('customer.json','filename=mySpreadsheet&format=json&content=' + $table );


				 });				
				 
	$("#moveup").click(function(){
				   move('up');
				 });
				
	$("#movedown").click(function(){
				   move('down');
				 });

				 function move(direction){
		 if($table.getGridParam('selrow')){
		 var ids = $table.getDataIDs();
		 var temp = 0;
		 var currRow = ids[ $table.getGridParam('selrow') - 1 ];
		 if(direction === 'up' && currRow > 1){
		 var r1 = $table.getRowData(currRow-1);
		 var r2 = $table.getRowData(currRow);
		 $table.delRowData(currRow-1);
		 $table.delRowData(currRow);
		 temp = r1.id;
		 r1.id = r2.id;
		 r2.id = temp;
		 $table.addRowData(r2.id, r2);
		 $table.addRowData(r1.id, r1);
		 }
		 if(direction === 'down' && currRow < (ids.length)){
		 var r1 = $table.getRowData(currRow);
		 var r2 = $table.getRowData(parseInt(currRow)+1);
		 $table.delRowData(currRow);
		 $table.delRowData(parseInt(currRow)+1);
		 temp = r1.id;
		 r1.id = r2.id;
		 r2.id = temp;
		 $table.addRowData(r1.id, r1);
		 $table.addRowData(r2.id, r2);
		 }
		 // Sort the table   
		 $table.setGridParam({sortname:'id'}).trigger('reloadGrid');
		 }
	}
	
	}
	

	
	