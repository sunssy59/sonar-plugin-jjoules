/**
 * 
 */
package org.sonarsource.plugins.jjoules.energymeasures;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FilenameFilter;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

import org.sonar.api.batch.sensor.Sensor;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;
import org.sonarsource.plugins.jjoules.database.DatabaseManager;

/**
 *
 *
 */
public class ReadJjoulesReportsSensor implements Sensor {

	private static final Logger LOGGER = Loggers.get(ReadJjoulesReportsSensor.class);

	private static final String DEFAULT_DIR = "target/jjoules-reports/";
	static final String REPORT_PATHS_PROPERTY_KEY = "sonar.jjoules.jsonReportPaths";

	public static Map<String,JsonObject> REPORTS = new HashMap<String,JsonObject>();
	

	@Override
	public void describe(SensorDescriptor descriptor) {
		descriptor.name("j-joules JSON reports reader");

	}

	@Override
	public void execute(SensorContext context) {
		
		
		readReports();
		
		registreData(context.project().key());
	}

	/**
	 * Read all energy reports and put them in Map structure
	 */
	private void readReports() {
		
		File[] files = getPaths(DEFAULT_DIR,REPORT_PATHS_PROPERTY_KEY);

		JsonObject jsonObject;
		if(files != null) {
			LOGGER.info("Reading {} report(s). ", files.length);

			for(File file : files) {
				try {
					LOGGER.info("Reading file {} ...",file.getName());

					// Create JsonReader from json report file.
					JsonReader reader = Json.createReader(new FileInputStream(file));
					// Get the JsonObject structure from JsonReader.
					jsonObject = reader.readObject();
					String[] filenameSplited = file.getName().split("\\.");

					REPORTS.put(filenameSplited[filenameSplited.length-2], jsonObject);

					reader.close();
					LOGGER.info("End reading file {}",file.getName());

				} catch (FileNotFoundException e) {
					return;
				}
			}
		}
	}
	
	private void registreData(String project_key) {
		
		// Create tables if they do not exist
		DatabaseManager.createTable(DatabaseManager.CREATE_TESTS_TABLE_QUERY);
		DatabaseManager.createTable(DatabaseManager.CREATE_TESTS_CALLGRAPH_TABLE_QUERY);
	
		
		LOGGER.info("Start registring energy consumption data in database {} ...",DatabaseManager.URL );
		String analysedAt = new Timestamp(System.currentTimeMillis()).getTime()+"";
		for(String key : REPORTS.keySet()) {
			
			String[] values = { key,"" + REPORTS.get(key).getInt("package|uJ",0),
					"" + REPORTS.get(key).getInt("dram|uJ",0),
					"" + REPORTS.get(key).getInt("device|uJ",0),
					"" + REPORTS.get(key).getInt("duration|ns"),
					analysedAt, project_key};
			DatabaseManager.insertLineInTable(values);
			
		}
		if (REPORTS.keySet().size() == 0)
			LOGGER.info("There is any data to registre!");
		LOGGER.info("Registring data in base {} (done) ",DatabaseManager.URL);
	}

	/**
	 * 
	 * @param defaultDir a default directory for consumption reports 
	 * @param reportPathsPropertyKey if user changed a default  path 
	 * @return a tab of contains files in this directory
	 */
	private File[] getPaths(String defaultDir, String reportPathsPropertyKey){


		File testsDir = new File(defaultDir);

		if(! testsDir.isDirectory())
			return null;
		return testsDir.listFiles(new FilenameFilter() {

			@Override
			public boolean accept(File dir, String filename) {
				
				return filename.endsWith("EnergyTest.json");
			}
			
		});
	}
}
