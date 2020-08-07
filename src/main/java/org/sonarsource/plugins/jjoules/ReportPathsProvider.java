/**
 * 
 */
package org.sonarsource.plugins.jjoules;

import java.io.File;


import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;

/**
 * @author sanoussy
 *
 */
public class ReportPathsProvider {
	
	private static final Logger LOGGER = Loggers.get(ReportPathsProvider.class);
	
	private final SensorContext context;
	/**
	 * 
	 */
	public ReportPathsProvider(SensorContext context) {
		this.context = context;
	}
	
	File[] getPaths(String defaultDir, String reportPathsPropertyKey){
		
		//LOGGER.info("'{}' is not defined. Using default locations: [ {} ]", reportPathsPropertyKey,pathsString.replace(" ", ","));
		
		File testsDir = new File(defaultDir);
		
		if(! testsDir.isDirectory())
			return null;
		return testsDir.listFiles();
	}
}
