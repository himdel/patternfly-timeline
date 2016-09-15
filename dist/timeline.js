!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("d3")):"function"==typeof define&&define.amd?define(["d3"],e):"object"==typeof exports?exports.timeline=e(require("d3")):t.timeline=e(t.d3)}(this,function(t){return function(t){function e(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return t[a].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(10),t.exports=n(14)},function(e,n){e.exports=t},function(t,e){"use strict";function n(){var t=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],e=arguments[1],n=e.domain(),r=a(n,2),i=r[0],o=r[1];return t.filter(function(t){return t.date>=i&&t.date<=o})}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){var n=[],a=!0,r=!1,i=void 0;try{for(var o,l=t[Symbol.iterator]();!(a=(o=l.next()).done)&&(n.push(o.value),!e||n.length!==e);a=!0);}catch(s){r=!0,i=s}finally{try{!a&&l["return"]&&l["return"]()}finally{if(r)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e["default"]=n},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var r=n(1),i=a(r),o={start:new Date(0),end:new Date,minScale:0,maxScale:1/0,width:null,padding:{top:30,left:40,bottom:40,right:40},lineHeight:40,labelWidth:140,sliderWidth:30,contextHeight:50,locale:null,axisFormat:null,tickFormat:[[".%L",function(t){return t.getMilliseconds()}],[":%S",function(t){return t.getSeconds()}],["%I:%M",function(t){return t.getMinutes()}],["%I %p",function(t){return t.getHours()}],["%a %d",function(t){return t.getDay()&&1!==t.getDate()}],["%b %d",function(t){return 1!==t.getDate()}],["%B",function(t){return t.getMonth()}],["%Y",function(){return!0}]],eventHover:null,eventZoom:null,eventClick:null,eventLineColor:function(t,e){switch(e%5){case 0:return"#00659c";case 1:return"#0088ce";case 2:return"#3f9c35";case 3:return"#ec7a08";case 4:return"#cc0000"}},eventColor:null,eventShape:function(t){return t.hasOwnProperty("events")?"":""},eventPopover:function(t){var e="";if(t.hasOwnProperty("events"))e="Group of "+t.events.length+" events";else{for(var n in t.details)e=e+n.charAt(0).toUpperCase()+n.slice(1)+": "+t.details[n]+"<br>";e=e+"Date: "+t.date}return e},marker:!0,context:!0,slider:!0,eventGrouping:6e4};o.dateFormat=o.locale?o.locale.timeFormat("%x %I:%M %p"):i["default"].time.format("%x %I:%M %p"),t.exports=o},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(11),i=a(r);e["default"]=function(t,e,n,a){return function(r){var o=function(e,r){var o=t.selectAll(".x-axis."+e).data([{}]);o.enter().append("g").classed("x-axis",!0).classed(e,!0).call(i["default"](r,n)).attr("transform","translate(0,"+("focus"===e?a.height:a.height+a.ctxHeight+40)+")"),o.call(i["default"](r,n,a.width)),o.exit().remove()};o("focus",e.x),n.context&&o("context",e.ctx)}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function r(t,e,n){var a={};for(var r in t)for(var i in t[r].data){var o=Math.floor(t[r].data[i].date/e)*e;a[o]=a[o]+1||1}for(var l in a){var s=new Date;s.setTime(+l),n.push({date:s,count:a[l]})}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=a(i);e["default"]=function(t,e,n,a,i){var l=t.append("g").classed("context",!0).attr("width",n.width).attr("height",n.ctxHeight).attr("clip-path","url(#context-brush-clipper)").attr("transform","translate("+(a.padding.left+a.labelWidth)+","+(a.padding.top+n.height+40)+")"),s=[],u=36e5;r(i,u,s),s.sort(function(t,e){return t.date<e.date?-1:t.date>e.date?1:0}),e.cty.domain([0,o["default"].max(s,function(t){return t.count})]);var d=o["default"].svg.area().interpolate("step").x(function(t){return e.ctx(t.date)}).y0(n.ctxHeight).y1(function(t){return e.cty(t.count)});l.append("path").datum(s).attr("class","area").attr("d",d);l.append("g").attr("class","pf-timeline-brush")}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(t,e,n){return function(a){var r=t.selectAll(".drop-line").data(a);r.enter().append("g").classed("drop-line",!0).attr("transform",function(t,a){return"translate(0, "+(e.y(a)+n.lineHeight/2)+")"}).attr("fill",n.eventLineColor),r.each(function(t){var a=d3.select(this).selectAll(".drop").data(t.data);a.attr("transform",function(t){return"translate("+e.x(t.date)+")"});var r=a.enter().append("text").classed("drop",!0).classed("event-group",function(t){return t.hasOwnProperty("events")?!0:!1}).attr("transform",function(t){return"translate("+e.x(t.date)+")"}).attr("fill",n.eventColor).attr("text-anchor","middle").attr("tabindex","0").attr("data-toggle","popover").attr("data-html","true").attr("data-content",n.eventPopover).attr("data-trigger","focus").attr("dominant-baseline","central").text(n.eventShape);n.eventClick&&r.on("click",n.eventClick),n.eventHover&&r.on("mouseover",n.eventHover),a.exit().on("click",null).on("mouseover",null),a.exit().remove()}),r.exit().remove()}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=(a(r),n(2)),o=(a(i),n(4)),l=a(o),s=n(6),u=a(s),d=n(8),c=a(d),f=n(9),h=a(f);e["default"]=function(t,e,n,a){var r=t.append("defs");r.append("clipPath").attr("id","drops-container-clipper").append("rect").attr("id","drops-container-rect").attr("x",0).attr("y",0).attr("width",e.width).attr("height",e.height),a.context&&r.append("clipPath").attr("id","context-brush-clipper").append("polygon").attr("points","0,0 "+e.width+",0 "+(e.width+a.sliderWidth)+","+e.ctxHeight/2+" "+e.width+","+e.ctxHeight+" 0,"+e.ctxHeight+" "+-a.sliderWidth+","+e.ctxHeight/2);var i=r.append("pattern").attr("id","grid-stripes").attr("width",e.width).attr("height",2*a.lineHeight).attr("patternUnits","userSpaceOnUse");i.append("rect").attr("width",e.width).attr("height",a.lineHeight),i.append("line").attr("x1",0).attr("x2",e.width).attr("y1",a.lineHeight).attr("y2",a.lineHeight),i.append("line").attr("x1",0).attr("x2",e.width).attr("y1","1px").attr("y2","1px");var o=t.append("g").classed("grid",!0).attr("fill","url(#grid-stripes)").attr("transform","translate("+(a.padding.left+a.labelWidth)+", "+a.padding.top+")"),s=t.append("g").classed("labels",!0).attr("transform","translate("+a.padding.left+", "+a.padding.top+")"),d=t.append("g").classed("axes",!0).attr("transform","translate("+(a.padding.left+a.labelWidth)+",  "+a.padding.top+")"),f=t.append("g").classed("drops-container",!0).attr("clip-path","url(#drops-container-clipper)").attr("transform","translate("+(a.padding.left+a.labelWidth)+",  "+a.padding.top+")");if(a.marker){var p=t.append("g").classed("timestamp",!0).attr("height",30).attr("transform","translate("+(a.padding.left+a.labelWidth)+", "+a.padding.top+")");h["default"](o,p,n,e,a.dateFormat)}var m=l["default"](d,n,a,e),g=c["default"](s,n,a),v=u["default"](f,n,a);return function(t){v(t),g(t),m(t)}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(2);a(r);e["default"]=function(t,e,n){return function(a){var r=t.selectAll(".label").data(a),i=function(t){for(var e=0,n=0;n<t.length;n++)t[n].hasOwnProperty("events")?e+=t[n].events.length:e++;return e},o=function(t){var e=i(t.data);return t.name+(e>=0?" ("+e+")":"")};r.text(o),r.enter().append("text").classed("label",!0).attr("transform",function(t,a){return"translate("+(n.labelWidth-20)+" "+(e.y(a)+n.lineHeight/2)+")"}).attr("dominant-baseline","central").attr("text-anchor","end").text(o),r.exit().remove()}}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=a(r);e["default"]=function(t,e,n,a,r){function o(){var e=i["default"].mouse(t[0][0])[0];l.attr("transform","translate("+e+")"),u.attr("transform","translate("+(e-65)+", -25)"),d.attr("transform","translate("+e+", -9)").text(r(n.x.invert(e)))}t.append("rect").attr("width",a.width).attr("height",a.height).on("mouseover",function(){l.style("display",null),d.style("display",null),u.style("display",null)}).on("mouseout",function(){l.style("display","none"),d.style("display","none"),u.style("display","none")}).on("mousemove",o);var l=t.append("line").classed("marker",!0).attr("y1",0).attr("y2",a.height),s=n.x.domain(),u=e.append("rect").attr("height","24").attr("width","130").style("display","none"),d=e.append("text").text(r(s[1])).attr("transform","translate("+n.x.range()[1]+")").attr("text-anchor","middle")}},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function r(){function t(t){t.each(function(e){e=o(e,n.eventGrouping),n.lineHeight=e.length<=3?80:40,u["default"].select(this).select(".pf-timeline-chart").remove(),u["default"].select(this).selectAll(".pf-timeline-zoom").remove();var l=40,d=n.width||t.node().clientWidth,c=e.length*n.lineHeight,f={width:d-n.padding.right-n.padding.left-n.labelWidth-(n.slider?n.sliderWidth:0),height:c,ctxHeight:n.contextHeight,outer_height:c+n.padding.top+n.padding.bottom+(n.context?n.contextHeight+l:0)},h={x:s(f.width,[n.start,n.end]),y:r(e),ctx:s(f.width,[u["default"].min(i(e)),n.end]),cty:u["default"].scale.linear().range([f.ctxHeight,0])},p=u["default"].select(this).append("svg").classed("pf-timeline-chart",!0).attr({width:d,height:f.outer_height}),g=m["default"](p,f,h,n).bind(t);g(e),n.context&&v["default"](p,h,f,n,e),a.updateZoom(u["default"].select(this),f,h,n,e,g)})}var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=l({},h["default"],e),a=new y["default"],r=function(t){return u["default"].scale.ordinal().domain(t.map(function(t){return t.name})).range(t.map(function(t,e){return e*n.lineHeight}))},s=function(t,e){return u["default"].time.scale().range([0,t]).domain(e)};return c["default"](t,n),t.Zoom=a,t}function i(t){for(var e=[],n=0;n<t.length;n++)for(var a=0;a<t[n].data.length;a++)e.push(t[n].data[a].date);return e}function o(t,e){for(var n=void 0,a={},r=[],i=0;i<t.length;i++){r[i]={},r[i].name=t[i].name,r[i].data=[];for(var o=0;o<t[i].data.length;o++)n=Math.round(t[i].data[o].date/e)*e,void 0===a[n]&&(a[n]=[]),a[n].push(t[i].data[o]);for(var l in a)if(1===a[l].length)r[i].data.push(a[l][0]);else{var s=new Date;s.setTime(+l),r[i].data.push({date:s,events:a[l]})}a={}}return r}var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},s=n(1),u=a(s),d=n(13),c=a(d),f=n(3),h=a(f),p=n(7),m=a(p),g=n(5),v=a(g),x=n(12),y=a(x);u["default"].chart=u["default"].chart||{},u["default"].chart.timeline=r,t.exports=r},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(t,e,n){var a=e.tickFormat.map(function(t){return t.slice(0)}),r=e.locale?e.locale.timeFormat.multi(a):i["default"].time.format.multi(a),o=Math.round(n/70),l=i["default"].svg.axis().scale(t).orient("bottom").ticks(o).tickFormat(r);return"function"==typeof e.axisFormat&&e.axisFormat(l),l};var r=n(1),i=a(r)},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),l=n(1),s=a(l),u=function(){function t(){r(this,t)}return o(t,[{key:"updateZoom",value:function(t,e,n,a,r,i){var o=this;if(this.ONE_MINUTE=6e4,this.ONE_HOUR=60*this.ONE_MINUTE,this.ONE_DAY=24*this.ONE_HOUR,this.ONE_WEEK=7*this.ONE_DAY,this.ONE_MONTH=30*this.ONE_DAY,this.grid=s["default"].select(".grid"),this.dimensions=e,this.scales=n,this.configuration=a,this.data=r,this.callback=i,this.sliderScale=s["default"].scale.log().domain([a.minScale,a.maxScale]).range([a.minScale,a.maxScale]).base(2),this.zoom=s["default"].behavior.zoom().size([e.width,e.height]).scaleExtent([a.minScale,a.maxScale]).x(n.x),this.brush=null,a.slider){var l=t.append("button").attr("type","button").attr("class","btn btn-default pf-timeline-zoom").attr("id","zoom-in").style("top",a.padding.top+"px").style("right",a.padding.right+"px").on("click",function(){o.zoomClick()});l.append("i").attr("class","fa fa-plus").attr("id","zoom-in-icon");var u=t.append("button").attr("type","button").attr("class","btn btn-default pf-timeline-zoom").attr("id","zoom-out").style("top",a.padding.top+e.height-26+"px").style("right",a.padding.right+"px").on("click",function(){o.zoomClick()});u.append("i").attr("class","fa fa-minus").attr("id","zoom-out-icon");t.append("input").attr("type","range").attr("class","pf-timeline-zoom").attr("id","pf-timeline-slider").style("width",e.height-2*l.node().offsetHeight+"px").style("top",a.padding.top+(e.height-2*l.node().offsetHeight)/2+l.node().offsetHeight-7+"px").style("right",a.padding.right-(e.height-l.node().offsetHeight)/2+l.node().offsetWidth+"px").attr("value",this.sliderScale(this.zoom.scale())).attr("min",a.minScale).attr("max",a.maxScale).attr("step",.1).on("input",function(){o.zoomClick()})}return a.context&&(this.brush=s["default"].svg.brush().x(n.ctx).extent(n.x.domain()).on("brush",function(){o.brushed()}),t.select(".pf-timeline-brush").call(this.brush).selectAll("rect").attr("height",e.ctxHeight)),a.eventZoom&&this.zoom.on("zoomend",a.eventZoom),this.zoom.on("zoom",function(){requestAnimationFrame(function(){return i(r)}),a.slider&&t.select("#pf-timeline-slider").property("value",o.sliderScale(o.zoom.scale())),a.context&&(o.brush.extent(o.scales.x.domain()),t.select(".pf-timeline-brush").call(o.brush))}),this.grid.call(this.zoom).on("dblclick.zoom",null)}},{key:"brushed",value:function(){if(this.brush.empty()!==!0){var t=this.brush.extent();this.zoomFilter(t[0],t[1],0)}}},{key:"zoomClick",value:function(){var t=.5,e=1,n=0,a=this.dimensions.width/2,r=this.zoom.scaleExtent(),i=void 0,o=void 0,l={x:this.zoom.translate()[0],k:this.zoom.scale()};switch(event.target.id){case"zoom-in-icon":case"zoom-in":e=this.zoom.scale()*(1+t),n=100;break;case"zoom-out-icon":case"zoom-out":e=this.zoom.scale()*(1+-1*t),n=100;break;case"pf-timeline-slider":e=this.sliderScale.invert(event.target.value);break;default:e=this.zoom.scale()}e<r[0]?e=r[0]:e>r[1]&&(e=r[1]),i=(a-l.x)/l.k,l.k=e,o=i*l.k+l.x,l.x+=a-o,this.interpolateZoom([l.x,0],l.k,n)}},{key:"interpolateZoom",value:function(t,e,n){var a=this;return s["default"].transition().duration(n).tween("zoom",function(){if(a.zoom){var n=function(){var n=s["default"].interpolate(a.zoom.translate(),t),r=s["default"].interpolate(a.zoom.scale(),e);return{v:function(t){a.zoom.scale(r(t)).translate(n(t)),a.zoom.event(a.grid)}}}();if("object"===("undefined"==typeof n?"undefined":i(n)))return n.v}})}},{key:"getRange",value:function(t){return t[1].getTime()-t[0].getTime()}},{key:"getScale",value:function(t,e){return t/e}},{key:"zoomFilter",value:function(t,e){var n=(arguments.length<=2||void 0===arguments[2]?100:arguments[2],e-t),a=this.dimensions.width,r=this.zoom.scaleExtent(),i=this.zoom.translate()[0],o=this.zoom.scale(),l=this.zoom.scale(),s=this.getRange(this.scales.x.domain()),u=void 0;l*=this.getScale(this.getRange(this.scales.x.domain()),n),l<r[0]?l=r[0]:l>r[1]&&(l=r[1]);var d=(this.scales.x.domain()[0]-t)*(a/s);u=d,i*=l/o,i+=u,this.zoom.scale(l).translate([i,0]),this.zoom.event(this.grid)}}]),t}();e["default"]=u},function(t,e,n){"use strict";function a(t,e){function n(n){return function(a){return arguments.length?(e[n]=a,t):e[n]}}for(var a in e)t[a]=n(a)}t.exports=a},function(t,e){}])});
//# sourceMappingURL=timeline.js.map