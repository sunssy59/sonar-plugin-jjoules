package org.sonarsource.plugins.jjoules.energymeasures;

import static java.util.Arrays.asList;

import java.util.List;

import org.sonar.api.measures.CoreMetrics;
import org.sonar.api.measures.Metric;
import org.sonar.api.measures.Metrics;

public class EnergyMetrics implements Metrics {

	public static final String  ENERGY_UNIT = "μJ";
	public static final String DURATION_UNIT = "nS";

	public static final Metric<Integer> ENERGY_PACKAGE = new Metric.Builder("energy_consumption_cpu", "Energy consumed - CPU in ("+ENERGY_UNIT+")" , Metric.ValueType.INT)
			.setDescription("Energy consummed in package")
			.setDirection(Metric.DIRECTION_BETTER)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	public static final Metric<Integer> ENERGY_DRAM = new Metric.Builder("energy_consumption_dram", "Energy consumed - dram in ("+ENERGY_UNIT+")", Metric.ValueType.INT)
			.setDescription("Energy consummed in package")
			.setDirection(Metric.DIRECTION_BETTER)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	public static final Metric<Integer> ENERGY_DEVICE = new Metric.Builder("energy_consumption_device", "Energy consumed by all test(s) in this folder ("+ENERGY_UNIT+")", Metric.ValueType.INT)
			.setDescription("Energy consummed by test(s) in device")
			.setDirection(Metric.DIRECTION_BETTER)
			.setQualitative(false)
			.setDomain(CoreMetrics.DOMAIN_GENERAL)
			.create();

	public static final Metric<Integer> DURATION = new Metric.Builder("duration", "Duration in ("+DURATION_UNIT+")", Metric.ValueType.INT)
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
