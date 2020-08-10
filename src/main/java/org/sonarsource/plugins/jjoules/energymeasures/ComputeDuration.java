package org.sonarsource.plugins.jjoules.energymeasures;

import static org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics.DURATION;

import org.sonar.api.ce.measure.Component;
import org.sonar.api.ce.measure.Measure;
import org.sonar.api.ce.measure.MeasureComputer;

public class ComputeDuration implements MeasureComputer {

	@Override
	public MeasureComputerDefinition define(MeasureComputerDefinitionContext defContext) {
		return defContext.newDefinitionBuilder()
				.setOutputMetrics(DURATION.key())
				.build();
	}

	@Override
	public void compute(MeasureComputerContext context) {
		// measure is already defined on files by {@link SetEnergyOnFilesSensor}
		// in scanner stack
		if (context.getComponent().getType() != Component.Type.FILE) {
			int sum = 0;
			for (Measure child : context.getChildrenMeasures(DURATION.key())) {
				sum += child.getIntValue();
			}
			context.addMeasure(DURATION.key(), sum);
		}

	}

}
