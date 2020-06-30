/**
 * 
 */
package org.sonarsource.plugins.jjoules;

import java.nio.file.Path;
import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;

/**
 * @author sanoussy
 *
 */
public class ReportPathsProvider {
	
	private static final Logger LOGGER = Loggers.get(ReportPathsProvider.class);

	private static final String[] DEFAULT_PATHS = {"target/jjoules-reports/report.json"};
	static final String REPORT_PATHS_PROPERTY_KEY = "sonar.coverage.jjoules.jsonReportPaths";
	
	private final SensorContext context;
	/**
	 * 
	 */
	public ReportPathsProvider(SensorContext context) {
		this.context = context;
	}
	
	Collection<Path> getPaths(){
		Set<Path> reportPaths = Stream.of(context.config().getStringArray(REPORT_PATHS_PROPERTY_KEY))
			.map(this::toAbsolutePath)
			.collect(Collectors.toSet());
		if(!reportPaths.isEmpty())
			return reportPaths;
		
		String defaultPaths = "" ;
		for(String s : DEFAULT_PATHS) {
			defaultPaths += s + " " ;
		}
		LOGGER.info("'{}' is not defined. Using default locations: [ {} ]", REPORT_PATHS_PROPERTY_KEY,defaultPaths.replace(" ", ","));
		
		return Arrays.stream(DEFAULT_PATHS)
				.map(this::toAbsolutePath)
				.filter(ReportPathsProvider::reportExists)
				.collect(Collectors.toSet());
	}
	
	private Path toAbsolutePath(String reportPath) {
		return context.fileSystem().baseDir().toPath().resolve(reportPath);
	}
	
	private static boolean reportExists(Path path) {
		//return Files.isRegularFile(path);
		return path.toFile().exists();
	}
}
