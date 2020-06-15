/*
 * Example Plugin for SonarQube
 * Copyright (C) 2009-2020 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
package org.sonarsource.plugins.jjoules.web;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.Page.Scope;
import org.sonar.api.web.page.PageDefinition;


public class MyPluginPageDefinition implements PageDefinition {

  @Override
  public void define(Context context) {
	  
	  context
     .addPage(Page.builder("jjoules/global_page")
       .setName("Global Page using Vanilla JS")
       .build())
     .addPage(Page.builder("jjoules/jjoules_page")
       .setName("jjoules stats")
       .setScope(Scope.COMPONENT)
       .build());
    //  .addPage(Page.builder("jjoules/portfolio_page")
    //    .setName("Portfolio Page using React JS")
    //    .setScope(Scope.COMPONENT)
    //    //.setComponentQualifiers(VIEW, SUB_VIEW)
    //    .build())
    //  .addPage(Page.builder("jjoules/admin_page")
    //    .setName("Admin Page using React JS")
    //    .setAdmin(true)
    //    .build());
  }
}
