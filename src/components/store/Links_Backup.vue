<template>
  <div class="links-wrapper" id="links-wrapper" ref="linksWrapper">
    <div class="links-arrow arrow-left" ref="leftButton" @click="scrollLeft()">
      <svg data-v-63f7b5ec="" width="20px" height="18px" viewBox="0 -1 16 34" class="vc-svg-icon _pen"><path data-v-63f7b5ec="" d="M11.196 10c0 0.143-0.071 0.304-0.179 0.411l-7.018 7.018 7.018 7.018c0.107 0.107 0.179 0.268 0.179 0.411s-0.071 0.304-0.179 0.411l-0.893 0.893c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-8.321-8.321c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l8.321-8.321c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l0.893 0.893c0.107 0.107 0.179 0.25 0.179 0.411z"></path></svg>
    </div>
    <div class="links-arrow arrow-right" ref="rightButton" @click="scrollRight()">
      <svg data-v-63f7b5ec="" width="19px" height="18px" viewBox="-5 -1 16 34" class="vc-svg-icon"><path data-v-63f7b5ec="" d="M10.625 17.429c0 0.143-0.071 0.304-0.179 0.411l-8.321 8.321c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-0.893-0.893c-0.107-0.107-0.179-0.25-0.179-0.411 0-0.143 0.071-0.304 0.179-0.411l7.018-7.018-7.018-7.018c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l0.893-0.893c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l8.321 8.321c0.107 0.107 0.179 0.268 0.179 0.411z"></path></svg>
    </div>
    <div class="links posrel" id="links" ref="links" :class="moveLinks()" @drop="droppedInLinks($event)">
      <div
        v-for="(link, l) in links"
        class="draggable posrel df aic extra-link extra-link-2 hidden-space"
        :id="l === 0 ? 'link' : ''"
        :ref="l === 0 ? 'link' : ''"
        :draggable="editingMyStore"
        :class="linkClasses(link, links.length)"
        @dragover.prevent
        @dragenter="itemDragEnter($event, 'enter', -1)"
        @dragleave="itemDragLeave($event, 'leave', -1)"
        @drop="itemDrop($event, 'drop', -1)"
        @dragend="dragEnd($event, 'end', -1)">

        <div :style="'background-colod:#00000022;'" class="link draggable posrel" v-if="(draggingOver === links.length) && !(draggingItem === links.length)">
          <div class="link-image _pen" :style="'background-image: url(' + links[draggingItem].image + ')'">
            <img v-if="links[draggingItem].type == 'mailing-list'" img src="../../../static/brand-icons/plane.svg">
            <img v-else-if="link.type == 'contact'" img src="../../../static/brand-icons/link-contact.svg">
            <img v-else-if="(links[draggingItem].type == 'url') && (!links[draggingItem].image)" img src="../../../static/brand-icons/link-url.svg">
          </div>
          <p class="link-text">
            {{links[draggingItem].heading}}
          </p>
          <h4 class="edit-button" v-if="editingMyStore" @click="openLinkEditor($event, l)">
            Edit
          </h4>
        </div>
      </div>
      <div
        v-for="(link, l) in links"
        class="draggable posrel df aic z10"
        :id="l === 0 ? 'link' : ''"
        :ref="l === 0 ? 'link' : ''"
        :draggable="editingMyStore"
        :class="linkClasses(link, l)"
        @dragover.prevent
        @dragenter="itemDragEnter($event, 'enter', l)"
        @dragleave="itemDragLeave($event, 'leave', l)"
        @drop="itemDrop($event, 'drop', l)"
        @dragstart="dragStart($event, 'start', l)"
        @dragend="dragEnd($event, 'end', l)"
        @click="handleLinkClick(link, l)">

        <div v-if="(draggingOver === l) && !(draggingItem === l)" class="link posrel new-link-position hidden-space">
          <div class="link-image _pen" :style="'background-image: url(' + links[draggingItem].image + ')'">
            <img v-if="links[draggingItem].type == 'mailing-list'" img src="../../../static/brand-icons/plane.svg">
            <img v-else-if="links[draggingItem].type == 'contact'" img src="../../../static/brand-icons/link-contact.svg">
            <img v-else-if="(links[draggingItem].type == 'url') && (!links[draggingItem].image)" img src="../../../static/brand-icons/link-url.svg">
          </div>
          <p class="link-text">
            {{links[draggingItem].heading}}
          </p>
          <h4 class="edit-button" v-if="editingMyStore" @click="openLinkEditor($event, l)">
            Edit
          </h4>
        </div>

        <div :class="draggedItem(draggingItem === l)" class="link draggable posrel">
          <div class="link-image _pen" :style="'background-image: url(' + link.image + ')'">
            <img v-if="link.type == 'mailing-list'" img src="../../../static/brand-icons/plane.svg">
            <img v-else-if="link.type == 'contact'" img src="../../../static/brand-icons/link-contact.svg">
            <img v-else-if="(link.type == 'url') && (!link.image)" img src="../../../static/brand-icons/link-url.svg">
          </div>
          <p class="link-text">
            {{link.heading}}
          </p>
          <h4 class="edit-button" v-if="editingMyStore" @click="openLinkEditor($event, l)">
            Edit
          </h4>
        </div>

        <!-- <div v-if="(draggingOver === l) && !(draggingItem === l) && !draggingOverLeftHalf" class="link posrel new-link-position">
          <div class="link-image _pen" :style="'background-image: url(' + links[draggingItem].image + ')'">
            <img v-if="links[draggingItem].type == 'mailing-list'" img src="../../../static/brand-icons/plane.svg">
            <img v-else-if="links[draggingItem].type == 'contact'" img src="../../../static/brand-icons/link-contact.svg">
            <img v-else-if="(links[draggingItem].type == 'url') && (!links[draggingItem].image)" img src="../../../static/brand-icons/link-url.svg">
          </div>
          <p class="link-text">
            {{links[draggingItem].heading}}
          </p>
          <h4 class="edit-button" v-if="editingMyStore" @click="openLinkEditor($event, l)">
            Edit
          </h4>
        </div> -->

      </div>
      <div
        v-for="(link, l) in links"
        class="draggable posrel df aic extra-link hidden-space"
        :id="l === 0 ? 'link' : ''"
        :ref="l === 0 ? 'link' : ''"
        :draggable="editingMyStore"
        :class="linkClasses(link, links.length)"
        @dragover.prevent
        @dragenter="itemDragEnter($event, 'enter', links.length)"
        @dragleave="itemDragLeave($event, 'leave', links.length)"
        @drop="itemDrop($event, 'drop', links.length)"
        @dragend="dragEnd($event, 'end', links.length)">

        <!-- <div v-if="(draggingOver === links.length) && !(draggingItem === links.length)" class="link posrel new-link-position">
          <div class="link-image _pen" :style="'background-image: url(' + links[draggingItem].image + ')'">
            <img v-if="links[draggingItem].type == 'mailing-list'" img src="../../../static/brand-icons/plane.svg">
            <img v-else-if="links[draggingItem].type == 'contact'" img src="../../../static/brand-icons/link-contact.svg">
            <img v-else-if="(links[draggingItem].type == 'url') && (!links[draggingItem].image)" img src="../../../static/brand-icons/link-url.svg">
          </div>
          <p class="link-text">
            {{links[draggingItem].heading}}
          </p>
          <h4 class="edit-button" v-if="editingMyStore" @click="openLinkEditor($event, l)">
            Edit
          </h4>
        </div> -->

        <div :style="'background-colod:#00000022;'" class="link draggable posrel" v-if="(draggingOver === links.length) && !(draggingItem === links.length)">
          <div class="link-image _pen" :style="'background-image: url(' + links[draggingItem].image + ')'">
            <img v-if="links[draggingItem].type == 'mailing-list'" img src="../../../static/brand-icons/plane.svg">
            <img v-else-if="link.type == 'contact'" img src="../../../static/brand-icons/link-contact.svg">
            <img v-else-if="(links[draggingItem].type == 'url') && (!links[draggingItem].image)" img src="../../../static/brand-icons/link-url.svg">
          </div>
          <p class="link-text">
            {{links[draggingItem].heading}}
          </p>
          <h4 class="edit-button" v-if="editingMyStore" @click="openLinkEditor($event, l)">
            Edit
          </h4>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>


