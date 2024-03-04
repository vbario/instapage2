<template>
  <div v-if="true">
    <div class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div></div>
  <div v-else class="landing-wrapper df fdc aic f1 w100p">
    <div v-if="((fulfillmentsOrders.length == 0) && fulfillmentsLoaded) && !($store.getters['AUTH.myPrivateInfo'] && $store.getters['AUTH.myPrivateInfo'].skippedIntro)" class="w100p df fdc">
      <div class="add-a-product-wrapper df fdc aic">
        <h1 class="text-dark h1-2">Welcome!</h1>
        <p class="text-dark mt20 sub_">Got things to sell?</p>
        <h4 class="button-1 big-button curp mt30" @click="newProduct()">
          Start selling something
        </h4>
        <h4 class="button-3 button-0-alt big-button mt30" @click="skipIntro()">I'll add a product later.</h4>
      </div>
    </div>
    <div v-if="fulfillmentsLoaded" class="top-bar-global posrel w100p _position1 df jcsb aic only-big">
      <h2 class="text-dark header-style header-style-big">Dashboard</h2>
    </div>
    <hr class="divider">
    <div v-if="fulfillmentsLoaded" class="whole-page-box-global w100p df fdc">
      <h3 v-if="($store.getters['AUTH.myPrivateInfo'] && $store.getters['AUTH.myPrivateInfo'].skippedIntro)" class="text-dark mb20">Welcome back!</h3>
      <!-- <br/> -->
      <h3 v-if="!($store.getters['AUTH.myPrivateInfo'] && $store.getters['AUTH.myPrivateInfo'].skippedIntro)" class="text-dark mb10">Here is your recent activity:</h3>
      <p v-else class="text-dark mb10">Here is your recent activity:</p>
      <div class="dash-closing text-dark mb10" v-if="$store.getters['AUTH.displayData'] && $store.getters['AUTH.displayData'].fulfillments">
        <p class="text-dark">You have {{$store.getters['AUTH.displayData'].fulfillments ? $store.getters['AUTH.displayData'].fulfillments : 'no'}} active order{{$store.getters['AUTH.displayData'].fulfillments == 1 ? '' : 's'}} <span><a class="go-to-orders" @click="goTo('/fulfillment')">(go to orders)</a></span>.</p>
      </div>
      <div class="w100p df g20 _position2">
        <h3 class="text-dark dash-list curp date-range-select" v-bind:class="{'tdu': chartLength == 7}" @click="showDays(7)">Last 7 Days</h3>
        <h3 class="text-dark dash-list curp date-range-select" v-bind:class="{'tdu': chartLength == 30}" @click="showDays(30)">Last 30 Days</h3>
      </div>
      <div class="data-options df mt20 g20 mb30">
        <span class="stat-box-a" v-bind:class="{'stat-box-a-selected': chartType == 'views'}" @click="showType('views')">
          <p class="stat-box-a-heading">
            Product Views
            <i class="fa-solid fa-eye stat-icon"></i>
          </p>
          <p class="stat-box-a-stat">
            {{viewsSales() && viewsSales().totalViews}}
          </p>
        </span>
        <span class="stat-box-a" v-bind:class="{'stat-box-a-selected': chartType == 'sales'}" @click="showType('sales')">
          <p class="stat-box-a-heading">
            Sales
            <i class="fa-solid fa-square-dollar stat-icon"></i>
          </p>
          <p class="stat-box-a-stat">
            {{viewsSales() && viewsSales().totalSales}}
          </p>
        </span>
      </div>
      <vue-highcharts :key="chartKey" :options="options" ref="lineCharts"></vue-highcharts>
    </div>

    <div v-if="loading" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>

import router from '@/router'
import LandingProduct from '@/components/LandingProduct'
import NewsFeed from '@/components/NewsFeed'
import AcceptCreditCard from '@/components/AcceptCreditCard'
import VueHighcharts from 'vue2-highcharts'

const asyncData = {
  name: '',
  marker: {
    // symbol: 'square'
  },
  data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
    y: 26.5,
    marker: {
      symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
    }
  }, 23.3, 18.3, 13.9, 9.6]
}

