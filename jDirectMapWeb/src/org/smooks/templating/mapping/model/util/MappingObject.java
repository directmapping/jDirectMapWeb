package org.smooks.templating.mapping.model.util;

import java.util.ArrayList;
import java.util.List;

public class MappingObject {

	private String source;
	  private String destination;
	  private List<Mappings> mapping;
	  private List<Functions> functions;


	  public MappingObject() {
		  List<Functions> functions = new ArrayList<Functions>();
		  List<Mappings> mapping = new ArrayList<Mappings>();
			
		    this.source = "";
		    this.destination =  "";
		    this.mapping = mapping;
		    this.functions = functions;
		  }
	  
	  public MappingObject(String source, String destination,  List<Mappings> mappings,  List<Functions> functions) {
		   
		    this.source = source;
		    this.destination =  destination;
		    this.mapping = mappings;
		    this.functions = functions;
		  }
	 
	  public String getSource() {
		return source;
	}




	public void setSource(String source) {
		this.source = source;
	}




	public String getDestination() {
		return destination;
	}




	public void setDestination(String destination) {
		this.destination = destination;
	}




	public List<Mappings> getMapping() {
		return mapping;
	}




	public void setMapping(List<Mappings> mapping) {
		this.mapping = mapping;
	}




	public List<Functions> getFunctions() {
		return functions;
	}




	public void setFunctions(List<Functions> functions) {
		this.functions = functions;
	}




	



	  
}
