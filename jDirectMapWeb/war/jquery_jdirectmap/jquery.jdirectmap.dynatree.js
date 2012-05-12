	 
	jQuery(document).ready(function(){

						$("#mapping_main").hide();
						
						
						$("#source_xml_area").val("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>	<shiporder orderid=\"889923\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"shiporder.xsd\"><orderperson>John Smith</orderperson>							  <shipto>							    <name>Ola Nordmann</name>							    <address>Langgt 23</address>							    <city>4000 Stavanger</city>							    <country>Norway</country>							  </shipto>							  <item>							    <title>Empire Burlesque</title>							    <note>Special Edition</note>							    <quantity>1</quantity>							    <price>10.90</price>							  </item>							  <item>							    <title>Hide your heart</title>							    <quantity>1</quantity>							    <price>9.90</price>							  </item>							</shiporder>");
						$("#dest_xml_area").val("<?xml version=\"1.0\"?> " +
								" <catalog> " +
								"  <book id=\"bk101\"> " +
								"   <author>Gambardella, Matthew</author> <title>XML Developer's Guide</title>  <genre>Computer</genre>   <price>44.95</price>    <publish_date>2000-10-01</publish_date>" +
								"      <description>An in-depth look at creating applications with XML.</description>   </book>   <book id=\"bk102\">  <author>Ralls, Kim</author>    <title>Midnight Rain</title>  <genre>Fantasy</genre>   <price>5.95</price>    <publish_date>2000-12-16</publish_date>    <description>A former architect battles corporate zombies,an evil sorceress, and her own childhood to become queen of the world.</description>  </book>  <book id=\"bk103\">	" +
								"   <author>Corets, Eva</author> <title>Maeve Ascendant</title>   <genre>Fantasy</genre><price>5.95</price> <publish_date>2000-11-17</publish_date><description>After the collapse of a nanotechnology						      society in England, the young survivors lay the						      foundation for a new society.</description>" +
						  " </book> " +
						  " <book id= \"bk104\"> " +
						   "   <author>Corets, Eva</author> " +
						    "  <title>Oberon's Legacy</title> " +
						     " <genre>Fantasy</genre> " +
						      "<price>5.95</price> " +
						    "  <publish_date>2001-03-10</publish_date> " +
						    "  <description>In post-apocalypse England, the mysterious " + 
						    "  agent known only as Oberon helps to create a new life " + 
						    "  for the inhabitants of London. Sequel to Maeve " + 
						    "  Ascendant.</description> " +
						  " </book> " +
						   " <book id=\"bk105\"> " +
						     " <author>Corets, Eva</author> " +
						      " <title>The Sundered Grail</title> " +
						     " <genre>Fantasy</genre> " +
						     " <price>5.95</price> " +
						     " <publish_date>2001-09-10</publish_date> " +
						     " <description>The two daughters of Maeve, half-sisters, " + 
						     " battle one another for control of England. Sequel to " + 
						     " Oberon's Legacy.</description> " +
						  " </book> " +
						  " <book id=\"bk106\"> " +
						  "    <author>Randall, Cynthia</author> " +
						  "    <title>Lover Birds</title> " +
						  "    <genre>Romance</genre> " +
						  "    <price>4.95</price> " +
						  "    <publish_date>2000-09-02</publish_date> " +
						  "    <description>When Carla meets Paul at an ornithology " + 
						  "    conference, tempers fly as feathers get ruffled.</description> " +
						  " </book> " +
						  " <book id=\"bk107\"> " +
						  "    <author>Thurman, Paula</author> " +
						  "    <title>Splish Splash</title> " +
						  "    <genre>Romance</genre> " +
						  "    <price>4.95</price> " +
						  "    <publish_date>2000-11-02</publish_date> " +
						  "    <description>A deep sea diver finds true love twenty " + 
						  "    thousand leagues beneath the sea.</description> " +
						  " </book> " +
						  " <book id=\"bk108\"> " +
						  "    <author>Knorr, Stefan</author> " +
						  "    <title>Creepy Crawlies</title> " +
						  "    <genre>Horror</genre> " +
						  "    <price>4.95</price> " +
						  "    <publish_date>2000-12-06</publish_date> " +
						  "    <description>An anthology of horror stories about roaches, " +
						  "    centipedes, scorpions  and other insects.</description> " +
						  " </book> " +
						  " <book id=\"bk109\"> " +
						  "    <author>Kress, Peter</author> " +
						  "    <title>Paradox Lost</title> " +
						  "    <genre>Science Fiction</genre> " +
						  "    <price>6.95</price> " +
						  "    <publish_date>2000-11-02</publish_date> " +
						  "    <description>After an inadvertant trip through a Heisenberg " +
						  "    Uncertainty Device, James Salway discovers the problems " + 
						  "    of being quantum.</description> " +
						  " </book> " +
						  " <book id=\"bk110\"> " +
						  "    <author>O'Brien, Tim</author> " +
						  "    <title>Microsoft .NET: The Programming Bible</title> " +
						  "    <genre>Computer</genre> " +
						  "    <price>36.95</price> " +
						  "    <publish_date>2000-12-09</publish_date> " +
						  "    <description>Microsoft's .NET initiative is explored in  " +
						  "    detail in this deep programmer's reference.</description> " +
						  " </book> " +
						  " <book id=\"bk111\"> " +
						  "    <author>O'Brien, Tim</author> " +
						  "    <title>MSXML3: A Comprehensive Guide</title> " +
						  "    <genre>Computer</genre> " +
						  "    <price>36.95</price> " +
						  "    <publish_date>2000-12-01</publish_date> " +
						  "    <description>The Microsoft MSXML3 parser is covered in  " +
						  "    detail, with attention to XML DOM interfaces, XSLT processing, " + 
						  "    SAX and more.</description> " +
						  " </book> " +
						  " <book id=\"bk112\"> " +
						  "    <author>Galos, Mike</author> " +
						  "    <title>Visual Studio 7: A Comprehensive Guide</title> " +
						  "    <genre>Computer</genre> " +
						  "    <price>49.95</price> " +
						  "    <publish_date>2001-04-16</publish_date> " +
						  "    <description>Microsoft Visual Studio 7 is explored in depth, " +
						  "    looking at how Visual Basic, Visual C++, C#, and ASP+ are " + 
						  "    integrated into a comprehensive development " + 
						  "    environment.</description> " +
						  " </book> " +
						" </catalog> " );
						
						
						$("form").submit(function () {    
										
							helper_read_xml();
							helper_grid();
							$("form").hide();
							$("#mapping_main").show();
							return false; // so it won't submit
						}); 			
								
					});
	 
	function helper_read_xml(){

			var jTreeSource = new jDirectMapTreeProcessor("TEXT",$("#source_xml_area").val(), $("#tree_source"));
			var jTreeDestination = new jDirectMapTreeProcessor("TEXT",$("#dest_xml_area").val(), $("#tree_destination"));
		
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
	

	
	