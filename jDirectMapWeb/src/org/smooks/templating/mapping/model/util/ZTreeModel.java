package org.smooks.templating.mapping.model.util;

public class ZTreeModel {

	
	  private int id;
	  private int pId;
	  private String name;
	  private String xpath;
	  private boolean open;
	  private boolean isFolder;

	
	  public ZTreeModel(int id, int pId, String name, String xpath) {
	    this.id = id;
	    this.pId = pId;
	    this.name = name;
	    this.xpath =  xpath;
	    this.open = false;
	    this.isFolder = false;
	  }
	  
	  
	  public ZTreeModel(int id, int pId, String name, String xpath, boolean open,  boolean isFolder) {
		    this.id = id;
		    this.pId = pId;
		    this.name = name;
		    this.xpath =  xpath;
		    this.open = open;
		    this.isFolder = isFolder;
		  }


	public String getXpath() {
		return xpath;
	}


	public void setXpath(String xpath) {
		this.xpath = xpath;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getpId() {
		return pId;
	}


	public void setpId(int pId) {
		this.pId = pId;
	}


	public boolean isOpen() {
		return open;
	}


	public void setOpen(boolean open) {
		this.open = open;
	}


	public boolean isFolder() {
		return isFolder;
	}


	public void setFolder(boolean isFolder) {
		this.isFolder = isFolder;
	}
	 	  
	  
}
