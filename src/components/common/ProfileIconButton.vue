<template>
  <div class="button-with-menu-wrapper df aic jcc posrel">
    <!-- <h4 class="button-primary" @click="toggleMenu($event)">
      Add
      <img v-if="menuIsOpen" class="button-chevron button-chevron-flip" src="../../../static/brand-icons/chevron-down.svg">
      <img v-else class="button-chevron" src="../../../static/brand-icons/chevron-down.svg">
    </h4> -->

    <img v-if="$store.getters['AUTH.myInfo'] && $store.getters['AUTH.myInfo'].profileImageUrl && $store.getters['AUTH.myInfo'].profileImageUrl.profileImageUrl" class="profile-icon" :src="$store.getters['AUTH.myInfo'].profileImageUrl.profileImageUrl" @click="toggleMenu($event)">
    <img v-else class="profile-icon"  src="../../../static/images/user-solid.svg" @click="toggleMenu($event)">

    <div v-if="menuIsOpen" class="button-dropdown-menu"
      @click="stopPropagation($event)"
      v-click-outside="clickOutsideMenu">
      <div class="button-dropdown-menu-inner">
        <div class="button-dropdown-menu-item" @click="goTo('/settings')">
          <img class="button-menu-item" src="../../../static/brand-icons/profile.svg">
          <p>Profile Settings</p>
        </div>
        <div class="button-dropdown-menu-item" @click="goTo('/more')">
          <img class="button-menu-item" src="../../../static/brand-icons/settings.svg">
          <p>Store Settings</p>
        </div>
        <div class="button-dropdown-menu-item" @click="logout()">
          <img class="button-menu-item" src="../../../static/brand-icons/logout.svg">
          <p>Logout</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import ClickOutside from 'vue-click-outside'
export default {
  name: 'ProfileIconButton',
  data () {
    return {
      menuIsOpen: false
    }
  },
  props: [],
  components: {

  },
  methods: {
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
      this.$emit('viewStore')
      this.menuIsOpen = false
      router.push(route)
    },
    logout () {
      this.$store.dispatch('AUTH.logout')
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

  .profile-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #BBB;
    background: #D9D9D9;
    cursor: pointer;
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
  .button-menu-item {
    transform: translateY(-1px);
  }

</style>
