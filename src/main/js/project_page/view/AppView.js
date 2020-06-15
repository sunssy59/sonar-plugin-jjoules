/*
 * Copyright (C) 2009-2019 SonarSource SA
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
(function ({ app, Backbone, $, _ }) {

  app.AppView = Backbone.View.extend({

    initialize: function(options) {
      _.extend(this, _.pick(options, "branchLike"));
    },

    tpl: _.template(`
<div class="page page-limited jjoules-project_page">
  <% if (branchLike !== undefined) { %>
    <div><strong>
      <% if (branchLike.name !== undefined) { %>
        You are currently on branch <%= branchLike.name %>
      <% } else if (branchLike.key !== undefined) { %>
        You are currently on PR #<%= branchLike.key %>
      <% } %>
    </strong></div>
  <% } %>
  <button class="button button-red" id="jjoules-project_page--button"><%= label %></button>
</div>`),

    el: '#jjoules-project_page',

    events: {
      'click': 'handleClick'
    },

    handleClick: function() {
      alert("Access to peoject ");
    },

    render: function() {
      this.$el.html(this.tpl({ branchLike: this.branchLike, label: "Click on this" }));
      return this;
    }

  });
  
})(window);
