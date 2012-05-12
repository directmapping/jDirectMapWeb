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
 */


 function jDirectMapTreeProcessor(data, tree_element) {
	this.tree_element = null;
	this.data = data;
	this.tree_element = tree_element;
}

/*
* jDirectMapTreeProcessor
*
*/
function jDirectMapTreeProcessor(input_type, input, tree_element) {
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

	this.vsTraverse($(_root), _a_feed, "" );
	
	// if there element HAS attributes add attributes as json data 
	if(null!=_root[0].attributes && _root[0].attributes.length > 0){
				

		//get attributes values 
		var _a_att = this.vsTraverseAtt(_root[0] , "/" + _root[0].nodeName);
		
		// if there element HAS attributes add attributes as json data 
		// format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _a_att]}]
		if(null!=_a_att){
		
			_a_feed.push([{"data":"Attributes "+"["+_root[0].nodeName+"]", "attr" : { "id" : parent + "/" +_root[0].nodeName }, "children":_a_att}]);
			
		}
	}

	
	
	var _treedata = [{"data":_root[0].nodeName,"attr" : { "id" :  "/" + _root[0].nodeName },"children":_a_feed, "state":"open"}];
	this.initTree(_treedata);
	

}


jDirectMapTreeProcessor.prototype.initTree = function(data){
	this.tree_element.jstree({
		"json_data" : {
			"data":data,
			"progressive_render":"true"
		},
		"rules" : { drag_copy:"on", multitree:true },
		"dnd" : { 
		 "after": false,
		 "before": false,
		 "inside": true,
		 "drop_target" : false,
		 "drag_target" : false
		 },
		 "crrm" : { 
				"after": false,
				"before": false,
				"inside": true,
            "move" : {
				"always_copy" : "multitree",
            }
        },
		"plugins" : [ "themes", "json_data", "ui" ,"dnd","crrm" ]
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
		//console.log([{"data":"Attributes "+"["+_ch[i].nodeName+"]", "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "children":_a_att}]);
					_vsArr.push([{"data":"Attributes "+"["+_ch[i].nodeName+"]", "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "children":_a_att}]);
		}
		//if element has children and frist child is XML DOM 3	TEXT_NODE
		// format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _vsArr], state:close}]
		// + ": " + _ch[i].firstChild.textContent
		if(null!=_ch[i].firstChild && 3 ==_ch[i].firstChild.nodeType){
		//console.log(_ch[i].nodeName);
		//console.log("format [{data: Attributes [element] , attr : {id : /xpath/element}, 	children: [JSON _vsArr], state:close}]");
		//console.log([{"data":_ch[i].nodeName , "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "children":_vsArr, "state":"close"}]);
			if(0 == _vsArr.length){
				arr.push([{"data":_ch[i].nodeName , "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }}]);
		
			}else{
				arr.push([{"data":_ch[i].nodeName , "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "children":_vsArr, "state":"close"}]);
			}
		}
		// else there are no children ie element is leaf 
		// format [{data: Attributes [element] , attr : {id : /xpath/element}, state:close}]
		else{
			 arr.push([{"data":_ch[i].nodeName, "attr" : { "id" : parent + "/" + _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }}]);
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
		//	console.log("format [{data: ATTRIBUTE_NAME , attr : {id : /xpath/element.ATTRIBUTE_NAME}}]");
		//	console.log([{ "data": node.attributes[i].nodeName ,  "attr" : { "id" : parent + "/" + node.nodeName +"."+ node.attributes[i].nodeName }}]  );
			//_a_atts.push([node.attributes[i].nodeName + ":" + node.attributes[i].nodeValue , "attr" : { "id" : _ch[i].parentNode.nodeName + "/" +_ch[i].nodeName }, "attr" : { "idn" : i}]);
			// format [{data: ATTRIBUTE_NAME , attr : {id : /xpath/element.ATTRIBUTE_NAME}}]
			_a_atts.push([{ "data": node.attributes[i].nodeName ,  "attr" : { "id" : parent + "/" + node.nodeName +"."+ node.attributes[i].nodeName }}]  );
		}
	}
	return _a_atts;
}