export default {
  name: 'Links',
  data () {
    return {
      timeoutTime: 0,
      arrowReloadTime: 500,
      disableReloadUpdate: false,
      draggingItem: false,
      draggingOver: false,
      itemDropped: false,
      draggingOverLeftHalf: true
    }
  },
  props: ['editingMyStore', 'links', 'loaded'],
  components: {
  },
  methods: {
    draggedItem (isDragged) {
      if (isDragged) {
        return {
          'dragged-item': true
        }
      }
    },
    moveLinks () {
      return {
        'move-links-over': 
        (this.draggingOver || (this.draggingOver === 0)) &&
        ((this.draggingItem || (this.draggingItem === 0)) &&
          (this.draggingOver !== this.links.length)
        )
      }
    },
    linkClasses (product, p) {
      let draggingClass = ''
      let draggingOverClass = ''
      if (this.draggingItem === p) {
        draggingClass = ' dragging-item-now'
      }
      if (this.draggingOver === p) {
        draggingOverClass = ' dragging-over-item-now'
      }
      let classes = {[draggingClass + draggingOverClass]: true}
      return classes
    },
    itemDragEnter (event, type, p) {
      console.log('itemDragEnter', type, p)
      if (this.editingMyStore) {
        setTimeout(() => {
          this.draggingOver = p
        }, this.timeoutTime)
      }
    },
    itemDragOver (event, type, p) {
      console.log('dragging over', p)

      if (this.editingMyStore) {
        let width = event.target.offsetWidth
        let halfWidth = width/2
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left; //x position within the element.
        var y = event.clientY - rect.top;  //y position within the element.

        let inLeftHalf = x < halfWidth

        setTimeout(() => {
          if (inLeftHalf) {
            this.draggingOver = p
            this.draggingOverLeftHalf = true
          } else {
            if ((this.draggingItem === p)) {
              this.draggingOver = p + 1
            } else {
              this.draggingOver = p
            }
            this.draggingOverLeftHalf = false
          }
        }, this.timeoutTime)
      }
    },
    droppedInLinks (event) {
      console.log('**** droppedInLinks ****')
    },
    itemDrop (event, type, p) {
      console.log('itemDrop', type, p)
      if (this.editingMyStore) {
        this.itemDropped = p
        this.draggingOver = false
      }
    },
    itemDragLeave (event, type, p) {
      console.log('itemDragLeave', type, p)
      if (this.editingMyStore) {
        setTimeout(() => {
          // this.draggingOver = false
        }, this.timeoutTime)
      }
    },
    setDragImage (event) {
      // var img = new Image();
      // img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      // event.dataTransfer.setDragImage(img, 0, 0);
    },
    dragStart (event, type, p) {
      if (this.editingMyStore) {
        console.log('dragStart', type, p)
        this.itemDropped = false
        this.draggingItem = p
        this.$emit('draggingLink', true)
        this.setDragImage(event)
      }
    },
    dragEnd (event, type, p) {
      if (this.editingMyStore) {
        console.log('dragEnd', this.draggingOver, type, p, this.itemDropped)

        if (this.itemDropped || (this.itemDropped === 0)) {
          let from = p
          let to = this.itemDropped
          if (from <= to) {
            to = to - 1
          }
          console.log('move item', from, 'to', to)
          this.moveLinkFromXtoY(from, to)
        }
        this.draggingItem = false
        this.$emit('draggingLink', false)
        this.draggingOver = false
      }
    },
    moveLinkFromXtoY (x, y) {
      console.log('moveLinkFromXtoY')
      console.log('move link from x y')

      let array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
      }

      let links = this.links
      links = array_move(links, x, y)
      this.links = links

      this.$store.dispatch('AUTH.moveLinkFromXtoY', {
        x, y
      }).then((res) => {
        console.log('moveLinkFromXtoY result', res)
        this.getStoreData()
      }).catch((error) => {
      })
    },
    handleLinkClick (link, l) {
      console.log('handleLinkClick', link, l)
      if (link.type == 'url') {
        this.goToLink(link.url)
      } else if (link.type == 'mailing-list') {
        this.$emit('showMailingListModal')
      } else if (link.type == 'contact') {
        this.$emit('showContactUsModal')
      }
    },
    goToLink (url) {
      let first7 = url.substring(0, 7)
      let first8 = url.substring(0, 8)
      if (first7 == 'http://') {
        window.location.assign(url)
      } else if (first8 == 'https://') {
        window.location.assign(url)
      } else {
        window.location.assign('https://' + url)
      }

      if (linkId) {
        this.countLinkClick(linkId)
      }
    },
    scrollLeft () {
      let linksBox = this.$refs.links
      let leftButton = this.$refs.leftButton
      let rightButton = this.$refs.rightButton
      if (linksBox) {
        leftButton.style.display = 'none'
        rightButton.style.display = 'none'
        this.disableReloadUpdate = true
        let scrollPosition = linksBox.scrollLeft
        let boxWidth = linksBox.offsetWidth
        let scrollToLeftBy = boxWidth - 75
        let scrollToLeftTo = scrollPosition - scrollToLeftBy
        if (scrollToLeftTo < 0) {
          scrollToLeftTo = 0
        }
        linksBox.scrollTo({
          left: scrollToLeftTo,
          behavior: 'smooth',
        })
      }
      setTimeout(() => {
        this.disableReloadUpdate = false
        this.setArrowViews()
      }, this.arrowReloadTime)
    },
    scrollRight () {
      let linksBox = this.$refs.links
      let leftButton = this.$refs.leftButton
      let rightButton = this.$refs.rightButton
      if (linksBox) {
        leftButton.style.display = 'none'
        rightButton.style.display = 'none'
        this.disableReloadUpdate = true
        let scrollPosition = linksBox.scrollLeft
        let boxWidth = linksBox.offsetWidth
        let scrollToRightBy = boxWidth - 75
        let scrollToRightTo = scrollPosition + scrollToRightBy
        linksBox.scrollTo({
          left: scrollToRightTo,
          behavior: 'smooth',
        })
      }
      setTimeout(() => {
        this.disableReloadUpdate = false
        this.setArrowViews()
      }, this.arrowReloadTime)
    },
    setArrowViews () {
      let linksBox = this.$refs.links
      let leftButton = this.$refs.leftButton
      let rightButton = this.$refs.rightButton     
      if (linksBox && this.loaded) {
        let scrollPosition = linksBox.scrollLeft
        let boxWidth = linksBox.offsetWidth

        let oneLinkBox = this.$refs.link[0]
        let oneLinkBoxWidth = oneLinkBox.offsetWidth
        let numberOfLinks = this.links.length
        let actualWidth = numberOfLinks * oneLinkBoxWidth
        
        let atStart = scrollPosition <= 0
        let atEnd = (scrollPosition + boxWidth) >= actualWidth + 10

        if (atStart) {
          leftButton.style.display = 'none';
        } else {
          leftButton.style.display = 'block';
        }
        if (atEnd) {
          rightButton.style.display = 'none';
        } else {
          rightButton.style.display = 'block';
        }
      } else {
        setTimeout(() => {
          this.setArrowViews()
        }, 50)
      }
    },
    setBoxScroll () {
      let linksBox = this.$refs.links
      let leftButton = this.$refs.leftButton
      let rightButton = this.$refs.rightButton     
      if (linksBox) {
        linksBox.onscroll = () => {
          if (!this.disableReloadUpdate) {
            this.setArrowViews()
          }
        }
      } else {
        setTimeout(() => {
          this.setBoxScroll()
        }, 50)
      }
    },
    openLinkEditor (event, i) {
      event && event.stopPropagation()
      this.$emit('openLinkEditor', {i})
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.setBoxScroll()
    this.setArrowViews()
    let bodyElement = document.body
    bodyElement.onresize = () => {
      this.setArrowViews()
    }
    // document.addEventListener('dragstart', function( event ) {
      // var img = new Image()
      // img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
      // event.dataTransfer.setDragImage(img, 0, 0)
    // }, false)

  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/settings.scss";
  $grey-a: #e1e1e1;

  .links {
    display: flex;
    align-items: flex-start;
    margin-top: 22px;
    padding-left: 10px;
    padding-right: 10px;
    overflow-x: auto;
    max-width: 100%;
    transition: scroll 0.75 ease;

    &::-webkit-scrollbar {
      display: none;
    }

    &-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 100%;
      /*overflow-x: auto;*/

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &-arrow {
      position: absolute;
      top: 35px;
      /*transform: translateY(-50%);*/
      width: 20px;
      height: 20px;
      border-radius: 10px;
      box-shadow: 0px 6px 7px 0px rgba(0, 0, 0, 0.075);
      background-color: #fff;
      z-index: 20;

      & > * {
        opacity: 0.62;
      }

      &.arrow-left {
        left: 20px;
      }

      &.arrow-right {
        right: 20px;
      }
    }
  }
  .link {
    z-index: 10;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 97px;
    min-width: 97px;
    max-width: 97px;

    &-image {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: $grey-a;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      border: 1px solid $grey-a;

      .link-icon {
        color: #fff;
        font-size: 24px;
      }
    }
    &-text {
      text-align: center;
      font-size: 11px;
      color: $color-background-dark;
      text-transform: uppercase;
    }
  }

  .edit-button {
    height: 21px;
    border-radius: 10.5px;
    border: 1px solid $color-primary;
    color: $color-primary;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 1em;

    &:hover {
      background-color: $color-primary;
      color: #fff;
    }
  }

  .add-link {
    &-outer {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #0000008F;
      z-index: 200;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      width: 100%;
      max-width: 600px;
      border-radius: 12px;
      border: 1px solid #ddd;
      background-color: #fff;
    }
    &-box {
      display: flex;
      padding: 32px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      &-title {
        color: var(--grey-grey-100, #000);
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-align: center;
      }

      &-heading {
        color: var(--grey-grey-100, #000);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 6px;
      }
    }
  }
  .dragging-item-now {
    position: static;
    overflow-y: visible;
    /*width: 10px;*/
    /*max-width: 10px;*/
    overflow: hidden;
    opacity: 0.5;
    transition: 0.01s;
    transform: translateX(-9999px);
    order: 10;

    &::before {
      /*content: ' ';
      position: absolute;
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      left: -10px;
      top: -10px;
      border-radius: 15px;
      background-color: #00000022;*/
    }
  }

  .dragging-over-item-now {
    pointer-events: all;
    z-index: 1111;
    /*border-left: 2px solid $color-primary !important;*/
    /*background-color: grey;*/
    /*border-top-color: blue !important;*/
    /*&::before {
      content: ' ';
      position: absolute;
      height: 100%;
      width: 2px;
      top: 0;
      left: 0;
      background-color: $color-primary;
    }*/
  }
  .draggable-end {
    height: 50px;
  }

  ._pen {
    pointer-events: none !important;
  }
  .new-link-position {
    & > * {
      pointer-events: none !important;
    }
  }
  .extra-link {
    width: 97px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    /*background-color: #ddd;*/
    /*opacity: 1 !important;*/
  }
  .extra-link-2 {
    right: unset;
    left: 10px;
  }
  .z10 {
    z-index: 10;
  }
  .move-links-over {
    transform: translateX(48.5px);
  }
  .hidden-space {
    opacity: 0;
  }
  .dragged-item {
    /*background-color: #ddd;*/
  }
</style>
