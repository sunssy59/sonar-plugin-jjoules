package org.sonarsource.plugins.jjoules.energymeasures;

import org.sonar.api.batch.fs.FileSystem;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.sensor.Sensor;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.SensorDescriptor;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;
import static org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics.ENERGY_PACKAGE;
import static org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics.ENERGY_DRAM;
import static org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics.ENERGY_DEVICE;
import static org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics.DURATION;




import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;



public class SetEnergyOnFilesSensor implements Sensor {
	private static final Logger LOGGER = Loggers.get(SetEnergyOnFilesSensor.class);
	@Override
	public void describe(SensorDescriptor descriptor) {
		descriptor.name("Compute energy of file");
	}

	@Override
	public void execute(SensorContext context) {
		
		FileSystem fs = context.fileSystem();
		// only "tests" files, but not "main"
		Iterable<InputFile> files = fs.inputFiles(fs.predicates().hasType(InputFile.Type.TEST));
		for (InputFile file : files) {
			if(isEnergyClassTest(file)) {
				String className = file.filename().split("\\.")[0];
				
				context.<Integer>newMeasure()
				.forMetric(ENERGY_PACKAGE)
				.on(file)
				.withValue(getDomainEnergy(className,"package"))
				.save();
				
				context.<Integer>newMeasure()
				.forMetric(ENERGY_DRAM)
				.on(file)
				.withValue(getDomainEnergy(className,"dram"))
				.save();
				
				context.<Integer>newMeasure()
				.forMetric(ENERGY_DEVICE)
				.on(file)
				.withValue(getDomainEnergy(className,"device"))
				.save();
				
				context.<Integer>newMeasure()
				.forMetric(DURATION)
				.on(file)
				.withValue(ReadJjoulesReportsSensor.REPORTS.get(className).getInt("duration|ns"))
				.save();
			}
		}
	}

	
	private int getDomainEnergy(String classeName, String domainName) {
		return ReadJjoulesReportsSensor.REPORTS.get(classeName).getInt(domainName+"|uJ",0);
	}
	
	private boolean isEnergyClassTest(InputFile file) {
		FileReader fr;
		BufferedReader br;
		String line = "";
		if(file.filename().endsWith("EnergyTest.java")) {

			// Verify if test is annotated by @EnergyTest
			try {
				fr = new FileReader(file.file());
				br = new BufferedReader(fr);
				while((line = br.readLine()) != null) {
					if(line.contains("@EnergyTest")) 
						return true;
				}
			} catch (IOException e) {
				return false;
			}
		} return false;
	}
}
