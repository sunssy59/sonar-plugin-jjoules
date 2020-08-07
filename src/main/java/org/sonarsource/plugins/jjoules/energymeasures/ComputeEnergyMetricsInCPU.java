package org.sonarsource.plugins.jjoules.energymeasures;

import static org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics.ENERGY_PACKAGE;

import org.sonar.api.ce.measure.Component;
import org.sonar.api.ce.measure.Measure;
import org.sonar.api.ce.measure.MeasureComputer;

public class ComputeEnergyMetricsInCPU implements MeasureComputer {

	@Override
	public MeasureComputerDefinition define(MeasureComputerDefinitionContext defContext) {
		return defContext.newDefinitionBuilder()
				.setOutputMetrics(ENERGY_PACKAGE.key())
				.build();
	}

	@Override
	public void compute(MeasureComputerContext context) {
		// measure is already defined on files by {@link SetSizeOnFilesSensor}
	    // in scanner stack
	    if (context.getComponent().getType() != Component.Type.FILE) {
	      int sum = 0;
	      for (Measure child : context.getChildrenMeasures(ENERGY_PACKAGE.key())) {
	        sum += child.getIntValue();
	      }
	      context.addMeasure(ENERGY_PACKAGE.key(), sum);
	    }
	}

}
