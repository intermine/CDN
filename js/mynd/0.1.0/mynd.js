(function() {
  var Selection;

  window.Mynd = {};

  Mynd.Scale = {};

  Mynd.Chart = {};

  Mynd.VERSION = '0.1.0';

  Mynd.select = function(selector) {
    if (typeof selector === "string") {
      return (new Selection([document])).select(selector);
    } else {
      return new Selection([[selector]]);
    }
  };

  Mynd.selectAll = function(selector) {
    if (typeof selector === "string") {
      return (new Selection([document])).selectAll(selector);
    } else {
      throw new Error('Mynd.selectAll(Nodes): this function is not implemented');
    }
  };

  Mynd.Scale.ordinal = function() {
    return (function() {
      var internal, scale;
      internal = {};
      scale = function(x) {
        if (!(internal.range != null)) {
          throw new Error('Mynd.Scale.ordinal: you need to set input range first');
        }
        return internal.range[x];
      };
      scale.setDomain = function(domain) {
        var d, element, key, value, _i, _len;
        if (domain == null) {
          domain = [];
        }
        d = {};
        for (_i = 0, _len = domain.length; _i < _len; _i++) {
          element = domain[_i];
          d[element] = element;
        }
        internal.domain = (function() {
          var _results;
          _results = [];
          for (key in d) {
            value = d[key];
            _results.push(value);
          }
          return _results;
        })();
        return scale;
      };
      scale.setRangeBands = function(bands, padding) {
        var range, reverse, start, step, stop, _i, _ref, _ref1, _results;
        if (padding == null) {
          padding = 0;
        }
        if (!(internal.domain != null)) {
          throw new Error('Mynd.Scale.ordinal: you need to set input domain first');
        }
        start = bands[0];
        stop = bands[1];
        reverse = bands[1] < bands[0];
        if (reverse) {
          _ref = [start, stop], stop = _ref[0], start = _ref[1];
        }
        step = (stop - start) / (internal.domain.length + padding);
        range = (function() {
          _results = [];
          for (var _i = 0, _ref1 = internal.domain.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; 0 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(function(i) {
          return (start + (step * padding)) + (step * i);
        });
        if (reverse) {
          range.reverse();
        }
        internal.range = range;
        internal.rangeBand = step * (1 - padding);
        return scale;
      };
      scale.getRangeBand = function() {
        return internal.rangeBand;
      };
      return scale.setDomain();
    })();
  };

  Mynd.Scale.linear = function() {
    return (function() {
      var deinterpolate, internal, interpolate, scale, scaleBilinear;
      internal = {};
      deinterpolate = function(a, b) {
        return function(x) {
          return (x - a) * 1 / (b - a);
        };
      };
      interpolate = function(a, b, round) {
        if (round) {
          return function(x) {
            return Math.round(a + b * x);
          };
        } else {
          return function(x) {
            return a + b * x;
          };
        }
      };
      scaleBilinear = function(domain, range, round) {
        return function(x) {
          return interpolate(range[0], range[1], round)(deinterpolate(domain[0], domain[1])(x));
        };
      };
      scale = function(x) {
        if (!(internal.output != null)) {
          if ((internal.domain != null) && (internal.range != null)) {
            internal.output = scaleBilinear(internal.domain, internal.range, internal.round);
          } else {
            throw new Error('Mynd.Scale.linear: you need to set both input domain and range');
          }
        }
        return internal.output(x);
      };
      scale.setDomain = function(domain) {
        internal.domain = domain;
        return scale;
      };
      scale.setRange = function(range, round) {
        if (round == null) {
          round = false;
        }
        internal.range = range;
        internal.round = round;
        return scale;
      };
      scale.getTicks = function(amount) {
        var reverse, span, start, step, stop, ticks, x, _ref;
        if (!(internal.domain != null)) {
          throw new Error('Mynd.Scale.linear: you need to set input domain first');
        }
        start = internal.domain[0];
        stop = internal.domain[1];
        reverse = internal.domain[1] < internal.domain[0];
        if (reverse) {
          _ref = [start, stop], stop = _ref[0], start = _ref[1];
        }
        span = stop - start;
        step = Math.pow(10, Math.floor(Math.log(span / amount) / Math.LN10));
        x = amount / span * step;
        if (x <= .15) {
          step *= 10;
        } else if (x <= .35) {
          step *= 5;
        } else if (x <= .75) {
          step *= 2;
        }
        ticks = [];
        x = Math.ceil(start / step) * step;
        while (x <= Math.floor(stop / step) * step + step * .5) {
          ticks.push(x);
          x += step;
        }
        return ticks;
      };
      return scale;
    })();
  };

  Selection = (function() {

    Selection.prototype.event = null;

    function Selection(elements) {
      this.elements = elements != null ? elements : [];
    }

    Selection.prototype.qualify = function(name) {
      var index;
      if (!(index = name.indexOf('svg:'))) {
        return {
          space: 'http://www.w3.org/2000/svg',
          local: name.slice(4)
        };
      } else {
        return name;
      }
    };

    Selection.prototype.select = function(selector) {
      var i, j, node, subgroup, subgroups, subnode, _i, _j, _ref, _ref1;
      if (typeof selector !== "function") {
        selector = (function(selector) {
          return function() {
            return this.querySelector(selector);
          };
        })(selector);
      }
      subgroups = [];
      for (i = _i = 0, _ref = this.elements.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        subgroups.push(subgroup = []);
        for (j = _j = 0, _ref1 = this.elements[i].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (node = this.elements[i][j]) {
            subgroup.push(subnode = selector.call(node, node.__data__, j));
            if (subnode && "__data__" in node) {
              subnode.__data__ = node.__data__;
            }
          } else {
            subgroup.push(null);
          }
        }
      }
      return new Selection(subgroups);
    };

    Selection.prototype.selectAll = function(selector) {
      var i, j, node, subgroup, subgroups, _i, _j, _ref, _ref1;
      subgroups = [];
      if (typeof selector !== "function") {
        selector = (function(selector) {
          return function() {
            return this.querySelectorAll(selector);
          };
        })(selector);
      }
      for (i = _i = 0, _ref = this.elements.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.elements[i].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (node = this.elements[i][j]) {
            subgroups.push(subgroup = Array.prototype.slice.call(selector.call(node, node.__data__, j)));
          }
        }
      }
      return new Selection(subgroups);
    };

    Selection.prototype.append = function(name) {
      name = this.qualify(name);
      if (name.local) {
        return this.select(function() {
          return this.appendChild(document.createElementNS(name.space, name.local));
        });
      } else {
        return this.select(function() {
          return this.appendChild(document.createElementNS(this.namespaceURI, name));
        });
      }
    };

    Selection.prototype.each = function(callback) {
      var i, j, node, _i, _j, _ref, _ref1;
      for (i = _i = 0, _ref = this.elements.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.elements[i].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          node = this.elements[i][j];
          if (node) {
            callback.call(node, node.__data__, i, j);
          }
        }
      }
      return this;
    };

    Selection.prototype.attr = function(name, value) {
      name = this.qualify(name);
      return this.each((function() {
        if (!(value != null)) {
          if (name.local) {
            return function() {
              return this.removeAttributeNS(name.space, name.local);
            };
          } else {
            return function() {
              return this.removeAttribute(name);
            };
          }
        } else {
          if (typeof value === "function") {
            if (name.local) {
              return function() {
                var x;
                x = value.apply(this, arguments);
                if (x == null) {
                  return this.removeAttributeNS(name.space, name.local);
                } else {
                  return this.setAttributeNS(name.space, name.local, x);
                }
              };
            } else {
              return function() {
                var x;
                x = value.apply(this, arguments);
                if (x == null) {
                  return this.removeAttribute(name);
                } else {
                  return this.setAttribute(name, x);
                }
              };
            }
          } else {
            if (name.local) {
              return function() {
                return this.setAttributeNS(name.space, name.local, value);
              };
            } else {
              return function() {
                return this.setAttribute(name, value);
              };
            }
          }
        }
      })());
    };

    Selection.prototype.css = function(name) {
      return window.getComputedStyle(this.node(), null).getPropertyValue(name);
    };

    Selection.prototype.text = function(value) {
      if (value == null) {
        return this.node().textContent;
      }
      return this.each((function() {
        if (typeof value === "function") {
          return function() {
            return this.textContent = value.apply(this, arguments) || '';
          };
        } else {
          return function() {
            return this.textContent = value;
          };
        }
      })());
    };

    Selection.prototype.node = function(callback) {
      var i, j, _i, _j, _ref, _ref1;
      for (i = _i = 0, _ref = this.elements.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        for (j = _j = 0, _ref1 = this.elements[i].length; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (this.elements[i][j] != null) {
            return this.elements[i][j];
          }
        }
      }
      return null;
    };

    Selection.prototype.on = function(type, listener) {
      var i, name;
      name = "__on" + type;
      if (listener == null) {
        return (i = this.node()[name])._;
      }
      return this.each(function(x, index) {
        var eventListener, o,
          _this = this;
        eventListener = function(event) {
          var bak;
          bak = Selection.event;
          Selection.event = event;
          try {
            return listener.call(_this, _this.__data__, index);
          } finally {
            Selection.event = bak;
          }
        };
        o = this[name];
        if (o) {
          this.removeEventListener(type, o, o.$);
          delete this[name];
        }
        if (listener) {
          this.addEventListener(type, this[name] = eventListener, eventListener.$ = false);
          return eventListener._ = listener;
        }
      });
    };

    return Selection;

  })();

  Mynd.Chart.column = (function() {

    column.prototype.isStacked = false;

    column.prototype.colorbrewer = 4;

    column.prototype.padding = {
      'barValue': 2,
      'axisLabels': 5,
      'barPadding': 0.05
    };

    column.prototype.ticks = {
      'count': 10
    };

    column.prototype.description = {
      'triangle': {
        'degrees': 30,
        'sideA': 0.5,
        'sideB': 0.866025
      }
    };

    column.prototype.series = {};

    function column(o) {
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
      $(this.el).css('height', this.height);
    }

    column.prototype.render = function() {
      var bar, barHeight, barValueHeight, barWidth, bars, canvas, chart, color, desc, descG, descriptionTextHeight, descriptions, domain, g, grid, group, groupValue, height, index, key, labels, line, series, t, text, textWidth, tick, ty, value, values, verticalAxisLabelHeight, w, width, x, y, _i, _j, _k, _len, _len1, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results,
        _this = this;
      height = this.height;
      width = this.width;
      $(this.el).empty();
      canvas = Mynd.select(this.el[0]).append('svg:svg').attr('class', 'canvas');
      this.useWholeNumbers = true;
      this.maxValue = -Infinity;
      if (this.isStacked) {
        _ref = this.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          group = _ref[_i];
          groupValue = 0;
          _ref1 = group.data;
          for (key in _ref1) {
            value = _ref1[key];
            if (parseInt(value) !== value) {
              this.useWholeNumbers = false;
            }
            groupValue = groupValue + value;
          }
          if (groupValue > this.maxValue) {
            this.maxValue = groupValue;
          }
        }
      } else {
        _ref2 = this.data;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          group = _ref2[_j];
          _ref3 = group.data;
          for (key in _ref3) {
            value = _ref3[key];
            if (parseInt(value) !== value) {
              this.useWholeNumbers = false;
            }
            if (value > this.maxValue) {
              this.maxValue = value;
            }
          }
        }
      }
      if (this.axis != null) {
        labels = canvas.append('svg:g').attr('class', 'labels');
        if (this.axis.horizontal != null) {
          text = labels.append("svg:text").attr("class", "horizontal").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height - this.padding.axisLabels).text(this.axis.horizontal);
          height = height - text.node().getBBox().height - this.padding.axisLabels;
          text.attr('fill', text.css('fill'));
          text.attr('font-size', text.css('font-size'));
          text.attr('font-family', text.css('font-family'));
        }
        if (this.axis.vertical != null) {
          text = labels.append("svg:text").attr("class", "vertical").attr("text-anchor", "middle").attr("x", 0).attr("y", height / 2).text(this.axis.vertical);
          verticalAxisLabelHeight = text.node().getBBox().height;
          text.attr("transform", "rotate(-90 " + verticalAxisLabelHeight + " " + (height / 2) + ")");
          width = width - verticalAxisLabelHeight - this.padding.axisLabels;
          text.attr('fill', text.css('fill'));
          text.attr('font-size', text.css('font-size'));
          text.attr('font-family', text.css('font-family'));
        }
      }
      descriptions = canvas.append('svg:g').attr('class', 'descriptions');
      this.description.maxWidth = -Infinity;
      this.description.totalWidth = 0;
      descriptionTextHeight = 0;
      _ref4 = this.data;
      for (index in _ref4) {
        group = _ref4[index];
        g = descriptions.append("svg:g").attr("class", "g" + index);
        text = g.append("svg:text").attr("class", "text").attr("text-anchor", "end").text(group.description);
        textWidth = text.node().getComputedTextLength();
        if (textWidth > this.description.maxWidth) {
          this.description.maxWidth = textWidth;
        }
        this.description.totalWidth = this.description.totalWidth + textWidth;
        text.attr('fill', text.css('fill'));
        text.attr('font-size', text.css('font-size'));
        text.attr('font-family', text.css('font-family'));
        g.append("svg:title").text(group.description);
        if (descriptionTextHeight === 0) {
          descriptionTextHeight = text.node().getBBox().height;
        }
      }
      height = height - descriptionTextHeight;
      grid = canvas.append("svg:g").attr("class", "grid");
      domain = {};
      domain.ticks = (function() {
        var t, _k, _len2, _ref5, _results;
        _ref5 = Mynd.Scale.linear().setDomain([0, _this.maxValue]).getTicks(_this.ticks.count);
        _results = [];
        for (_k = 0, _len2 = _ref5.length; _k < _len2; _k++) {
          t = _ref5[_k];
          if ((parseInt(t) === t) || !_this.useWholeNumbers) {
            _results.push(t);
          }
        }
        return _results;
      })();
      this.ticks.maxWidth = -Infinity;
      _ref5 = domain.ticks;
      for (index in _ref5) {
        tick = _ref5[index];
        t = grid.append("svg:g").attr('class', "t" + index);
        text = t.append("svg:text").attr("class", "tick").attr("text-anchor", "begin").attr("x", 0).text(tick);
        textWidth = text.node().getComputedTextLength();
        if (textWidth > this.ticks.maxWidth) {
          this.ticks.maxWidth = textWidth;
        }
        text.attr('fill', text.css('fill'));
        text.attr('font-size', text.css('font-size'));
        text.attr('font-family', text.css('font-family'));
      }
      width = width - this.ticks.maxWidth;
      domain.x = Mynd.Scale.ordinal().setDomain((function() {
        _results = [];
        for (var _k = 0, _ref6 = this.data.length; 0 <= _ref6 ? _k < _ref6 : _k > _ref6; 0 <= _ref6 ? _k++ : _k--){ _results.push(_k); }
        return _results;
      }).apply(this)).setRangeBands([0, width], this.padding.barPadding);
      if (this.description.maxWidth > domain['x'].getRangeBand()) {
        height = height - (this.description.maxWidth * this.description.triangle.sideA);
      }
      domain.y = Mynd.Scale.linear().setDomain([0, this.maxValue]).setRange([0, height]);
      domain.color = Mynd.Scale.linear().setDomain([0, this.maxValue]).setRange([0, this.colorbrewer - 1], true);
      _ref7 = domain.ticks;
      for (index in _ref7) {
        tick = _ref7[index];
        t = grid.select(".t" + index);
        line = t.append("svg:line").attr("class", "line").attr("x1", this.ticks.maxWidth).attr("x2", width + this.ticks.maxWidth);
        line.attr('stroke', line.css('stroke'));
        t.attr('transform', "translate(0," + (height - domain['y'](tick)) + ")");
      }
      chart = canvas.append("svg:g").attr("class", "chart");
      bars = chart.append("svg:g").attr("class", "bars");
      values = chart.append("svg:g").attr("class", "values");
      _ref8 = this.data;
      for (index in _ref8) {
        group = _ref8[index];
        g = bars.append("svg:g").attr("class", "g" + index);
        barWidth = domain['x'].getRangeBand();
        if (!this.isStacked) {
          barWidth = barWidth / group['data'].length;
        }
        if (!this.isStacked && group['data'].length === 2) {
          (function() {
            var x;
            x = _this.ticks.maxWidth + domain['x'](index) + barWidth;
            return line = g.append("svg:line").attr("class", "line dashed").attr("style", "stroke-dasharray: 10, 5;").attr("x1", x).attr("x2", x).attr("y1", 0).attr("y2", height);
          })();
        }
        y = height;
        _ref9 = group.data;
        for (series in _ref9) {
          value = _ref9[series];
          barHeight = domain['y'](value);
          if (!barHeight && this.isStacked) {
            continue;
          }
          x = domain['x'](index) + this.ticks.maxWidth;
          if (!this.isStacked) {
            x = x + (series * barWidth);
          }
          if (!this.isStacked) {
            y = height;
          }
          y = y - barHeight;
          color = domain['color'](value).toFixed(0);
          bar = g.append("svg:rect").attr("class", "bar s" + series + " q" + color + "-" + this.colorbrewer).attr('x', x).attr('y', y).attr('width', barWidth).attr('height', barHeight);
          bar.attr('opacity', 1);
          bar.attr('fill', bar.css('fill'));
          bar.attr('stroke', bar.css('stroke'));
          w = values.append("svg:g").attr('class', "g" + index + " s" + series + " q" + color + "-" + this.colorbrewer);
          text = w.append("svg:text").attr('x', x + (barWidth / 2)).attr("text-anchor", "middle").text(value);
          if (this.isStacked) {
            ty = y + text.node().getBBox().height + this.padding.barValue;
            text.attr('y', ty);
            if (text.node().getComputedTextLength() > barWidth) {
              text.attr("class", "value on beyond");
            } else {
              text.attr("class", "value on");
            }
          } else {
            ty = y - this.padding.barValue;
            barValueHeight = text.node().getBBox().height;
            if (ty < barValueHeight) {
              text.attr('y', ty + barValueHeight);
              if (text.node().getComputedTextLength() > barWidth) {
                text.attr("class", "value on beyond");
              } else {
                text.attr("class", "value on");
              }
            } else {
              text.attr('y', ty);
              text.attr("class", "value above");
            }
          }
          text.attr('fill', text.css('fill'));
          text.attr('font-size', text.css('font-size'));
          text.attr('font-family', text.css('font-family'));
          w.append("svg:title").text(value);
          if (this.onclick != null) {
            (function(bar, group, series, value) {
              return bar.on('click', function() {
                return _this.onclick(group.description, series, value);
              });
            })(bar, group, series, value);
          }
        }
        g.append("svg:title").text(group.description);
        descG = descriptions.select(".g" + index);
        desc = descG.select("text");
        if (this.description.maxWidth > barWidth) {
          desc.attr("transform", "rotate(-" + this.description.triangle.degrees + " 0 0)");
          x = x + barWidth;
          while ((desc.node().getComputedTextLength() * this.description.triangle.sideB) > x) {
            desc.text(desc.text().replace('...', '').split('').reverse().slice(1).reverse().join('') + '...');
          }
        } else {
          x = (x + barWidth) - 0.5 * (barWidth * group.data.length);
          desc.attr("text-anchor", "middle");
        }
        descG.attr('transform', "translate(" + x + "," + (height + descriptionTextHeight) + ")");
      }
      if (((_ref10 = this.axis) != null ? _ref10.vertical : void 0) != null) {
        labels.select('.vertical').attr("transform", "rotate(-90 " + verticalAxisLabelHeight + " " + (height / 2) + ")").attr("y", height / 2);
        grid.attr('transform', "translate(" + (verticalAxisLabelHeight + this.padding.axisLabels) + ", 0)");
        chart.attr('transform', "translate(" + (verticalAxisLabelHeight + this.padding.axisLabels) + ", 0)");
        return descriptions.attr('transform', "translate(" + (verticalAxisLabelHeight + this.padding.axisLabels) + ", 0)");
      }
    };

    column.prototype.hideSeries = function(series) {
      return Mynd.select(this.el[0]).selectAll(".s" + series).attr('fill-opacity', 0.1);
    };

    column.prototype.showSeries = function(series) {
      return Mynd.select(this.el[0]).selectAll(".s" + series).attr('fill-opacity', 1);
    };

    return column;

  })();

  Mynd.Chart.legend = (function() {

    function legend(o) {
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
    }

    legend.prototype.render = function() {
      var index, name, ul, _ref, _results,
        _this = this;
      $(this.el).empty();
      $(this.el).append(ul = $('<ul/>'));
      _ref = this.series;
      _results = [];
      for (index in _ref) {
        name = _ref[index];
        _results.push((function(index, name) {
          return ul.append($('<li/>', {
            'class': 's' + index,
            'html': name,
            'click': function(e) {
              return _this.clickAction(e.target, index);
            }
          }));
        })(index, name));
      }
      return _results;
    };

    legend.prototype.clickAction = function(el, series) {
      $(el).toggleClass('disabled');
      if ($(el).hasClass('disabled')) {
        return this.chart.hideSeries(series);
      } else {
        return this.chart.showSeries(series);
      }
    };

    return legend;

  })();

  Mynd.Chart.settings = (function() {

    function settings(o) {
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
    }

    settings.prototype.render = function() {
      var stacked,
        _this = this;
      $(this.el).empty();
      return stacked = $(this.el).append($('<a/>', {
        'class': "btn btn-mini " + (this.isStacked ? 'active' : ''),
        'text': this.isStacked ? 'Unstack' : 'Stack',
        'click': function(e) {
          $(e.target).toggleClass('active');
          if ($(e.target).hasClass('active')) {
            _this.chart.isStacked = true;
            $(e.target).text('Unstack');
          } else {
            _this.chart.isStacked = false;
            $(e.target).text('Stack');
          }
          _this.legend.render();
          return _this.chart.render();
        }
      }));
    };

    return settings;

  })();

}).call(this);
