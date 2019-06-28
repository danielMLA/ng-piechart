import {AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {D3PieChartService} from "./d3-pie-chart.service";
import {PieChartData} from "./pie-chart-data";
import {PieChartOptions} from "./pie-chart-options";

import * as d3 from 'd3';
import {genedArc} from "./chart-utils";
import {ElementMargins} from "./element-margins";

@Directive({selector: '[d3-pie-chart-directive]'})
export class D3PieChartDirective implements AfterViewInit, OnChanges {

  chartContainer: HTMLDivElement;
  colors;
  mainArc;
  onHoverArc;
  labelArc;
  textArc;
  imgArc;

  @Input() chartOptions: PieChartOptions;
  @Input() chartData: PieChartData[];

  get radius(): number {
    if (!this.chartOptions) return null;
    const {width, height} = this.chartOptions;
    return Math.min(width, height) / 2;
  }

  get innerRadius(): number {
    if (!this.chartOptions || !this.chartOptions.donut) return 0;
    if (!this.chartOptions.donutRatio || (!(this.chartOptions.donutRatio > 0) || !(this.chartOptions.donutRatio < 0.9))) {
      this.chartOptions.donutRatio = 0.5;
    }
    return this.radius * this.chartOptions.donutRatio;
  }

  constructor(private readonly elementRef: ElementRef, private readonly chartService: D3PieChartService) {
    this.chartContainer = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.initChart();
    }
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    if (!this.chartData) {
      return;
    }
    console.info('Initializing chart');
    console.info('Options', this.chartOptions);
    console.info('Data', this.chartData);
    this.initColors();
    this.createSVGs();
    this.addLabels();
    this.addLListeners();
  }

  private initColors(): void {
    this.colors = d3.scale.ordinal()
      .range(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
  }

  private removeSVG(): void {
    d3.select(this.chartContainer).select('svg').remove();
  }

  private createSVGs() {
    this.removeSVG();
    // Take dimensions and margin values from Options
    const {width, height} = this.chartOptions;
    const margins = this.chartOptions.margins || new ElementMargins();
    const totalWidth = width + margins.marginLeft + margins.marginRight;
    const totalHeight = height + margins.marginBottom + margins.marginBottom;
    // Create svg container
    const svg = d3.select(this.chartContainer)
      .append('svg')
      .attr('width', totalWidth)
      .attr('height', totalHeight)
      .style('margin', 'auto')
      .style('background-color', 'lightblue');

    // Create arcs group and center it
    const g = svg.append("g")
      .attr("transform", "translate(" + totalWidth / 2 + "," + totalHeight / 2 + ")");

    this.createArcs(g, this.chartData);
    this.addImages();
    this.addText();
  }

  private createArcs(g, data: PieChartData[]): void {
    // Generate the pie
    const pie: d3.layout.Pie<PieChartData> = d3.layout.pie<PieChartData>()
      .value(d => d.value);

    // Generate the arcs
    this.mainArc = genedArc(this.innerRadius, this.radius);
    this.onHoverArc = genedArc(this.innerRadius, this.radius, 0.1);
    const arcs = g.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add arc paths
    arcs.append("path")
      .attr("fill", (d, i) => this.colors(i))
      .attr("d", this.mainArc);
  }

  private addImages(): void {
    this.imgArc = genedArc(this.innerRadius, this.radius);
    d3.selectAll(".arc")
      .append("svg:image")
      .attr('width', 30)
      .attr('height', 30)
      .attr("xlink:href", (d: d3.layout.pie.Arc<PieChartData>) => d.data.img ? d.data.img.url : null)
      .style('z-index', 2)
      .attr('transform', (d: d3.layout.pie.Arc<PieChartData>) => {
        const cent = this.imgArc.centroid(d);
        const x = cent[0] - d.data.img.size / 2;
        const y = cent[1] -d.data.img.size / 2;
        return `translate(${x}, ${y})`;
      });
  }

  private addText(): void {
    this.textArc = genedArc(0, this.radius + 200);
    d3.selectAll(".label-group")
      .append('text')
      .attr('class', 'text-value')
      .text((d: d3.layout.pie.Arc<PieChartData>) => d.data.displayValue ? d.data.displayValue + ' %' : null);

  }

  private addLabels(): void {
    this.labelArc = genedArc(0, this.radius + 200);

    d3.selectAll('g.arc')
      .append('g')
      .attr('class', 'label-group')
      .attr('transform', d => `translate(${this.labelArc.centroid(d)})`)
      .attr('text-anchor', d => this.chartService.isMeanAngleRight(d.startAngle, d.endAngle) ? 'start' : 'end')
      .style('z-index', 2)
      .append('text')
      .text(d => d.data.label);
  }

  private addLListeners(): void {
    const mainArc = this.mainArc;
    const hoverArc = this.onHoverArc;

    d3.selectAll('g.arc')
      .on('mouseover', function(a, b, c) {
        d3.select(this).select('path')
          .transition()
          .duration(200)
          .attr('d', hoverArc);
      })
      .on('mouseout', function(a, b, c) {
        d3.select(this).select('path')
          .transition()
          .duration(200)
          .attr('d', mainArc);
      })
  }

}
