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
function jDirectMapTreeProcessor(input_type, input, tree_element) {
	this.tree_element = null;
	/**if(input_type == "AJAX"){
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
	
	*/
	this.tree_element = tree_element;
	
	
	
	
	
	this.initTree(_treedata,input);
	
	/**
	var tree = this.tree_element.dynatree("getTree");
	var childNode = tree.getNodeByKey("root");
	
	childNode.addChild({
        title: "Document using a custom icon",
        icon: "customdoc1.gif"
    });

	**/
}



		
		
		
jDirectMapTreeProcessor.prototype.initTree = function(data,url){
	
	this.tree_element.dynatree({
           	
			initAjax: {
			url: url
		},
		
		
		dnd: {
			autoExpandMS: 1000,
			preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
			onDragStart: function(node) {
				return true;
			},
			onDragStop: function(node) {
			},
			onDragEnter: function(node, sourceNode) {
				/** sourceNode may be null for non-dynatree droppables.
				 *  Return false to disallow dropping on node. In this case
				 *  onDragOver and onDragLeave are not called.
				 *  Return 'over', 'before, or 'after' to force a hitMode.
				 *  Any other return value will calc the hitMode from the cursor position.
				 */
				return true;
			},
			onDragOver: function(node, sourceNode, hitMode) {
				/** Return false to disallow dropping this node.
				 *
				 */
			},
			onDrop: function(node, sourceNode, hitMode, ui, draggable) {
				/**This function MUST be defined to enable dropping of items on the tree.
				 * sourceNode may be null, if it is a non-Dynatree droppable.
				 */
				var copynode;
												
					if(hitMode == "over" && sourceNode) {
						// index calculation  TODO : don't add already existing mapping possible through .unique() function 187 
						// Given an array of DOM elements, returns an array of the unique elements in the original array.
						var numberOfRecords = jQuery("#mapping_list").getGridParam("records");
						logMsg("grid number of rows %s", numberOfRecords);
						jQuery("#mapping_list").jqGrid('addRowData',++numberOfRecords,{id: numberOfRecords, sparam: sourceNode.data.xpath,dparam: node.data.xpath  } );
					}
				
			},
			onDragLeave: function(node, sourceNode) {
				/** Always called if onDragEnter was called.
				 */
			}
		}
			
        });
	

}



/** recursive processing of xml elements bottom down 
 *
 * @input1 node to process
 * @input2 json object to push data into
 * @input3 parent xpath 
 *
 **/
jDirectMapTreeProcessor.prototype.vsTraverse = function(node, arr , parent){
	//get children elements
	var _ch = $(node).children();
	
	//for each element - childerns of @input1 node 
	for(var i=0; i<_ch.length; i++){
		var _vsArr = new Array();
		//recursive travel all children

			 /**
			  * @input1 current child _ch[i] to process
			  * @input2 new _vsArr json object to push data into
			  * @input3 parent xpath parrent plus current node
			**/
			this.vsTraverse(_ch[i], _vsArr , parent + "/" +  _ch[i].parentNode.nodeName );
		
			//get attributes values 
			var _a_att = this.vsTraverseAtt(_ch[i] , parent);
			
		// if there element HAS attributes add attributes as json data 
		// format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _a_att]}]
		if(null!=_a_att){
		//console.log("attributes");
		//console.log("format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _a_att]}]");
		//console.log([{"title":"Attributes "+"["+_ch[i].nodeName+"]", "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "children":_a_att}]);
					_vsArr.push([{"title":"Attributes "+"["+_ch[i].nodeName+"]", "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName , "children":_a_att}]);
		}
		//if element has children and frist child is XML DOM 3	TEXT_NODE
		// format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _vsArr], state:close}]
		// + ": " + _ch[i].firstChild.textContent
		if(null!=_ch[i].firstChild && 3 ==_ch[i].firstChild.nodeType){
		//console.log(_ch[i].nodeName);
		//console.log("format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _vsArr], state:close}]");
		//console.log([{"title":_ch[i].nodeName , "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "children":_vsArr, "state":"close"}]);
			if(0 == _vsArr.length){
				arr.push([{"title":_ch[i].nodeName ,  "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }]);
		
			}else{
				arr.push([{"title":_ch[i].nodeName , "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName, "children":_vsArr,  "expand": true ,isFolder: true}]);
			}
		}
		// else there are no children ie element is leaf 
		// format [{data: Attributes [element] , attr : {id : /xpath/element}, state:close}]
		else{
			 arr.push([{"title":_ch[i].nodeName, "xpath" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }]);
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
jDirectMapTreeProcessor.prototype.vsTraverseAtt = function(node, parent){
	var _a_atts = null;
	//only when attributes exists else return null
	if(null!=node.attributes && node.attributes.length > 0){
		_a_atts = new Array();
		
		//for each attribute of element
		for(var i=0; i<node.attributes.length; i++){
		//	console.log("leaf");
		// format [{data: ATTRIBUTE_NAME , id : /xpath/element.ATTRIBUTE_NAME}]
			_a_atts.push([{ "title": node.attributes[i].nodeName ,   "xpath" : parent + "/" + node.nodeName +"."+ node.attributes[i].nodeName }] );
		}
	}
	return _a_atts;
}

