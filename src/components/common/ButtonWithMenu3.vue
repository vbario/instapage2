<template>
  <div class="button-with-menu-wrapper df aic jcc">
    <div @click="toggleMenu($event)" class="card-menu-button">
      <img class="button-menu-item" src="../../../static/brand-icons/ellipsis-vertical.svg">
    </div>
    <div v-if="menuIsOpen" class="button-dropdown-menu"
      @click="stopPropagation($event)"
      v-click-outside="clickOutsideMenu">
      <div class="button-dropdown-menu-inner">
        <div class="button-dropdown-menu-item" @click="openTitleEditor($event)">
          <img class="button-menu-item" src="../../../static/brand-icons/edit.svg">
          <p>Edit</p>
        </div>
        <div class="button-dropdown-menu-item warning-item" @click="deleteItem($event)">
          <img class="button-menu-item" src="../../../static/brand-icons/delete.svg">
          <p>Delete</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import ClickOutside from 'vue-click-outside'
export default {
  name: 'ButtonWithMenu3',
  data () {
    return {
      menuIsOpen: false
    }
  },
  props: ['editingMyStore', 'p'],
  components: {

  },
  methods: {
    openTitleEditor (event) {
      event && event.stopPropagation()
      console.log('openTitleEditor', this.p)
      this.$emit('openTitleEditor', {i: this.p})
      this.menuIsOpen = false
    },
    deleteItem (event) {
      event && event.stopPropagation()
      console.log('deleteItem', this.p)
      this.$emit('deleteItem', {i: this.p})
      this.menuIsOpen = false
    },
    clickOutsideMenu (event) {
      setTimeout(() => {
        this.menuIsOpen = false
      }, 100)
    },
    toggleMenu (event) {
      console.log('toggleMenu')
      event.stopPropagation()
      this.menuIsOpen = !this.menuIsOpen
    },
    stopPropagation (event) {
      event && event.stopPropagation()
    },
    goTo (route) {
      router.push(route)
    }
  },
  computed: {

  },
  created () {
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";

  .button-with-menu-wrapper {
    position: relative;
  }

  .button-primary {
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 16.5px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-primary;
    border: 1px solid $color-primary;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 1em;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
  }

  .menu-button-chevron {
    margin-left: 6px;
  }

  .button-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    border-radius: 8px;
    border: 1px solid #DDD;
    background-color: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10);

    &-inner {
      display: flex;
      flex-direction: column;
      padding: 4px;
    }

    &-item {
      position: relative;
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;
      height: 33px;
      padding-left: 8px;
      padding-right: 8px;
      cursor: pointer;

      i {
        width: 16px;
        max-width: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        line-height: 14px;
        font-weight: 500;
      }

      p {
        flex: 1;
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        white-space: nowrap;
        margin-left: 8px;
        font-weight: 500;
      }

      &-highlighted, &:hover {
        border-radius: 6px;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.70) 100%), var(--Green-100, #44D600);
      }
    }
  }

  .card-menu-button {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;

    & > i {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
    }

    &:hover {
      background-color: $color-primary;

      & > i {
        color: #fff;
      }
    }
  }

  .warning-item {
    i, p {
      color: #DD0000;
    }
  }
</style>