export default {
  name: 'Dashboard',
  data () {
    return {
      chartKey: 0,
      chartType: 'views',
      chartLength: 7,
      fulfillmentsLoaded: false,
      loading: true,
      income: 0,
      fulfillmentsOrders: [],
      options: {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: this.lastNDaysLabels(7),
          isDirty: true
        },
        yAxis: {
          isDirty: true,
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value
              // return this.value + '°';
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: [
          // {name:'views'}
          // {showInLegend: false},
          // {showInLegend: false}
        ]
      }
    }
  },
  props: ['mode'],
  components: {
    LandingProduct,
    NewsFeed,
    AcceptCreditCard,
    VueHighcharts
  },
  methods: {
    skipIntro () {
      this.$store.dispatch('AUTH.skipIntro', {}).then((res) => {
        console.log('skipIntro res', res)
        // this.income = res
      })
    },
    viewsSales () {
      let data = this.lastNDaysData(this.chartType, this.chartLength)
      console.log('data', data)
      return data
    },
    showDays (chartLength) {
      this.chartLength = chartLength
      this.load()
    },
    showType (chartType) {
      this.chartType = chartType
      this.load()
    },
    setLabels (n) {
      let options = this.options
      console.log('options before', options)
      options.xAxis.categories = this.lastNDaysLabels(n)
      this.options = options
      console.log('options after', this.options)
    },
    lastNDaysLabels (n) {
      const dateArray = [];
      for (let i = 0; i < n; i++) {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - i);
          
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');

          dateArray.push(`${year}-${month}-${day}`);
      }
      return dateArray.reverse();
    },
    lastNDaysData (type, n) {
      // console.log('lastNDaysData', n, type)

      let products = this.fulfillmentsOrders
      let labels = this.lastNDaysLabels(n)

      let totalViews = []
      let totalSales = []


      // console.log('products', products)
      // console.log('labels', labels)
        


      for (let day in labels) {
        let dayLabel = labels[day]
        if (!totalViews[day]) {
          totalViews[day] = 0
        }
        if (!totalSales[day]) {
          totalSales[day] = 0
        }
        for (let p in products) {
          let product = products[p]
          let sales = product.sales
          let views = product.views

          for (let s in sales) {
            let sale = sales[dayLabel]
            let numberOfSales = sale ? (sale.totalCount || 0) : 0
            if (numberOfSales) {
              totalSales[day] += numberOfSales
            }
          }
        
          for (let v in views) {
            let view = views[dayLabel]
            let numberOfViews = view ? (view.totalCount || 0) : 0
            if (numberOfViews) {
              totalViews[day] += numberOfViews
            }
          }

        }

      }

      // console.log('chart data', type == 'views' ? totalViews : totalSales)

      return {
        name: '',
        marker: {
          // symbol: 'square'
        },
        views: totalViews,
        sales: totalSales,
        totalViews: totalViews.reduce((partialSum, a) => partialSum + a, 0),
        totalSales: totalSales.reduce((partialSum, a) => partialSum + a, 0),
        data: type == 'views' ? totalViews : totalSales
      }
    },
    load () {
      let lineCharts = this.$refs.lineCharts;
      if (lineCharts) {
        if (this.income) {
          this.loading = false
        }
        lineCharts.delegateMethod('showLoading', 'Loading...');
        this.setLabels(this.chartLength)
        console.log('chart options', this.options)
        lineCharts.chart.update(this.options, true)

        let chartType = this.chartType
        chartType = chartType.charAt(0).toUpperCase() + chartType.slice(1)
        lineCharts.removeSeries(0);
        lineCharts.addSeries(this.lastNDaysData(this.chartType, this.chartLength));
        lineCharts.chart.series[0].update({
            name: chartType
        });
        lineCharts.hideLoading();
      } else {
        setTimeout(() => {
          this.load()
        }, 125)
      }
    },
    goTo (path) {
      window.scroll(0,0)
      router.push(path)
    },
    balance () {
      let balance = 0
      let income = this.income
      if (!income) {
        return '0.00'
      }
      for (let item in income) {
        let earned = income[item].order[0].earned ? parseFloat(income[item].order[0].earned) : parseFloat(income[item].order[0].price)
        balance = balance + earned
      } 
      return parseFloat(balance/100).toFixed(2)
    },
    getMyIncome () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyIncome', {}).then((res) => {
          console.log('income', res)
          this.income = res
          if (this.fulfillmentsLoaded == true) {
            this.loading = false
          }
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyIncome()
        }, 100)
      }
    },
    newProduct () {
      this.skipIntro()
      this.$router.push('/products')
    },
    loadProductList () {
      if (this.$store.getters['AUTH.myProductsList']) {
        this.fulfillmentsOrders = JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList']))
        console.log('go', this.fulfillmentsOrders)
        this.fulfillmentsLoaded = true
        this.load()
        // this.sortFulfillments()
      } else {
        setTimeout(() => {
          this.loadProductList()
        }, 100)
      }
    },
  },
  computed: {
  },
  watch: {
  },
  created () {
    window.scrollTo(0, 0)
    console.log('* Landing page created')
    // this.getMyIncome()
    // this.loadProductList()
    this.$store.dispatch('AUTH.navigateFromMe', {}).then()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  ._position2 {
    margin-top: 8px;
    margin-bottom: 7px;
  }

  .landing-wrapper {
    padding: 19px;
    padding-top: 0;
    background-color: $light-grey;
  }
  .landing-splash, .landing-choose-your-feel {
    width: 100%;
    max-width: 720px;
  }
  .landing-products {
    flex-wrap: wrap;
    max-width: 860px;
  }
  .dash-closing {
    font-size: 13px;
  }
  iframe {
    width: 100%;
    height: 400px;
  }
  @media (max-width: 800px) {
    .news-post {
      flex-direction: column;
    }
  }
  .title-box {
    flex: 1
  }
  ._abc {
    align-items: flex-start;
  }
  @media (max-width: 425px) {
    .whole-page-box-global-2-bigger {
      height: unset;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .title-right {
      text-align: center;
      margin-right: 0;
      margin-bottom: 15px;
    }
    .title-box {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
  .dash-list {
    font-weight: 600;
  }
  .go-to-orders {
    color: $color-primary;
    font-weight: 400;
    font-family: 'Kollektif';
    font-size: 14px;
    text-decoration: underline;
  }

  .add-a-product-wrapper {
    padding-top: 40px;
  }

  .add-a-product {
    width: 300px;
  }
  .title-bar {
    margin-bottom: 16px;
  }
  .sub_ {
    font-size: 22px;
    width: 100%;
    max-width: 500px;
    text-align: center;
    font-weight: 500;
  }
  .tdu {
    background-color: #ddd;
  }
  .date-range-select {
    font-size: 14px;
    font-weight: 400;
    display: flex;
    border: 1px solid #ddd;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    border-radius: 20px;
  }
  .stat-box-a {
    height: 100px;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 15px;
    padding: 20px;
    cursor: pointer;

    &-stat {
      color: $color-primary;
      font-size: 32px;
    }

    &-selected {
      border: 1px solid $color-primary;
    }

    &-heading {
      font-size: 16px;
      color: $color-background-dark;
    }
  }
  .stat-icon {
    font-size: 14px;
    color: #aaa;
  }
</style>
