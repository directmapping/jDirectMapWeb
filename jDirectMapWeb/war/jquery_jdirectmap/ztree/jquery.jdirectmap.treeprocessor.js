/*
 * jDirectMapTreeProcessor Class
 * version: 1.0 (03-18-2012)
 * 
 * Copyright (c) 2012 Michal Skackov (directmapping.appspot.com/jdirectmap)
 * 
 * @requires jQuery v1.7.1 or later
 * @requires jsTree 1.0-rc1 or later
 *
 * @extending UIMTreeProcessor version: 1.0 (11-16-2010)  Copyright (c) 2010 Vlad Shamgin (uimonster.com)
 *
 * @todo Supports JSON to JSON transformation 
 *	 jsTree 
 *	 zTree 
 *	 Dynatree
 * @todo Supports XML to JSON transformation  
 *	jsTree
 *	zTree
 *	Dynatree
 * @todo Supports XSD to JSON transformation
 *	jsTree
 *	zTree
 *	Dynatree
 *
 * Examples and documentation at: directmapping.appspot.com/jdirectmap
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 


 function jDirectMapTreeProcessor(data, tree_element) {
	this.tree_element = null;
	this.data = data;
	this.tree_element = tree_element;
}
*/
/*
* jDirectMapTreeProcessor
*
*/
function jDirectMapTreeProcessor(input_type, input, tree_element,type) {
	this.tree_element = null;
	if(input_type == "AJAX"){
		$.ajax({
				type: "GET",
				url: input,
				dataType:"xml",
				cache: false,
				beforeSend:function(){
					//do something before send 
					alert("URL: " + input);
				},
				success: function(data){
					this.data = data
				},
				error:function(e){
					alert("Error: "+e);
				}
			});
	}else if(input_type == "TEXT"){
		this.data = $.parseXML(input);
	}else{
		this.data = data;
	}
	
	this.tree_element = tree_element;
	//Find root:
	var _root = $(this.data).children(':first-child');
	var _a_feed = new Array();
	var _treedata = [{ id:1, pId:0, name :_root[0].nodeName, xpath :  "/" + _root[0].nodeName , open: true}];
	this.vsTraverse($(_root), _treedata, "" , 1 );

				// if there element HAS attributes add attributes as json data 
        		if(null!=_root[0].attributes && _root[0].attributes.length > 0){
        					var nodeid = _treedata.length + 1;	
							_treedata.push({"id": nodeid , "pId":  1, "name":"Attributes "+"["+_root[0].nodeName+"]", "xpath" : "/" + _root[0].nodeName + "[@*]" , "open": true ,isFolder: true});
							//get attributes values 
        					this.vsTraverseAtt(_root[0],_treedata, "", nodeid);
        		}
	this.initTree(_treedata,input,type);

}


		
		
jDirectMapTreeProcessor.prototype.initTree = function(data,url,type){
	
	
	/** missing ajax call to get data **/
	
	
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
				beforeDrop: beforeDrop,
				onDrop: dropFunction
			},
			
		};
		
		function dropFunction(e, treeId, treeNodes, targetNode, moveType) {
			var domId = "dom_" + treeId;
			var parId = "par_" + treeId;
			if (moveType == null && (domId == e.target.id)) {
								
				var newDom = $("#" + parId ).find("span[domId=" + treeId + treeNodes[0].id + "]");
				if (newDom.length > 0) {
					newDom.removeClass("domBtn_Disabled");
					newDom.addClass("domBtn");
				} else {
					var id = $("#" + parId ).find('span').length + 1;
				
					
					if(treeId == "tree_source") {
						id = "in" + id;
						$("#" + parId).append("<span class='domBtn_source'   domId='" + treeId + treeNodes[0].id + "'>" +  id + ": " + treeNodes[0].xpath + "</span>");
					}
					else if(treeId == "tree_destination") {
						id = "out" + id;
						$("#" + parId).append("<span class='domBtn_destination'   domId='" + treeId + treeNodes[0].id + "'>" +  id + ": " + treeNodes[0].xpath + "</span>");
						
					}
					
					
					
					
				}
				
			} else if ( $(e.target).parents(".domBtnDiv").length > 0) {
				if(treeId = "tree_source") {
					alert("Input parameters accept only elements from source tree");
				}
				else if(treeId = "tree_destination") {
					alert("Ouput parameters accept only elements from detination tree");
				}
				else {
					alert("Only tree elements allowed to be droped here");
				}
			}
		}
		
		
		
		
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
					
						if(type == "source" && treeId == "tree_destination") {
								jQuery("#mapping_list").jqGrid('addRowData',++numberOfRecords,{id: numberOfRecords, sparam: treeNodes[0].xpath, dparam: targetNode.xpath  } );
								$("#tree_source").find('a').removeClass($.fn.zTree.consts.node.CURSELECTED);
								
								
						}
						else if (type == "destination" && treeId == "tree_source") {
								jQuery("#mapping_list").jqGrid('addRowData',++numberOfRecords,{id: numberOfRecords, sparam: targetNode.xpath , dparam: treeNodes[0].xpath } );
								$("#tree_destination").find('a').removeClass($.fn.zTree.consts.node.CURSELECTED);
							
						}
						
			
					
			return false;
				
				
			//return targetNode ? targetNode.drop !== false : true;
		
		}
		
		
		
			$.fn.zTree.init(this.tree_element, setting, data);
			
			// add CSS class
			this.tree_element.addClass("ztree");
			
			

}



