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
			//var jTreeSource = new jDirectMapTreeProcessor("TEXT","customer.json", $("#tree_source"));
			//var jTreeDestination = new jDirectMapTreeProcessor("TEXT","person.json", $("#tree_destination"));
		
		
		var _source_treedata = [
			{ id:1, pId:0, name:"library", open:true , xpath:'/library'},
			{ id:2, pId:1, name:"book", xpath:'/library/book'},
			{ id:3, pId:1, name:"dvd", xpath:'/library/dvd'},
			{ id:4, pId:1, name:"cd", xpath:'/library/cd'},
			{ id:5, pId:1, name:"vinyl", xpath:'/library/vinyl'},
			{ id:6, pId:2, name:"name", xpath:'/library/book/name'},
			{ id:7, pId:2, name:"ISBN", xpath:'/library/book/isbn'},
			{ id:8, pId:2, name:"author", xpath:'/library/book/author'},	
			{ id:9, pId:2, name:"price", xpath:'/library/book/price'},	
			
			{ id:10, pId:3, name:"name", xpath:'/library/dvd/name'},
			{ id:11, pId:3, name:"year", xpath:'/library/dvd/year'},
			{ id:12, pId:3, name:"author", xpath:'/library/dvd/author'},	
			{ id:13, pId:3, name:"price", xpath:'/library/dvd/price'},	
			
			{ id:14, pId:4, name:"name", xpath:'/library/cd/name'},
			{ id:15, pId:4, name:"album", xpath:'/library/cd/album'},
			{ id:16, pId:4, name:"author", xpath:'/library/cd/author'},	
			{ id:17, pId:4, name:"price", xpath:'/library/cd/price'},	
			
			{ id:18, pId:5, name:"name", xpath:'/library/vinyl/name'},
			{ id:19, pId:5, name:"num_of_tracks", xpath:'/library/vinyl/num_of_tracks'},
			{ id:20, pId:5, name:"author", xpath:'/library/vinyl/author'},	
			{ id:21, pId:5, name:"price", xpath:'/library/vinyl/price'}
			
			];


			var _destination_treedata = [
			{ id:1, pId:0, name:"collection", open:true , xpath:'/collection'},
			{ id:2, pId:1, name:"type", xpath:'/collection/type'},
			{ id:3, pId:1, name:"name", xpath:'/collection/name'},
			{ id:4, pId:1, name:"ISBN", xpath:'/collection/ISBN'},
			{ id:5, pId:1, name:"price", xpath:'/collection/price'},
			{ id:6, pId:1, name:"author", xpath:'/collection/author'},
			{ id:7, pId:1, name:"num_of_tracks", xpath:'/collection/num_of_tracks'}
				
			];

			
	var setting = {
			edit: {
				enable: true,
				showRemoveBtn: false,
				showRenameBtn: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeDrag: beforeDrag,
				beforeDrop: beforeDrop
			}
		};
		
		
		function beforeDrag(treeId, treeNodes) {
			for (var i=0,l=treeNodes.length; i<l; i++) {
				if (treeNodes[i].drag === false) {
					return false;
				}
			}
			return true;
		}
		function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		
		
		
				var numberOfRecords = jQuery("#mapping_list").getGridParam("records");
					jQuery("#mapping_list").jqGrid('addRowData',++numberOfRecords,{id: numberOfRecords, sparam: treeNodes[0].xpath,dparam: targetNode.xpath  } );
			
				return false;
				
			//return targetNode ? targetNode.drop !== false : true;
		
		
		
		
		}
		
		
		
			$.fn.zTree.init($("#tree_source"), setting, _source_treedata);
			$.fn.zTree.init($("#tree_destination"), setting , _destination_treedata);
			
			// add CSS class
			jQuery("#tree_source").addClass("ztree");
			jQuery("#tree_destination") .addClass("ztree");
			
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
	

	
	