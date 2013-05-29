   jQuery(document).ready(function(){

						$("#mapping_main").hide();
												
						$("#source_xml_area").val("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>	<shiporder orderid=\"889923\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"shiporder.xsd\"><orderperson>John Smith</orderperson>							  <shipto>							    <name>Ola Nordmann</name>							    <address>Langgt 23</address>							    <city>4000 Stavanger</city>							    <country>Norway</country>							  </shipto>							  <item>							    <title>Empire Burlesque</title>							    <note>Special Edition</note>							    <quantity>1</quantity>							    <price>10.90</price>							  </item>							  <item>							    <title>Hide your heart</title>							    <quantity>1</quantity>							    <price>9.90</price>							  </item>							</shiporder>");
						$("#dest_xml_area").val(						"<?xml version=\"1.0\"?>" +
								"<PurchaseOrders>" +
								  "<PurchaseOrder PurchaseOrderNumber=\"99503\" OrderDate=\"1999-10-20\">" +
								    "<Address Type=\"Shipping\">" +
								     " <Name>Ellen Adams</Name>" +
								      "<Street>123 Maple Street</Street>" +
								     " <City>Mill Valley</City>" +
								      "<State>CA</State>" +
								     " <Zip>10999</Zip>" +
								    "  <Country>USA</Country>" +
								   " </Address>" +
								   " <Address Type=\"Billing\">" +
								      "<Name>Tai Yee</Name>" +
								      "<Street>8 Oak Avenue</Street>" +
								      "<City>Old Town</City>" +
								      "<State>PA</State>" +
								      "<Zip>95819</Zip>" +
								     " <Country>USA</Country>" +
								    "</Address>" +
								    "<DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>" +
								    "<Items>" +
								      "<Item PartNumber=\"872-AA\">" +
								        "<ProductName>Lawnmower</ProductName>" +
								       " <Quantity>1</Quantity>" +
								      "  <USPrice>148.95</USPrice>" +
								      "  <Comment>Confirm this is electric</Comment>" +
								      "</Item>" +
								      "<Item PartNumber=\"926-AA\">" +
								        "<ProductName>Baby Monitor</ProductName>" +
								       " <Quantity>2</Quantity>" +
								       " <USPrice>39.98</USPrice>" +
								       " <ShipDate>1999-05-21</ShipDate>" +
								      "</Item>" +
								    "</Items>" +
								  "</PurchaseOrder>" +
								  "<PurchaseOrder PurchaseOrderNumber=\"99505\" OrderDate=\"1999-10-22\">" +
								    "<Address Type=\"Shipping\">" +
								      "<Name>Cristian Osorio</Name>" +
								      "<Street>456 Main Street</Street>" +
								      "<City>Buffalo</City>" +
								      "<State>NY</State>" +
								      "<Zip>98112</Zip>" +
								     " <Country>USA</Country>" +
								   " </Address>" +
								    "<Address Type=\"Billing\">" +
								      "<Name>Cristian Osorio</Name>" +
								      "<Street>456 Main Street</Street>" +
								      "<City>Buffalo</City>" +
								      "<State>NY</State>" +
								      "<Zip>98112</Zip>" +
								      "<Country>USA</Country>" +
								    "</Address>" +
								    "<DeliveryNotes>Please notify me before shipping.</DeliveryNotes>" +
								    "<Items>" +
								      "<Item PartNumber=\"456-NM\">" +
								        "<ProductName>Power Supply</ProductName>" +
								        "<Quantity>1</Quantity>" +
								        "<USPrice>45.99</USPrice>" +
								      "</Item>" +
								    "</Items>" +
								 " </PurchaseOrder>" +
								 " <PurchaseOrder PurchaseOrderNumber=\"99504\" OrderDate=\"1999-10-22\">" +
								    "<Address Type=\"Shipping\">" +
								      "<Name>Jessica Arnold</Name>" +
								      "<Street>4055 Madison Ave</Street>" +
								      "<City>Seattle</City>" +
								      "<State>WA</State>" +
								     " <Zip>98112</Zip>" +
								     " <Country>USA</Country>" +
								   " </Address>" +
								   " <Address Type=\"Billing\">" +
								      "<Name>Jessica Arnold</Name>" +
								      "<Street>4055 Madison Ave</Street>" +
								      "<City>Buffalo</City>" +
								      "<State>NY</State>" +
								      "<Zip>98112</Zip>" +
								      "<Country>USA</Country>" +
								    "</Address>" +
								    "<Items>" +
								      "<Item PartNumber=\"898-AZ\">" +
								       " <ProductName>Computer Keyboard</ProductName>" +
								       " <Quantity>1</Quantity>" +
								       " <USPrice>29.99</USPrice>" +
								      "</Item>" +
								      "<Item PartNumber=\"898-AM\">" +
								      "  <ProductName>Wireless Mouse</ProductName>" +
								     "   <Quantity>1</Quantity>" +
								    "    <USPrice>14.99</USPrice>" +
								   "   </Item>" +
								  "  </Items>" +
								  "</PurchaseOrder>" +
								"</PurchaseOrders>" 
								 );
						
					
						
						$("#xmlsubmit").click(function(){  
							
							helper_read_xml();
							helper_grid();
							$("#input_data").hide();
							$("#mapping_main").show();
							
							$("#function_area").val("//Please specify function.\n//Example : \nout1 = in1 + in2;\nout2 = new Date();");
							   var editor = CodeMirror.fromTextArea(document.getElementById("function_area"), {
							       lineNumbers: true,
							       matchBrackets: true
							     });
							$("#function_table").css('width','100%')   
							  
							$("#mapping_list").setGridWidth($(document).width()*0.40);
							$("#mapping_list").setGridWidth($(document).width()*0.40);
							$("#mapping_list").css('width','100%'); 
							$("#gbox_mapping_list").css('width','100%'); 
							$("#gview_mapping_list").css('width','100%'); 
							$("#gridpager").css('width','100%');
							$("#mapping_list").css('width','100%');
							$(".ui-jqgrid-hdiv").css('width','100%');
							$(".ui-jqgrid-htable").css('width','100%');
							$(".ui-jqgrid-bdiv").css('width','100%');
							
							
							
						}); 		
								
					});
 
		
   
	function helper_read_xml(){

			var jTreeSource = new jDirectMapTreeProcessor("TEXT",$("#source_xml_area").val(), $("#tree_source"),"source");
			var jTreeDestination = new jDirectMapTreeProcessor("TEXT",$("#dest_xml_area").val(), $("#tree_destination"),"destination");
			
	}	
	
	
	
	function helper_grid(){
	

		
	var $table = $("#mapping_list");	
	
	
	
	$table.jqGrid({        
				datatype: "local",
				colNames:['id','Source Parameter', 'Destination Parameter'],
				colModel:[
					{name:'id',index:'id', width:100 , sortable: false},
					{name:'sparam',index:'sparam', width:1000 , sortable: false},
					{name:'dparam',index:'dparam', width:1000, align:"right",  sortable: false}  		
				],
				defaults : {
					recordtext: "View {0} - {1} of {2}",
				    emptyrecords: "No records to view",
					loadtext: "Loading...",
					autowidth : "true",
					shrinktofit : "true"
				},
				sortname: 'id',
				width: "100%",
				height: "250",
				viewrecords: false,
				
				onSelectRow: function(id){ 
					  if(id){ 
						  
						  $("#tree_source").find('a').removeClass($.fn.zTree.consts.node.CURSELECTED);
						  $("#tree_destination").find('a').removeClass($.fn.zTree.consts.node.CURSELECTED);
													
						var streeObj = $.fn.zTree.getZTreeObj("tree_source");
						var snode = streeObj.getNodesByParam("xpath",  $table.getRowData(id).sparam);
						
						for( var i=0, l=snode.length; i<l; i++) {
								
								$("#" + snode[i].tId + $.fn.zTree.consts.id.A).addClass($.fn.zTree.consts.node.CURSELECTED);
						}
												
						
						streeObj.expandAll(true);
					
						
						var dtreeObj = $.fn.zTree.getZTreeObj("tree_destination");
						var dnode = dtreeObj.getNodesByParam("xpath",  $table.getRowData(id).dparam);
					
						for( var i=0, l=dnode.length; i<l; i++) {
							
							$("#" + dnode[i].tId + $.fn.zTree.consts.id.A).addClass($.fn.zTree.consts.node.CURSELECTED);
						}
						
						dtreeObj.expandAll(true);
		
						
					}
				},
				
				
				
				
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
	
	$("#clearfunction").click(function(){
		$("#par_tree_source").empty();
		$("#par_tree_destination").empty();
		$("#function_area").val("//Please specify function.\n//Example : \nout1 = in1 + in2;\nout2 = new Date();");
	});

	$("#createfunction").click(function(){
		
		var numberOfRecords = jQuery("#mapping_list").getGridParam("records");
		
		if($("#functionname").val() == ""){
			alert("Please specify unique funcation name");	
		}
		else if($("#par_tree_destination" ).find('span').length == 0){
			alert("Please specify at least one ouput parameter");	
			}
		else if($("#par_tree_source" ).find('span').length == 0){
			alert("Please specify at least one input parameter");				
		}
		else{
			jQuery("#mapping_list").jqGrid('addRowData',++numberOfRecords,{id: numberOfRecords, sparam: $("#functionname").val() +  " Input" , dparam: $("#functionname").val() +  " Output" } );
			$("#par_tree_source").empty();
			$("#par_tree_destination").empty();
			$("#functionname").val("");
			$("#function_area").val("//Please specify function.\n//Example : \nout1 = in1 + in2;\nout2 = new Date();");
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
				/*	// get IDs of all the rows odf jqGrid 
					var rowIds = $table.jqGrid('getDataIDs');
					// iterate through the rows and delete each of them
					for(var i=0,len=rowIds.length;i<len;i++){
						var currRow = rowIds[i];
						$table.jqGrid('delRowData', currRow);
					}	
					$("form").show();
					//$("#mapping_main").hide();
					*/
				 });
	
	
	$("#collapse").click(function(){
		$.fn.zTree.getZTreeObj("tree_source").expandAll(false);
		$.fn.zTree.getZTreeObj("tree_destination").expandAll(false);
		 });
	
	$("#expand").click(function(){
		$.fn.zTree.getZTreeObj("tree_source").expandAll(true);
		$.fn.zTree.getZTreeObj("tree_destination").expandAll(true);
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
	

	
	