/**
 * 
 */
package org.sonarsource.plugins.jjoules;

import static java.util.Arrays.asList;

import org.sonar.api.Plugin;
import org.sonar.api.config.PropertyDefinition;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeDuration;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeEnergyMertics;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeEnergyMetricsInCPU;
import org.sonarsource.plugins.jjoules.energymeasures.ComputeEnergyMetricsInDRAM;
import org.sonarsource.plugins.jjoules.energymeasures.EnergyMetrics;
import org.sonarsource.plugins.jjoules.energymeasures.SetEnergyOnFilesSensor;
import org.sonarsource.plugins.jjoules.hooks.DisplayQualityGateStatus;
import org.sonarsource.plugins.jjoules.hooks.PostJobInScanner;
import org.sonarsource.plugins.jjoules.languages.FooLanguage;
import org.sonarsource.plugins.jjoules.languages.FooQualityProfile;
import org.sonarsource.plugins.jjoules.measures.ComputeSizeAverage;
import org.sonarsource.plugins.jjoules.measures.ComputeSizeRating;
import org.sonarsource.plugins.jjoules.measures.ExampleMetrics;
import org.sonarsource.plugins.jjoules.measures.SetSizeOnFilesSensor;
import org.sonarsource.plugins.jjoules.rules.CreateIssuesOnJavaFilesSensor;
import org.sonarsource.plugins.jjoules.rules.FooLintIssuesLoaderSensor;
import org.sonarsource.plugins.jjoules.rules.FooLintRulesDefinition;
import org.sonarsource.plugins.jjoules.rules.JavaRulesDefinition;
import org.sonarsource.plugins.jjoules.settings.FooLanguageProperties;
import org.sonarsource.plugins.jjoules.settings.HelloWorldProperties;
import org.sonarsource.plugins.jjoules.settings.SayHelloFromScanner;
import org.sonarsource.plugins.jjoules.web.MyPluginPageDefinition;


/**
 * @author sanoussy
 *
 */
public class JjoulesPlugin implements Plugin {

	@Override
	  public void define(Context context) {
		
		context.addExtension(JjoulesSensor.class);
		
	    // tutorial on hooks
	    // http://docs.sonarqube.org/display/DEV/Adding+Hooks
	    context.addExtensions(PostJobInScanner.class, DisplayQualityGateStatus.class);

	    // tutorial on languages
	    context.addExtensions(FooLanguage.class, FooQualityProfile.class);
	    context.addExtension(FooLanguageProperties.getProperties());

	    // tutorial on measures
//	    context
//	      .addExtensions(ExampleMetrics.class, SetSizeOnFilesSensor.class, ComputeSizeAverage.class, ComputeSizeRating.class);
	    
	    // Energy measures
	    context
	    	.addExtensions(EnergyMetrics.class,
	    			SetEnergyOnFilesSensor.class,
	    			ComputeEnergyMertics.class,
	    			ComputeEnergyMetricsInDRAM.class,
	    			ComputeEnergyMetricsInCPU.class,
	    			ComputeDuration.class);

	    // tutorial on rules
	    context.addExtensions(JavaRulesDefinition.class, CreateIssuesOnJavaFilesSensor.class);
	    context.addExtensions(FooLintRulesDefinition.class, FooLintIssuesLoaderSensor.class);

	    // tutorial on settings
	    context
	      .addExtensions(HelloWorldProperties.getProperties())
	      .addExtension(SayHelloFromScanner.class);

	    // tutorial on web extensions
	    context.addExtension(MyPluginPageDefinition.class);

	    context.addExtensions(asList(
	      PropertyDefinition.builder("sonar.foo.file.suffixes")
	        .name("Suffixes FooLint")
	        .description("Suffixes supported by FooLint")
	        .category("FooLint")
	        .defaultValue("")
	        .build()));
	    
	    //context.addExtension(JjoulesCoverageSensor.class);
	    //context.addExtension(JjoulesSensor.JSON_ARRAY);
//	    context.addExtension(PropertyDefinition.builder(ReportPathsProvider.REPORT_PATHS_PROPERTY_KEY)
//	    		.onQualifiers(Qualifiers.PROJECT)
//	    		.multiValues(true)
//	    		.category("Jjoules")
//	    		.description("Paths to Jjoules Json report")
//	    		.build());
	  }

}