/** recursive processing of xml elements bottom down 
 *
 * @input1 node to process
 * @input2 json object to push data into
 * @input3 parent xpath 
 *
 **/
jDirectMapTreeProcessor.prototype.vsTraverse = function(node, arr , parent, pid){
	//get children elements
	var _ch = $(node).children();
	
	//for each element - child of @input1 node 
	for(var i=0; i<_ch.length; i++){
			

			var curr_nodeid = (pid + i+1);

		//if element has children and first child is XML DOM 3	TEXT_NODE
		if(null!=_ch[i].firstChild && 3 ==_ch[i].firstChild.nodeType){
                             var   nodeid  = arr.length + 1;
                             curr_nodeid = nodeid;
				arr.push({"id": nodeid, "pId":  pid, "name":_ch[i].nodeName , "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName, "open": true ,isFolder: true});
        
		}
		// else there are no child ie element is leaf 
		else{
			if(null==_ch[i].attributes && _ch[i].attributes.length == 0){
				var nodeid  = arr.length + 1;
				curr_nodeid = nodeid;
				arr.push({"id": nodeid, "pId":  pid, "name":_ch[i].nodeName ,  "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName });
			}else{
				var nodeid  = arr.length + 1;
				curr_nodeid = nodeid;
				arr.push({"id": nodeid, "pId":  pid, "name":_ch[i].nodeName , "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName, "open": true ,isFolder: true});
			}
		}

		
			//recursive travel all children
			
         		/**
			  * @input1 current child _ch[i] to process
			  * @input2 new _vsArr json object to push data into
			  * @input3 parent xpath parrent plus current node
			  **/
		
			
			this.vsTraverse(_ch[i], arr , parent + "/" +  _ch[i].parentNode.nodeName , nodeid );
		
        		// if there element HAS attributes add attributes as json data 
        		if(null!=_ch[i].attributes && _ch[i].attributes.length > 0){
        					var nodeid  = arr.length + 1;					
        					arr.push({"id": nodeid, "pId":  curr_nodeid, "name":"Attributes "+"["+_ch[i].nodeName+"]", "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName + "[@*]" , "open": true ,isFolder: true});
        						//get attributes values 
        					this.vsTraverseAtt(_ch[i] ,arr, parent + "/" +  _ch[i].parentNode.nodeName, nodeid);
        		
        		}

	}	
}


/** processing  attributes of xml element
 *
 * @input1 node to process
 * @input2 parent xpath 
 * @output array of attributes in json format
 *
 **/
jDirectMapTreeProcessor.prototype.vsTraverseAtt = function(node,arr,parent, pid){
	
	//only when attributes exists else return null
	if(null!=node.attributes && node.attributes.length > 0){
		
		//for each attribute of element
		for(var i=0; i<node.attributes.length; i++){
		//	console.log("leaf");
		var nodeid  = arr.length + 1;				
		arr.push({ "id": nodeid, "pId":  pid, "name": node.attributes[i].nodeName ,   "xpath" : parent + "/" + node.nodeName +"[@"+ node.attributes[i].nodeName + "]" } );
		
		}
	}

}

