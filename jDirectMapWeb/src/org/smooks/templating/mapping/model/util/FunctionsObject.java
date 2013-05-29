package org.smooks.templating.mapping.model.util;

import java.util.ArrayList;
import java.util.List;

public class FunctionsObject {

	  private List<Functions> functions;


	  public FunctionsObject() {
		  List<Functions> functions = new ArrayList<Functions>();
			
		    this.functions = functions;
		  }
	  
	  public FunctionsObject(List<Functions> functions) {
		   
			    this.functions = functions;
		  }
	 
	




	public List<Functions> getFunctions() {
		return functions;
	}




	public void setFunctions(List<Functions> functions) {
		this.functions = functions;
	}




	  
}
