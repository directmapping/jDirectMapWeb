package org.milyn.smooks.directmapping.gae;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.smooks.templating.mapping.model.JSONMappingModelBuilder;
import org.smooks.templating.model.ModelBuilder;
import org.smooks.templating.model.xml.XMLSampleModelBuilder;
import org.xml.sax.SAXException;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.api.datastore.Transaction;
import com.google.gson.JsonObject;



@SuppressWarnings("serial")
public class InputServlet extends HttpServlet {

	private static final Logger logger = Logger.getLogger(InputServlet.class.getCanonicalName());
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		try {
			
			String sourceXML = URLDecoder.decode(req.getParameter("source"), "UTF-8");
			String destinationXML = URLDecoder.decode(req.getParameter("destination"), "UTF-8");
			
			if (sourceXML != null && sourceXML.length() > 0 && destinationXML != null && destinationXML.length() > 0) {
				String sourcekey = storeXML(sourceXML, "sourceXML" );
				String destinationkey = storeXML(destinationXML, "destinationXML" );
				returnJSON(processXMLtoJSON(sourceXML), processXMLtoJSON(destinationXML),sourcekey, destinationkey, resp.getWriter());
			} else {
				resp.sendRedirect("/");
			}
			
			
			
	        
			
			} catch (Exception e) {
			logger.log(Level.SEVERE, "Exception happening during XML document processing", e);
			throw new RuntimeException("Failed to process XML document", e);
			} 
	}

	
	
	
	
	private void returnJSON(String source, String destination, String sourceXMLKey, String destinationXMLKey, PrintWriter out) throws IOException, SAXException {
		
		 JsonObject json = new JsonObject();
		 json.addProperty("source", source);
		 json.addProperty("destination", destination);
		 json.addProperty("sourceXML", sourceXMLKey);
		 json.addProperty("destinationXML", destinationXMLKey);
		 out.write(json.toString());
     		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.sendRedirect("/");
	}
	
	
	
	private String processXMLtoJSON(String xml) {
		ModelBuilder builder;
		JSONMappingModelBuilder jsonmodel;
		try {
			
			builder = new XMLSampleModelBuilder(xml);	
			builder.configureModel();
			jsonmodel = new JSONMappingModelBuilder(builder.buildModel().getDocumentElement());
			return jsonmodel.getJSON();
			
		} catch (Exception e) {
			 logger.log(Level.WARNING, "XML to JSON XML problem occured : " + e.getMessage()); 
			 return "";
		  }
		
		
	}
	
	  /**
		 * store XML
		 * 
		 * @param content
		 */
		private String storeXML(String content, String entity_type) {
			DatastoreService datastore = DatastoreServiceFactory
					.getDatastoreService();
			Transaction transaction = datastore.beginTransaction();
			Entity entity = new Entity(entity_type);
			entity.setProperty("content", new Text(content));
			Key key = datastore.put(entity);
			logger.log(Level.INFO, "Content processing key " + KeyFactory.keyToString(key) + "value " +  new Text(content) );
			
			transaction.commit();
			return KeyFactory.keyToString(key);
		}
	  

	
	}
	
	
	