package org.smooks.templating.mapping.model.util;

import java.util.List;

public class Functions {
	
	 private String id;
	  private String functionname;
		private String value;
	  private List<FunctionsValues> input;
	  private List<FunctionsValues> output;

	  public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public List<FunctionsValues> getInput() {
		return input;
	}
	public void setInput(List<FunctionsValues> input) {
		this.input = input;
	}
	public List<FunctionsValues> getOutput() {
		return output;
	}
	public void setOutput(List<FunctionsValues> output) {
		this.output = output;
	}
	public String getFunctionname() {
		return functionname;
	}
	public void setFunctionname(String functionname) {
		this.functionname = functionname;
	}
	
}
