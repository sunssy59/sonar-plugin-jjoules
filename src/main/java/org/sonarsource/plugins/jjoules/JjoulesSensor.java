/**
 * 
 */
package org.sonarsource.plugins.jjoules;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import java.nio.file.Path;
import java.util.Collection;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonReader;

//import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.sensor.Sensor;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;

/**
 * @author sanoussy
 *
 */
public class JjoulesSensor implements Sensor {

	private static final Logger LOGGER = Loggers.get(JjoulesSensor.class);

	@Override
	public void describe(SensorDescriptor descriptor) {
		descriptor.name("Jjoules JSON Report Importer");

	}

	@Override
	public void execute(SensorContext context) {
		ReportPathsProvider reportPathsProvider = new ReportPathsProvider(context);
		//Iterable<InputFile> inputFiles = context.fileSystem().inputFiles(context.fileSystem().predicates().all());
	
		
		importReports(reportPathsProvider);
	}
	
	void importReports(ReportPathsProvider reportPathsProvider) {
	    Collection<Path> reportPaths = reportPathsProvider.getPaths();
	    if (reportPaths.isEmpty()) {
	      LOGGER.info("No report imported, no coverage information will be imported by Jjoules JSON Report Importer");
	      return;
	    }
	    
	    LOGGER.info("Importing {} report(s). Turn your logs in debug mode in order to see the exhaustive list.", reportPaths.size());
	    
	    for(Path reportPath : reportPaths) {
	    	LOGGER.info("Reading report '{}'",reportPath);
	    	File file = reportPath.toFile();
			try {
	            // Create JsonReader from Json.
	            JsonReader reader = Json.createReader(new FileInputStream(file));
	            // Get the JsonArray structure from JsonReader.
	            JsonArray jsonArr = reader.readArray();
	            reader.close();
	            LOGGER.info("FILE '{}' content  ==> \n '{}'",reportPath, jsonArr.toString());
	             
		        
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
	    }
	}

}
