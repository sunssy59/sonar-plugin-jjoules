package org.sonarsource.plugins.jjoules.energymeasures;

import static java.util.Arrays.asList;

import java.util.List;

import org.sonar.api.measures.CoreMetrics;
import org.sonar.api.measures.Metric;
import org.sonar.api.measures.Metrics;

public class EnergyMetrics implements Metrics {

	public static final Metric<Integer> ENERGY_PACKAGE = new Metric.Builder("Energy consumption - CPU", "Energy consummed - CPU in (uJ)" , Metric.ValueType.INT)
			.setDescription("Energy consummed in package")
			.setDirection(Metric.DIRECTION_BETTER)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	public static final Metric<Integer> ENERGY_DRAM = new Metric.Builder("Energy consumption - dram", "Energy consummed - dram in (uJ)", Metric.ValueType.INT)
			.setDescription("Energy consummed in package")
			.setDirection(Metric.DIRECTION_BETTER)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	public static final Metric<Integer> ENERGY_DEVICE = new Metric.Builder("Energy consumption - device", "Energy consummed by all test(s) in this folder (uJ)", Metric.ValueType.INT)
			.setDescription("Energy consummed by test(s) in device")
			.setDirection(Metric.DIRECTION_BETTER)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	public static final Metric<Integer> DURATION = new Metric.Builder("Duration", "Duration in (ns)", Metric.ValueType.INT)
			.setDescription("Duration")
			.setDirection(Metric.DIRECTION_WORST)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	@Override
	public List<Metric> getMetrics() {
		return asList(ENERGY_PACKAGE, ENERGY_DRAM,ENERGY_DEVICE,DURATION);
	}

}
