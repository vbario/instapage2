<template>
  <div class="button-with-menu-wrapper df aic jcc">
    <h4 class="button-primary" @click="toggleMenu($event)">
      Add
      <img v-if="menuIsOpen" class="button-chevron button-chevron-flip" src="../../../static/brand-icons/chevron-down.svg">
      <img v-else class="button-chevron" src="../../../static/brand-icons/chevron-down.svg">
    </h4>
    <div v-if="menuIsOpen" class="button-dropdown-menu"
      @click="stopPropagation($event)"
      v-click-outside="clickOutsideMenu">
      <div class="button-dropdown-menu-inner">
        <div class="button-dropdown-menu-item" @click="openProductEditor()">
          <img class="button-menu-item" src="../../../static/brand-icons/tag.svg">
          <p>Product</p>
        </div>
        <div class="button-dropdown-menu-item" @click="openLinkEditor()">
          <img class="button-menu-item" src="../../../static/brand-icons/link.svg">
          <p>Link</p>
        </div>
        <div class="button-dropdown-menu-item" @click="openTitleEditor()">
          <img class="button-menu-item" src="../../../static/brand-icons/t.svg">
          <p>Title</p>
        </div>
        <!-- <hr v-if="hasItemsToAdd()" class="break-line"/>
        <div v-if="hasItemsToAdd()" class="button-dropdown-menu-item posrel">
          <select @click="addItemType($event)" class="invisible-drodpwn">
            <option v-if="!(links || []).filter(v => v.type == 'mailing-list')[0]" value="mailing-list">Mailing List</option>
            <option></option>
            <option v-if="!(links || []).filter(v => v.type == 'blog')[0]" value="blog">Blog</option>
            <option v-if="!(links || []).filter(v => v.type == 'contact')[0]" value="contact">Contact Me Link</option>
          </select>
          <img class="button-menu-item" src="../../../static/brand-icons/chevron-down-black.svg">
          <p>Other</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import ClickOutside from 'vue-click-outside'
export default {
  name: 'ButtonWithMenu',
  data () {
    return {
      menuIsOpen: false
    }
  },
  props: ['links'],
  components: {

  },
  methods: {
    hasItemsToAdd () {
      let links = this.links || []
      if (!links) {
        return false
      }
      let needsMailingList = !links.filter(v => v.type == 'mailing-list')[0]
      // let needsBlog = !links.filter(v => v.type == 'blog')[0]
      let needsContact = !links.filter(v => v.type == 'contact')[0]

      // if (needsMailingList || needsBlog || needsContact) {
      if (needsMailingList || needsContact) {
        return true
      }
      return false
    },
    addItemType (event) {
      this.addLinkWithType(event.target.value)
      // mailing-list
      // blog
      // contact
    },
    addLinkWithType (type) {
      console.log('addLinkWithType', type)
      // this.$emit('addLinkWithType', {type})
      this.menuIsOpen = false
    },
    openLinkEditor () {
      this.$emit('openLinkEditor', {i: 'new'})
      this.menuIsOpen = false
    },
    openTitleEditor () {
      this.$emit('openTitleEditor', {i: 'new'})
      this.menuIsOpen = false
    },
    openProductEditor () {
      this.$emit('openProductEditor', {i: 'new'})
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
    /*position: relative;*/
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

  .button-chevron {
    object-position: center;
    margin-left: 4px;
  }
  .button-chevron-flip {
    transform: rotate(180deg);
  }
  .break-line {
    width: 100%;
    height: 1px;
    background-color: #555;
    border: none;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .invisible-drodpwn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: transparent;
    background: transparent;
    border-color: transparent;
    /*opacity: 0;*/
  }
</style>
