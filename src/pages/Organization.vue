<template>
  <div class="w100p df fdc organization-chart">
    <div v-for="(row, r) in rows" class="w100p df aic jcsb f2 organization-chart-row">
      <div v-for="(column, c) in columns" class="f2 df jcc aic organization-chart-column">
        <div v-if="r == rows.length - 1" class="df fdc jcc aic column-label">
          <p>
            {{column.label}}
          </p>
        </div>
        <div v-if="c == 0" class="df aic row-label">
          <p class="tac">
            {{row.sub}}
          </p>
          <p>
            {{row.label}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '../router'
import common from '@/util/common'

export default {
  name: 'Organization',
  data () {
    return {
      loading: false,
      rows: [
        {label: '', sub: ''},
        {label: '7', sub: '1500/730'},
        {label: '6', sub: '200/365'},
        {label: '5', sub: '20/180'},
        {label: '4', sub: '3/90'},
        {label: '3', sub: '1/30'},
        {label: '2', sub: '1/7'},
        {label: '1', sub: '1/1'},
      ],
      columns: [
        {label: ''},
        {label: 'ever'},
        {label: '5 years'},
        {label: 'year'},
        {label: '90 days'},
        {label: '30 days'},
        {label: '7 days'},
        {label: '1 day'},
      ],
      items: [
        {
          rowPosition: 3.3,
          columnPosition: 8,
          name: 'Item Name',
          details: '...'
        }
      ],
    }
  },
  computed: {
  },
  props: [],
  components: {
  },
  methods: {
    createItem () {

    },
    editItem () {

    },
    moveItem () {
      
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Work page created')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .organization-chart {
    height: 100vh;

    $border-color: #000;
    $border-color-2: #ddd;

    &-column {
      position: relative;
      border-left: 1px solid $border-color-2;
      height: 100%;

      &:nth-child(5) {
        border-left: 3px solid $border-color;
      }

      &:first-child {
        flex: 1;
        border-left: none;
        background-color: #ddd;
      }

      &:last-child {
        flex: 1;
        background-color: #ddd;
      }
    }

    &-row {
      position: relative;
      .organization-chart-column {
        border-top: 1px solid $border-color-2;
      }

      &:nth-child(5) {
        .organization-chart-column {
          border-top: 3px solid $border-color;
          &:first-child, &:last-child {
            border-top: none !important;
          }
        }
      }

      &:first-child {
        flex: 1;
        border-top: none;
        .organization-chart-column {
          background-color: #ddd;
          &:nth-child(5) {
            border-left: none !important;
          }
        }
      }
      &:last-child {
        flex: 1;
        .organization-chart-column {
          background-color: #ddd;
          &:nth-child(5) {
            border-left: none !important;
          }
        }
      }

    }
  }

  .column-label {
    position: absolute;
    left: 0;
    top: 8px;
    font-size: 16px;
    line-height: 1em;
    transform: translateX(-50%);
  }

  .row-label {
    position: absolute;
    right: 16px;
    top: 0;
    font-size: 16px;
    line-height: 1em;
    transform: translateY(-50%);

    p {
      &:first-child {
        font-size: 12px;
        color: #555;
        line-height: 1em;
        margin-right: 10px;
        margin-left: 10px;
      };
    }
  }

  p {
    color: #000;
  }

</style>
