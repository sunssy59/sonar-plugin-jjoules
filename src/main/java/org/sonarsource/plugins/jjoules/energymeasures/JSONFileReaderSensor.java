/**
 * 
 */
package org.sonarsource.plugins.jjoules.energymeasures;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.List;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonValue;

import org.sonar.api.batch.sensor.Sensor;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;
import org.sonarsource.plugins.jjoules.database.DatabaseManager;

/**
 * @author spirals
 *
 */
public class JSONFileReaderSensor implements Sensor {

	//public static final CSVFileReaderSensor CSV_READER = new CSVFileReaderSensor();

	private static final Logger LOGGER = Loggers.get(ReadJjoulesReportsSensor.class);

	private static final String DEFAULT_DIR = "target/call-graph/";
	private static final String CALL_GRAPH_PATHS_PROPERTY_KEY = "sonar.jjoules.call-graph.path";

	public static List<String> CSV_LINES = new ArrayList<String>();

	public static JsonObject CALLGRAPH;

	@Override
	public void describe(SensorDescriptor descriptor) {
		descriptor.name("j-joules call graph json file reader");

	}

	@Override
	public void execute(SensorContext context) {

		File testsDir = new File(DEFAULT_DIR);

		if(! testsDir.isDirectory())
			LOGGER.error("");
		File[] files = testsDir.listFiles(new FilenameFilter() {

			@Override
			public boolean accept(File dir, String filename) {

				return filename.endsWith(".json");
			}

		});

		if(files.length == 0) {
			LOGGER.error("");
			return;
		}

		File file = files[0];

		LOGGER.info("Reading file {} ...",file.getName());

		// Create JsonReader from json report file.
		JsonReader reader;
		
		try {
			reader = Json.createReader(new FileInputStream(file));
			
			// Get the JsonObject structure from JsonReader.
			CALLGRAPH = reader.readObject();
			reader.close();
				
		} catch (FileNotFoundException e) {
			return;
		}
		
		LOGGER.info("End reading file {}",file.getName());
		
		LOGGER.info("Start registring new callgraph data in database {} ...",DatabaseManager.URL );
		for (String key : CALLGRAPH.keySet()) {
			JsonArray jsonArray = CALLGRAPH.getJsonArray(key);
			for(JsonValue value : jsonArray) {
				String[] values = {key,value.toString()};
				DatabaseManager.insertLineInCallgraphTable(values);
			}
		}
		LOGGER.info("Registring data in base {} (done) ",DatabaseManager.URL );
	}

}
