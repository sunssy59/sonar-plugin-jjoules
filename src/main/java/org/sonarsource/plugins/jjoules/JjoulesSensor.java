/**
 * 
 */
package org.sonarsource.plugins.jjoules;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
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


/**
 * @author sanoussy
 *
 */
public class JjoulesSensor implements Sensor {

	private static final Logger LOGGER = Loggers.get(JjoulesSensor.class);

	private static final String DEFAULT_DIR = "target/jjoules-reports/";
	static final String REPORT_PATHS_PROPERTY_KEY = "sonar.coverage.jjoules.jsonReportPaths";

	public static Map<String,JsonObject> REPORTS = new HashMap<String,JsonObject>();

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
		File[] files = reportPathsProvider.getPaths(DEFAULT_DIR,REPORT_PATHS_PROPERTY_KEY);

		JsonObject jsonObject;
		if(files != null) {
			LOGGER.info("Importing {} report(s). ", files.length);

			for(File file : files) {
				try {
					// Create JsonReader from Json.
					JsonReader reader = Json.createReader(new FileInputStream(file));
					// Get the JsonObject structure from JsonReader.
					jsonObject = reader.readObject();
					String[] filenameSplited = file.getName().split("\\.");

					REPORTS.put(filenameSplited[filenameSplited.length-2], jsonObject);

					reader.close();
					LOGGER.info("FILE '{}' content  ==> \n '{}'",file.getAbsolutePath(), jsonObject.toString());


				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
