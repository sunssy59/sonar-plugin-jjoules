/**
 * 
 */
package org.sonarsource.plugins.jjoules;

import static java.util.Arrays.asList;

import org.sonar.api.Plugin;
import org.sonar.api.config.PropertyDefinition;
import org.sonarsource.plugins.example.hooks.DisplayQualityGateStatus;
import org.sonarsource.plugins.example.hooks.PostJobInScanner;
import org.sonarsource.plugins.example.languages.FooLanguage;
import org.sonarsource.plugins.example.languages.FooQualityProfile;
import org.sonarsource.plugins.example.measures.ComputeSizeAverage;
import org.sonarsource.plugins.example.measures.ComputeSizeRating;
import org.sonarsource.plugins.example.measures.ExampleMetrics;
import org.sonarsource.plugins.example.measures.SetSizeOnFilesSensor;
import org.sonarsource.plugins.example.rules.CreateIssuesOnJavaFilesSensor;
import org.sonarsource.plugins.example.rules.FooLintIssuesLoaderSensor;
import org.sonarsource.plugins.example.rules.FooLintRulesDefinition;
import org.sonarsource.plugins.example.rules.JavaRulesDefinition;
import org.sonarsource.plugins.example.settings.FooLanguageProperties;
import org.sonarsource.plugins.example.settings.HelloWorldProperties;
import org.sonarsource.plugins.example.settings.SayHelloFromScanner;
import org.sonarsource.plugins.example.web.MyPluginPageDefinition;

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

	    // tutorial on languages
	    context.addExtensions(FooLanguage.class, FooQualityProfile.class);
	    context.addExtension(FooLanguageProperties.getProperties());

	    // tutorial on measures
	    context
	      .addExtensions(ExampleMetrics.class, SetSizeOnFilesSensor.class, ComputeSizeAverage.class, ComputeSizeRating.class);

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
	  }

}
