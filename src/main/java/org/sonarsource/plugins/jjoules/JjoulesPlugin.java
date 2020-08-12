/**
 * 
 */
package org.sonarsource.plugins.jjoules;


import org.sonar.api.Plugin;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeDuration;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeEnergyMerticsDevice;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeEnergyMetricsInCPU;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeEnergyMetricsInDRAM;
import org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics;
import org.sonarsource.plugins.jjoules.energymeasures.ReadJjoulesReportsSensor;
import org.sonarsource.plugins.jjoules.energymeasures.SetEnergyOnFilesSensor;
import org.sonarsource.plugins.jjoules.hooks.DisplayQualityGateStatus;
import org.sonarsource.plugins.jjoules.hooks.PostJobInScanner;
import org.sonarsource.plugins.jjoules.web.MyPluginPageDefinition;


/**
 * @author sanoussy
 *
 */
public class JjoulesPlugin implements Plugin {

	@Override
	public void define(Context context) {

		// tutorial on hooks
		// http://docs.sonarqube.org/display/DEV/Adding+Hooks
		context.addExtensions(PostJobInScanner.class, DisplayQualityGateStatus.class);


		// Energy measures
		context
		.addExtensions(ReadJjoulesReportsSensor.class,
				EnergyMetrics.class,
				SetEnergyOnFilesSensor.class,
				ComputeEnergyMerticsDevice.class,
				ComputeEnergyMetricsInDRAM.class,
				ComputeEnergyMetricsInCPU.class,
				ComputeDuration.class);


		// tutorial on web extensions
		context.addExtension(MyPluginPageDefinition.class);

	}

}
