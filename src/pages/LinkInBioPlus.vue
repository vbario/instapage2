<template>
  <div class="landing-wrapper df fdc aic f1 w100p">
    <input type="file" class="dont-show" id="upload-banner-image" name="avatar1" accept="image/png, image/jpeg" @change="uploadedBannerImage"/>
    <input type="file" class="dont-show" id="upload-photo-image" name="avatar2" accept="image/png, image/jpeg" @change="uploadedPhotoImage"/>
    <input type="file" class="dont-show" id="upload-custom-link-image" name="avatar3" accept="image/png, image/jpeg" @change="uploadedCustomLinkImage"/>
    <div class="top-bar-global posrel w100p _position1 df jcsb aic only-big">
      <div class="df aic flex-res">
        <h2 class="text-dark header-style header-style-big">My Page</h2>
      </div>
      <div class="f1"></div>
      <div class="df aic actions">
        <a class="copy-link p2 profile-image-s2" @click="goTo('/' + displayName)">see it live</a>
        <a class="copy-link p2 profile-image-s2" @click="copyLink($event, rootDomain + '/' + displayName)">copy link</a>
      </div>
    </div>
    <hr class="divider">
    
    <div v-if="!activated" class="w100p df fdc aic bottom-section">
      <span>
          <h2 class="mt20">
            Activating your link
          </h2>
      </span>
    </div>
    <div v-else-if="activated" class="w100p df fdc aic bottom-section" :class="{
      'theme-0': storeData.selectedTheme === 0,
      'theme-1': storeData.selectedTheme === 1
    }">

      <div class="w100p df fdc">
        <p class="text-dark">The one-link solution for Instagram, TikTok & more.</p>
      </div>
      <div class="w100p df fdr aic jcsb curp overlay">
        <h3 class="text-dark mt20 mb20" @click="editStore()">
          <i class="fa-solid fa-caret-down" v-if="!editingStore"></i>
          <i class="fa-solid fa-caret-up zx" v-else></i>
           Page options
        </h3>

        <p class="text-dark views-count"><i class="fa-solid fa-eye"></i> {{totalViews}} view{{totalViews === 1 ? '' : 's'}}</p>
      </div>

      <div class="w100p df fdc controls" v-if="editingStore">
        <div class="fade-background">
          <h4 class="text-dark">Background blur</h4>
          <input type="range" name="" min="0" max="20" @change="setBackgroundImageBlur($event)" :value="storeData.backgroundImageBlur || 0">
        </div>
        <div class="fade-background">
          <h4 class="text-dark">Background fade</h4>
          <input type="range" name="" min="0" max="100" @change="setBackgroundImageFade($event)" :value="storeData.backgroundImageFade || 0">
        </div>
        <div class="w100p df fdc choose-theme">
          <h4 class="text-dark mb10">Theme</h4>
          <div class="w100p df g20 themes">
            <div class="theme light-theme" @click="setSelectedTheme(0)" :class="{'selected-theme': storeData.selectedTheme === 0}">
              <div class="theme-background">
                <div class="theme-button">
                  <p class="text-dark">Theme 1</p>
                </div>
              </div>
            </div>
            <div class="theme dark-theme" @click="setSelectedTheme(1)" :class="{'selected-theme': storeData.selectedTheme === 1}">
              <div class="theme-background">
                <div class="theme-button">
                  <p class="text-dark">Theme 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <hr class="divider mb0i">

    <div v-if="displayStyle == 'list'" class="link-in-bio-list-wrapper postable">
      <div class="display-options df g20">
        <h4 class="button-3" @click="setDisplayStyle('list')">
          <i class="fa-solid fa-list"></i>
          <p class="default" v-if="storeData.displayStyle == 'list'">(default)</p>
        </h4>
        <h4 class="button-3" @click="setDisplayStyle('grid')">
          <i class="fa-solid fa-grid"></i>
          <p class="default" v-if="storeData.displayStyle == 'grid'">(default)</p>
        </h4>
        <a class="set-view" @click="setDefaultView()">Set current view as default</a>
      </div>

      <div class="profile-options">
        <h4 v-if="!(storeData.banner && storeData.banner.url)" class="button-3" @click="startUploadingBanner()">
          <i class="fa-solid fa-image"></i>
          <p class="default res_" v-if="storeData.displayStyle == 'list'">Add Background</p>
        </h4>
        <h4 v-else class="button-3" @click="startUploadingBanner()">
          <i class="fa-solid fa-image"></i>
          <p class="default res_" v-if="storeData.displayStyle == 'list'">Change Background</p>
        </h4>
      </div>
      <div class="w100p profile-banner posrel" 
      v-bind:style="
        'background-image: url(' + (storeData.banner ? storeData.banner.url : '') + '); filter: blur(' + (storeData.backgroundImageBlur || 0) + 'px); opacity: ' + (1 - parseInt(storeData.backgroundImageFade || 0)/100) + '; left: -' + (storeData.backgroundImageBlur || 0) + 'px; top: -' + (storeData.backgroundImageBlur || 0) + 'px; width: calc(100% + 38px + 2 * ' + (storeData.backgroundImageBlur || 0) + 'px); height: calc(100% + 38px + 2 * ' + (storeData.backgroundImageBlur || 0) + 'px);'">


        <!-- <h4 v-else class="button-1 button-smaller text-dark curp change-banner" @click="startUploadingBanner()">Change background</h4> -->




        <!-- <h4 v-if="$store.getters['AUTH.myInfo'].profileImageUrl" class="button-1 button-smaller text-dark curp change-photo" @click="startUploadingPhoto()">Change profile photo</h4>
        <h4 v-else class="button-1 button-smaller text-dark curp change-photo" @click="startUploadingPhoto()">Add profile photo</h4> -->
        <!-- <input type="file" id="upload-banner-image" name="avatar" accept="image/png, image/jpeg" @change="uploadedBannerImage"/> -->
      </div>
      <div class="w100p profile-banner-background posrel" :style="'background-color: ' + (storeData.selectedTheme === 0 ? '#fff' : '#000') + ';'">
      </div>
      <div class="df fdc jcc aic z2">
        <img class="profile-image profile-image-s2" :src="$store.getters['AUTH.myInfo'].profileImageUrl ? $store.getters['AUTH.myInfo'].profileImageUrl.profileImageUrl : '../../static/images/user-solid.svg'">
        <h3 class="fz22p text-dark mt__ username-display">
          @{{$store.getters['AUTH.myInfo'].displayName.displayName}}
        </h3>
        <i class="fa-solid fa-pen-circle change-edit-photo" @click="startUploadingPhoto()"></i>
      </div>

      <div class="link-in-bio-list">
        <div v-for="(product, p) in storeData.items" class="link-in-bio-list-item df jcc aic fz20p posrel" :class="{'text-block': product.type == 'text'}" v-bind:style="'z-index: ' + (Object.keys(storeData.items).length - product.position + 4) + ';'" @click="goToLink(product.url, product.type == 'link')">
          <img class="list-item-image" v-if="product.productImage || product.image" :src="product.productImage || product.image">
          <i class="fa-solid fa-box list-item-icon" v-else-if="product.productType == 'physical-product'"></i>
          <i class="fa-solid fa-download list-item-icon" v-else-if="product.productType == 'digital-download'"></i>
          <i class="fa-solid fa-bell-concierge list-item-icon" v-else-if="product.productType == 'digital-service'"></i>
          <i class="fa-solid fa-calendar-days list-item-icon" v-else-if="product.productType == 'calendar-event'"></i>
          <i class="fa-solid fa-link-simple list-item-icon" v-else-if="product.type == 'link'"></i>
          <p v-if="product.type !== 'text'" class="text-dark views-count item-views-count-list"><i class="fa-solid fa-eye"></i> {{storeViews[product.key] || 0}}</p>
          
          <p :class="{'color-white': product.type == 'text'}">{{product.title || product.text}}</p>
          <!-- <h4 v-if="(product.type == 'buy') && (product.productType !== 'collect-email')" class="list-item-button button-1 button-smaller" @click="goTo('/pay/' + product.productId)">{{product.callToAction || 'Buy'}}</h4> -->
          <!-- <h4 v-if="(product.type == 'buy') && (product.productType == 'collect-email')" class="list-item-button button-1 button-smaller" @click="goTo('/pay/' + product.productId)">{{product.callToAction || 'Join'}}</h4> -->
          <i class="fa-solid fa-ellipsis more-icon" @click="showItemOptions($event, product.key)">
            <div class="inside-ellipsis posrel" @click="stopProp($event)" v-if="showProductOptions === product.key">
              <span class="item-options">
                <div class="df fdc">
                  <img v-if="adding" class="spinner-2" src="../../static/images/pushable/loader-black.png">
                  <div v-else class="w100p df fdc">
                    <a>
                      <span @click="removeItemFromStore($event, product.key)">
                        Delete
                      </span>
                    </a>
                    <a class="mt30" v-if="product.position !== 0">
                      <span @click="moveUp($event, product.key)">
                        Move up
                      </span>
                    </a>
                    <a class="mt30">
                      <span v-if="product.position < (storeData.items.length - 1)" @click="moveDown($event, product.key)">
                        Move down
                      </span>
                    </a>
                    <a v-if="!adding" class="mt30 fz14i" @click="showItemOptions($event, '')">Cancel</a>
                  </div>
                </div>
              </span>
            </div>
          </i>
        </div>
        <div class="link-in-bio-list-item add-list-item df aic jcc" @click="addNew(true)">
          <p v-if="!addNewItem" class="df aic">
            <i class="fa-solid fa-square-plus"></i>
            <span class="ml__">Add a link</span>
          </p>
          <!-- <div v-else class="w100p df jcc aic">
            <a @click="addItemType('product')">
              <h4 class="button-1 tac">
                Add one<br/>of my items
              </h4>
            </a>
            <a @click="addItemType('link')">
              <h4 class="button-0 button-smaller">Add a link</h4>
            </a>
            <a class="text-dark fz__" @click="stopAddingAnotherItem($event)">Cancel</a>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="displayStyle == 'grid'" class="link-in-bio-grid-wrapper postable">
      <div class="display-options df g20">
        <h4 class="button-3" @click="setDisplayStyle('list')">
          <i class="fa-solid fa-list"></i>
          <p class="default" v-if="storeData.displayStyle == 'list'">(default)</p>
        </h4>
        <h4 class="button-3" @click="setDisplayStyle('grid')">
          <i class="fa-solid fa-grid"></i>
          <p class="default" v-if="storeData.displayStyle == 'grid'">(default)</p>
        </h4>
        <a class="set-view" @click="setDefaultView()">Set current view as default</a>
      </div>
      
      <div class="profile-options">
        <h4 v-if="!(storeData.banner && storeData.banner.url)" class="button-3" @click="startUploadingBanner()">
          <i class="fa-solid fa-image"></i>
          <p class="default res_" v-if="storeData.displayStyle == 'list'">Add Background</p>
        </h4>
        <h4 v-else class="button-3" @click="startUploadingBanner()">
          <i class="fa-solid fa-image"></i>
          <p class="default res_" v-if="storeData.displayStyle == 'list'">Change Background</p>
        </h4>
      </div>
      <div class="w100p profile-banner posrel"
      v-bind:style="
        'background-image: url(' + (storeData.banner ? storeData.banner.url : '') + '); filter: blur(' + (storeData.backgroundImageBlur || 0) + 'px); opacity: ' + (1 - parseInt(storeData.backgroundImageFade || 0)/100) + '; left: -' + (storeData.backgroundImageBlur || 0) + 'px; top: -' + (storeData.backgroundImageBlur || 0) + 'px; width: calc(100% + 38px + 2 * ' + (storeData.backgroundImageBlur || 0) + 'px); height: calc(100% + 38px + 2 * ' + (storeData.backgroundImageBlur || 0) + 'px);'">
        <!-- <h4 v-if="!(storeData.banner && storeData.banner.url)" class="button-1 button-smaller text-dark curp change-banner" @click="startUploadingBanner()">Add background</h4>
        <h4 v-else class="button-2 button-smaller text-dark curp change-banner" @click="startUploadingBanner()">Change background</h4> -->
        <!-- <i class="fa-solid fa-pen-circle change-edit-photo"@click="startUploadingPhoto()"></i>
        <h4 v-if="$store.getters['AUTH.myInfo'].profileImageUrl" class="button-1 button-smaller text-dark curp change-photo" @click="startUploadingPhoto()">Change profile photo</h4>
        <h4 v-else class="button-1 button-smaller text-dark curp change-photo" @click="startUploadingPhoto()">Add profile photo</h4> -->
        <!-- <input type="file" id="upload-banner-image" name="avatar" accept="image/png, image/jpeg" @change="uploadedBannerImage"/> -->
      </div>
      <div class="w100p profile-banner-background posrel" :style="'background-color: ' + (storeData.selectedTheme === 0 ? '#fff' : '#000') + ';'">
      </div>
      <div class="df fdc jcc aic z2">
        <img class="profile-image profile-image-s2" :src="$store.getters['AUTH.myInfo'].profileImageUrl ? $store.getters['AUTH.myInfo'].profileImageUrl.profileImageUrl : '../../static/images/user-solid.svg'">
        <h3 class="fz22p text-dark mt__ username-display">
          @{{$store.getters['AUTH.myInfo'].displayName.displayName}}
        </h3>
        <i class="fa-solid fa-pen-circle change-edit-photo" @click="startUploadingPhoto()"></i>
      </div>
      <div class="link-in-bio-grid">
        <div v-for="(product, p) in storeData.items" class="link-in-bio-grid-item-wrapper df fdc posrel" :class="{'only-text-block': product.type == 'text'}" v-if="!product.deleted" @click="cardClick(product.url || product.productId, product.type == 'link', product.type == 'text')">
          <div v-if="product.productImage || product.image" class="link-in-bio-grid-item" v-bind:style="'background-image: url(' + (product.productImage || product.image) + ');'">
          </div>
          <div v-else-if="product.productType == 'physical-product'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
            <i class="fa-solid fa-box grid-item-icon"></i>
          </div>
          <div v-else-if="product.productType == 'collect-email'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
            <i class="fa-solid fa-envelope grid-item-icon"></i>
          </div>
          <div v-else-if="product.productType == 'digital-download'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
            <i class="fa-solid fa-download grid-item-icon"></i>
          </div>
          <div v-else-if="product.productType == 'digital-service'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
            <i class="fa-solid fa-bell-concierge grid-item-icon"></i>
          </div>
          <div v-else-if="product.productType == 'calendar-event'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
            <i class="fa-solid fa-calendar-days grid-item-icon"></i>
          </div>
          <div v-else-if="product.type == 'link'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
            <i class="fa-solid fa-link-simple grid-item-icon"></i>
          </div>
          <div v-else-if="product.type == 'text'" class="link-in-bio-grid-item link-in-bio-grid-item-default text-block">
            <p>{{product.text}}</p>
          </div>
          <p v-if="product.type !== 'text'" class="text-dark views-count item-views-count"><i class="fa-solid fa-eye"></i> {{storeViews[product.key] || 0}}</p>

          <i class="fa-solid fa-ellipsis more-icon-grid" @click="showItemOptions($event, product.key)">
            <div class="inside-ellipsis posrel" @click="stopProp($event)" v-if="showProductOptions == product.key">
              <span class="item-options">
                <div class="df fdc">
                  <img v-if="adding" class="spinner-2" src="../../static/images/pushable/loader-black.png">
                  <div v-else class="w100p df fdc">
                    <a>
                      <span @click="removeItemFromStore($event, product.key)">
                        Delete
                      </span>
                    </a>
                    <a class="mt30" v-if="product.position !== 0">
                      <span @click="moveUp($event, product.key)">
                        Move up
                      </span>
                    </a>
                    <a class="mt30">
                      <span v-if="product.position < (storeData.items.length - 1)" @click="moveDown($event, product.key)">
                        Move down
                      </span>
                    </a>
                    <a v-if="!adding" class="mt30 fz14i" @click="showItemOptions($event, '')">Cancel</a>
                  </div>
                </div>
              </span>
            </div>
          </i>



          <div class="link-in-bio-grid-item-text w100p df fdc jcsb f1">
            <p class="text-dark f1 fw500" @click="goToLink(product.url, product.type == 'link')">
              {{product.title}}
            </p>
            <p>{{product.description}}</p>
            <h4 v-if="(product.type == 'buy') && (product.productType !== 'collect-email')" class="button-1 button-smaller" @click="cardClick(product.productId)">{{product.callToAction || 'Buy'}}</h4>
            <h4 v-if="(product.type == 'buy') && (product.productType == 'collect-email')" class="button-1 button-smaller" @click="cardClick(product.productId)">{{product.callToAction || 'Join'}}</h4>
            <!-- <h4 v-else-if="product.type == 'link'" class="button-3" @click="goToLink(product.url)">{{product.callToAction || 'Go'}}</h4> -->
            <span class="buy-button"></span>
          </div>
        </div>
        <div class="link-in-bio-grid-item-wrapper df fdc">
          <div class="link-in-bio-grid-item add-grid-item df fdc aic jcc" @click="addNew(true)">
            <p class="text-dark df fdc aic" v-if="!addNewItem">
              <i class="fa-solid fa-square-plus"></i>
              <span class="mt10">Add a link</span>
            </p>
            <!-- <div v-else class="w100p df fdc aic">
              <a @click="addItemType('product')">
                <h4 class="button-1 tac">
                  Add one<br/>of my items
                </h4>
              </a>
              <a @click="addItemType('link')">
                <h4 class="button-0 button-smaller mt20">Add a link</h4>
              </a>
              <a class="mt20 text-dark fz__" @click="stopAddingAnotherItem($event)">Cancel</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>

      <!-- <div v-if="displayStyle == 'list'" class="link-in-bio-list-wrapper mt20">
        <div class="w100p df fdc jcc aic">
          <img class="profile-image" :src="profileImageUrl">
          <h3 class="fz22p text-dark mb30 mt__">
            @{{displayName}}
          </h3>
        </div>
        <div class="link-in-bio-list">
          <div v-for="product in myProductsList()" class="link-in-bio-list-item df jcc aic fz20p posrel" v-if="!product.deleted">
            <img class="list-item-image" :src="product.productImageUrl">
            <p>{{product.name}}</p>
            <h4 class="list-item-button button-1 button-smaller" @click="goTo('/pay/' + product.uniqueProductId)">Buy Now</h4>
          </div>
          <div class="link-in-bio-list-item add-list-item df aic jcc" @click="startAddingAnotherItem()">
            <p v-if="!addNewItem" class="df aic">
              <img class="add-icon-2" src="../../static/images/momentum/icon-plus.png"/>
              <span class="ml__">Add a link</span>
            </p>
            <div v-else class="w100p df jcc aic">
              <a @click="addItemType('product')">
                <h4 class="button-1 tac">
                  Add one<br/>of my items
                </h4>
              </a>
              <a @click="addItemType('link')">
                <h4 class="button-0 button-smaller">Add a link</h4>
              </a>
              <a class="text-dark fz__" @click="stopAddingAnotherItem($event)">Cancel</a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="displayStyle == 'grid'" class="link-in-bio-grid-wrapper mt20">
        <div class="w100p df fdc jcc aic">
          <img class="profile-image" :src="profileImageUrl">
          <h3 class="fz22p text-dark mb30 mt__">
            @{{displayName}}
          </h3>
        </div>
        <div class="link-in-bio-grid">
          <div v-for="product in myProductsList()" class="link-in-bio-grid-item-wrapper df fdc" v-if="!product.deleted">
            <div class="link-in-bio-grid-item" v-bind:style="'background-image: url(' + product.productImageUrl + ');'">
            </div>
            <div class="link-in-bio-grid-item-text w100p df fdc jcsb f1">
              <p class="text-dark f1 fw500">
                {{product.name}}
              </p>
              <h4 class="button-3" @click="goTo('/pay/' + product.uniqueProductId)">Buy Now</h4>
              <span class="buy-button"></span>
            </div>
          </div>
          <div class="link-in-bio-grid-item-wrapper df fdc">
            <div class="link-in-bio-grid-item add-grid-item df fdc aic jcc" @click="startAddingAnotherItem()">
              <p class="text-dark df fdc aic" v-if="!addNewItem">
                <img class="add-icon" src="../../static/images/momentum/icon-plus.png"/>
                <span class="mt10">Add a link</span>
              </p>
              <div v-else class="w100p df fdc aic">
                <a @click="addItemType('product')">
                  <h4 class="button-1 tac">
                    Add one<br/>of my items
                  </h4>
                </a>
                <a @click="addItemType('link')">
                  <h4 class="button-0 button-smaller mt20">Add a link</h4>
                </a>
                <a class="mt20 text-dark fz__" @click="stopAddingAnotherItem($event)">Cancel</a>
              </div>
            </div>
            <div class="link-in-bio-grid-item-text w100p df fdc jcsb f1">
              <p class="text-dark f1 fw500">
              </p>
              <span class="buy-button"></span>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <div class="w100p add-item-popup-wrapper" v-if="showAddNew"@click="addNew(false)">
      <div class="add-item-popup" @click="stopProp($event)">

        <h3 class="text-dark mb5">Add text</h3>
        <div class="w100p df" :class="{'disabled-1': addMyOwnItem !== 'text'}">
          <div class="popup-select-radio">
            <input :checked="addMyOwnItem == 'text'" type="radio" name="" @click="setAddItemType('text')">
          </div>
          <div class="w100p df fdc custom-link" @click="setAddItemType('text')">
            <input v-model="newText" placeholder="Text" type="text" name="">
          </div>
        </div>

        <h3 v-if="fulfillmentsOrders.length !== 0" class="text-dark mb5">Choose an item to add</h3>
        <div v-if="fulfillmentsOrders.length == 0" class="">
          <p class="text-dark new-product-text">
            <a class="add-product" @click="goTo('/products')">Create a product</a>
            <span></span>to add it to your grid.
          </p>
        </div>
        <div v-else class="w100p df" :class="{'disabled-1': addMyOwnItem !== 'product'}">
          <div class="popup-select-radio">
            <input :checked="addMyOwnItem == 'product'" type="radio" name="" @click="setAddItemType('product')">
          </div>
          <select
            class="my-products"
            v-model="selectedOption"
            @change="updateSelectedProductToAdd($event)"
            @click="setAddItemType('product')">
            <option
              v-for="(option, o) in fulfillmentsOrders"
              v-if="!option.deleted"
              :key="'option-' + o"
              :value="o"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <p class="or-add-type">or</p>
        <h3 class="text-dark mb5">Add a custom link</h3>
        <div class="w100p df" :class="{'disabled-1': addMyOwnItem !== 'link'}">
          <div class="popup-select-radio">
            <input :checked="addMyOwnItem == 'link'" type="radio" name="" @click="setAddItemType('link')">
          </div>
          <div class="w100p df fdc custom-link" @click="setAddItemType('link')">
            <input v-model="newLinkTitle" placeholder="Title" type="text" name="">
            <input v-model="newLinkUrl" placeholder="URL" type="text" name="">
            <div class="df aic new-image" v-if="newLinkImage">
              <img :src="newLinkImage">
              <h4 class="button-0 button-smaller" @click="startUploadingCustomLinkImage()">Change Image</h4>
            </div>
            <div v-else>
              <h4 class="button-2 button-smaller" @click="startUploadingCustomLinkImage()">Upload Image</h4>
            </div>
          </div>
        </div>
        <p class="save-product-error mt15" v-if="saveProductError">{{saveProductError.message}}</p>
        <div class="w100p mt20 df aic">
          <h4 v-if="adding" class="button-1 mw_">
            <img class="spinner-2" src="../../static/images/pushable/loader-black.png">
          </h4>
          <h4 v-else class="button-1 mw_" @click="addProductOrLink()">
            Add
          </h4>
          <h4 v-if="!adding" class="button-0 cancel-button mw_" @click="addNew(false)">
            Cancel
          </h4>
        </div>

      </div>
    </div>
    <div class="spacer"></div>

    <div v-if="loading || !activated" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div>


  </div>
</template>

<script>

import router from '@/router'
import paths from '@/util/paths'
import LandingProduct from '@/components/LandingProduct'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'LinkInBioPlus',
  data () {
    return {
      loadedStore: false,
      storeViews: {},
      totalViews: 0,
      newText: '',
      editingStore: false,
      saveProductError: false,
      showProductOptions: '',
      selectedOption: '',
      selectedProductToAdd: null,
      addMyOwnItem: 'text',
      showAddNew: false,
      newLinkUrl: '',
      newLinkTitle: '',
      newLinkImage: '',
      fulfillmentsOrders: [],
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      balance: {},
      loading: false,
      income: [],
      displayStyle: 'grid',
      boxesAcross: 3,
      boxHeight: 250,
      showCopied: false,
      fullName: '',
      displayName: '',
      profileImageUrl: '',
      addNewItem: false,
      activated: false,
      newUsername: '',
      checkingUsername: false,
      newUsernameIsAvailable: false,
      notAvailableMessage: false,
      typingTimer: {},
      storeData: {
        loaded: false
      },
      lastSwitch: 0,
      adding: false
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    myDisplayName () {
      if (this.$store.getters['AUTH.myInfo']) {
        return this.$store.getters['AUTH.myInfo'].displayName && this.$store.getters['AUTH.myInfo'].displayName.displayName
      }
      return ''
    },
    cardClick (url, isLink, blockClick) {
      console.log('cardClick', url, isLink, blockClick)
        if (isLink) {
          this.goToLink(url, true)
        } else if (blockClick) {
          return false
        } else {
          this.goTo('/' + this.myDisplayName() + '/' + url)
        }
    },
    editStore () {
      this.editingStore = !this.editingStore
    },
    setBackgroundImageFade (event) {
      let backgroundImageFade = event.target.value
      this.$store.dispatch('AUTH.setBackgroundFade', {
        backgroundImageFade
      }).then((res) => {
        console.log('setBackgroundFade result', res.url)
        this.getMyPublicStore()
      }).catch((error) => {
      })
    },
    setBackgroundImageBlur (event) {
      let backgroundImageBlur = event.target.value
      console.log('set', backgroundImageBlur)
      this.$store.dispatch('AUTH.setBackgroundImageBlur', {
        backgroundImageBlur
      }).then((res) => {
        console.log('setBackgroundImageBlur result', res.url)
        this.getMyPublicStore()
      }).catch((error) => {
      })
    },
    setSelectedTheme (selectedTheme) {
      this.$store.dispatch('AUTH.setMyStoreTheme', {
        selectedTheme
      }).then((res) => {
        console.log('setMyStoreTheme result', res.url)
        this.getMyPublicStore()
      }).catch((error) => {
      })
    },
    moveUp (event, productId) {
      this.adding = true
      let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]
      this.$store.dispatch('AUTH.moveUpItem', {
        productId
      }).then((res) => {
        console.log('moveUp result', res.url)
        this.adding = false
        this.getMyPublicStore()
        this.showAddNew = false
        this.showProductOptions = ''
      }).catch((error) => {
      })
    },
    moveDown (event, productId) {
      this.adding = true
      let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]
      this.$store.dispatch('AUTH.moveDownItem', {
        productId
      }).then((res) => {
        console.log('moveDown result', res.url)
        this.adding = false
        this.getMyPublicStore()
        this.showAddNew = false
        this.showProductOptions = ''
      }).catch((error) => {
      })
    },
    startUploadingCustomLinkImage () {
      let linkImageUploadButton = document.getElementById('upload-custom-link-image')
      linkImageUploadButton.click()
    },
    setDefaultView () {
      this.$store.dispatch('AUTH.setDefaultViewForMyStore', {
        displayStyle: this.displayStyle
      }).then((res) => {
        this.getMyPublicStore()
      }).catch((error) => {
      })
    },
    removeItemFromStore (event, productId) {
      this.adding = true
      let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]
      this.$store.dispatch('AUTH.removeItemFromStore', {
        productId
      }).then((res) => {
        console.log('removeItemFromStore result', res.url)
        this.adding = false
        this.getMyPublicStore()
        this.showAddNew = false
        this.showProductOptions = ''
      }).catch((error) => {
      })
    },
    showItemOptions (event, p) {
      console.log('***', event, p)
      let now = (new Date()).getTime()
        event && event.stopPropagation()
      
      if (this.showProductOptions == p) {
        this.showProductOptions = ''
      } else if (now - this.lastSwitch > 200) {
        console.log('event, p', event, p) // productId
        this.lastSwitch = now
        this.showProductOptions = p
      }
      console.log('this.showProductOptions', this.showProductOptions)
    },
    goToLink (route, isLink) {
      console.log('route', route, isLink)
      if (isLink) {
        let first7 = route.substring(0, 7)
        let first8 = route.substring(0, 8)
        if (first7 == 'http://') {
          window.location.assign(route)
        } else if (first8 == 'https://') {
          window.location.assign(route)
        } else {
          window.location.assign('https://' + route)
        }
      }
    },
    updateSelectedProductToAdd (selectedProductToAdd) {
      this.selectedProductToAdd = selectedProductToAdd.target.value
    },
    setAddItemType (addMyOwnItem) {
      console.log('setAddItemType: addMyOwnItem =', addMyOwnItem)
      this.addMyOwnItem = addMyOwnItem
    },
    addNew (showAddNew) {
      this.showAddNew = showAddNew
      this.selectedOption = false
    },
    setProductError (type, message) {
      if (!type) {
        this.saveProductError = null
        return false
      }
      this.saveProductError = {
        type,
        message
      }
    },
    addProductOrLink () {
      if (this.addMyOwnItem == 'product') {
        if ((this.selectedOption == '') && !(this.selectedOption === 0)) {
          console.log('selectedOption', this.selectedOption)
          this.setProductError('validation-selected-option', 'Please select an item to add.')
          return false
        } 
        this.addProduct()
      } else if (this.addMyOwnItem == 'link') {
        if (this.newLinkTitle == '') {
          this.setProductError('validation-new-link-title', 'Please add a link title.')
          return false
        } else if (this.newLinkUrl == '') {
          this.setProductError('validation-new-link-url', 'Please add a link URL.')
          return false
        } 
        this.addLink()
      } else if (this.addMyOwnItem == 'text') {
        if (this.newText == '') {
          this.setProductError('validation-new-text-title', 'Please add text.')
          return false
        }
        this.addText()
      }
    },
    addText () {
      this.adding = true
      let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]
      this.$store.dispatch('AUTH.addTextToStore', {
        text: this.newText,
        position: Object.keys(this.storeData.items).length
      }).then((res) => {
        console.log('addTextToStore result', res.url)
        this.newText = ''
        this.adding = false
        this.getMyPublicStore()
        this.showAddNew = false
      }).catch((error) => {
      })
    },
    addProduct () {
      this.adding = true
      console.log('addProduct', Object.keys(this.storeData.items).length)
      let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]
      this.$store.dispatch('AUTH.addProductToStore', {
        productId: productToAdd.uniqueProductId,
        position: Object.keys(this.storeData.items).length
      }).then((res) => {
        console.log('addProductToStore result', res.url)
        this.selectedOption = ''
        this.adding = false
        this.getMyPublicStore()
        this.showAddNew = false
      }).catch((error) => {
      })
    },
    addLink () {
      this.adding = true
      this.$store.dispatch('AUTH.addLinkToStore', {
        url: this.newLinkUrl,
        title: this.newLinkTitle,
        image: this.newLinkImage,
        position: Object.keys(this.storeData.items).length
      }).then((res) => {
        console.log('addLinkToStore result', res.url)
        this.selectedOption = ''
        this.adding = false
        this.getMyPublicStore()
        this.showAddNew = false
        this.newLinkUrl = ''
        this.newLinkTitle = ''
        this.newLinkImage = ''
      }).catch((error) => {
      })
    },
    startUploadingPhoto () {
      let photoUploadButton = document.getElementById('upload-photo-image')
      photoUploadButton.click()
    },
    uploadedCustomLinkImage (file) {
      console.log('uploadedCustomLinkImage')
      let item = {
        uid: this.$store.getters['AUTH.uid'],
        file
      }
      this.$store.dispatch('AUTH.uploadedCustomLinkImage', item).then((res) => {
        console.log('uploadedCustomLinkImage result', res.url)
        this.newLinkImage = res.url || ''
        // this.profileImageUrl = res.url
        // this.getMyPublicStore()
      })
    },
    uploadedPhotoImage (file) {
      console.log('uploadedPhotoImage')
      let item = {
        uid: this.$store.getters['AUTH.uid'],
        file
      }
      this.$store.dispatch('AUTH.uploadedPhotoImage', item).then((res) => {
        console.log('uploadedPhotoImage result', res.url)
        // this.profileImageUrl = res.url
        this.getMyPublicStore()
      })
    },
    startUploadingBanner () {
      let bannerUploadButton = document.getElementById('upload-banner-image')
      bannerUploadButton.click()
    },
    uploadedBannerImage (file) {
      console.log('uploadedBannerImage')
      let item = {
        uid: this.$store.getters['AUTH.uid'],
        file
      }
      this.$store.dispatch('AUTH.uploadBannerImage', item).then((res) => {
        console.log('uploadedBannerImage result', res.url)
        // this.profileImageUrl = res.url
        this.getMyPublicStore()
      })
    },
    activate () {
      let storeObject = {
          defaultStyle: 'list',
          fixedStyle: false,
          selectedTheme: 1,
          items: [],
          links: [
            {
              "heading": "Join mailing list",
              "type": "mailing-list"
            },
            {
              "heading": "Contact",
              "type": "contact"
            }
          ]
      }
      this.$store.dispatch('AUTH.activateMyStore', storeObject).then((res) => {
        this.getMyPublicStore()
      })
    },
    save () {
      if (!this.checkingUsername) {
        console.log('save')
        let profileObject = {
          displayName: this.newUsername,
        }
        this.$store.dispatch('AUTH.saveProfile', profileObject).then((res) => {
          console.log('after saveProfile', res)
        })
      }
    },
    stopAddingAnotherItem (event) {
      event.stopPropagation()
      this.addNewItem = false
    },
    startAddingAnotherItem () {
      if (!this.addNewItem) {
        this.addNewItem = true
      }
    },
    addItemType (type) {
      console.log('addItemType', type)
      // router.push(route)
    },
    goTo (route) {
      console.log('route', route)
      router.push(route)
    },
    myProductsList () {
      return JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList'] || {}))
    },
    setDisplayStyle (displayStyle) {
      this.displayStyle = displayStyle
    },
    startOnboarding () {
      this.$store.dispatch('AUTH.startOnboarding', {}).then(async (res) => {
        console.log('startOnboarding', res)
        if (res.url) {
          window.location = res.url
        }
      })
    },
    finishOnboarding () {
      // alert('Finish Onboarding')
      // this.$store.dispatch('AUTH.finishOnboarding', {}).then(async (res) => {
      //   console.log('finishOnboarding', res)
      //   if (res.url) {
      //     window.location = res.url
      //     // this.goTo(res.url)
      //   }
      // })
    },
    withdraw () {
      console.log('withdraw')
    },
    availableBalance () {
      let balance = this.balance
      let totals = {}
      for (let i in balance.available) {
        if (!totals[balance.available[i].currency]) {
          totals[balance.available[i].currency] = balance.available[i].amount
        } else {
          totals[balance.available[i].currency] = totals[balance.available[i].currency] + balance.available[i].amount
        }
      }
      return totals
    },
    pendingBalance () {
      let balance = this.balance
      let totals = {}
      for (let i in balance.pending) {
        if (!totals[balance.pending[i].currency]) {
          totals[balance.pending[i].currency] = balance.pending[i].amount
        } else {
          totals[balance.pending[i].currency] = totals[balance.pending[i].currency] + balance.pending[i].amount
        }
      }
      return totals
    },
    // balance () {
    //   let balance = 0
    //   let income = this.income
    //   for (let item in income) {
    //     let earned = income[item].order[0].earned ? parseFloat(income[item].order[0].earned) : parseFloat(income[item].order[0].price)
    //     balance = balance + earned
    //   } 
    //   return parseFloat(balance/100).toFixed(2)
    // },
    formatCurrency (c) {
      return c
    },
    formatDate (date) {

      Number.prototype.padLeft = function(base,chr){
         var  len = (String(base || 10).length - String(this).length)+1;
         return len > 0? new Array(len).join(chr || '0')+this : this;
      }

    var d = new Date(date),
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft()].join(':');

               return dformat
    },
    getMyIncome () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyIncome', {}).then((res) => {
          console.log('income', res)
          this.income = res
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyIncome()
        }, 100)
      }
    },
    getMyBalance () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyBalance', {}).then((res) => {
          console.log('balance', res)
          this.balance = res.data || {}
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyBalance()
        }, 100)
      }
    },
    getMyStoreStats () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyStoreStats', {}).then((_res) => {
          console.log('getMyStoreStats res', _res)
          let res = _res || {}
          let totalViews = 0
          for (let day in res) {
            totalViews += res[day].totalCount
          }
          this.totalViews = totalViews
        })
      } else {
        setTimeout(() => {
          this.getMyStoreStats()
        }, 100)
      }
    },
    getMyStoreClickStats () {
      if (this.$store.getters['AUTH.uid']) {
        console.log('getMyStoreClickStats')
        this.$store.dispatch('AUTH.getMyStoreClickStats', {}).then((_res) => {
          console.log('getMyStoreClickStats res', _res)
          let res = _res || {}

          let storeItems = {}

          for (let i in res) {
            if (!storeItems[i]) {
              storeItems[i] = 0
            }
            for (let day in res[i]) {
              storeItems[i] = storeItems[i] + res[i][day].totalCount
            }
          }
          this.storeViews = storeItems
          console.log('storeViews', this.storeViews)
        })
      } else {
        setTimeout(() => {
          this.getMyStoreClickStats()
        }, 100)
      }
    },
    getMyPublicStore () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyPublicStore', {}).then((_res) => {
          console.log('getMyPublicStore res', _res)
          let res = _res || {}
          if (!res.ownerId) {
            console.log('activate store')
            this.activate()
          } else {
            if (!this.loadedStore) {
              console.log('DISPLAY STYLE')
              this.loadedStore = true
              this.displayStyle = res.displayStyle || 'grid'
            }
            this.activated = true
            loaing: false

            let items = res.items
            let array = []
            for (let i in items) {
              array.push({...items[i], key: i})
            }
            array = array.sort((a, b) => a.position - b.position)
            // add to array
            //sort array
            let _res = {...res, items: array}

            this.storeData = {..._res, loaded: true}
            console.log('???', this.storeData)
          }
        })
      } else {
        let time = (new Date()).getTime()
        console.log('wait', this.$store.getters['AUTH.uid'], time)
        setTimeout(() => {
          this.getMyPublicStore()
        }, 100)
      }
    },
    setCheckInterval () {
      this.checkingUsername = true
      this.newUsernameIsAvailable = false
      this.notAvailableMessage = false
      clearInterval(this.typingTimer)
      this.typingTimer = setTimeout(() => {
        this.checkUsername()
      }, 700)
    },
    checkUsername () {
      this.$store.dispatch('AUTH.checkUsername', {username: this.newUsername}).then((res) => {
        if (res.data.usernameIsAvailable) {
          this.newUsernameIsAvailable = true
        } else {
          this.newUsernameIsAvailable = false
          this.notAvailableMessage = true
        }
        this.checkingUsername = false
      })
    },
    productTypeDisplay (type) {
      if (type == 'digital-download') {
        return 'Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
    stopProp (event) {
      event && event.stopPropagation()
    },
    copyLink (e, link) {
      e.stopPropagation()
      this.flashCopied()
      console.log('link', link)
      navigator.clipboard.writeText(link);
    },
    flashCopied () {
      this.showCopied = true
      setTimeout(() => {
        this.showCopied = false
      }, 1000)
    },
    loadProfile () {
      if (this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myPrivateInfo']) {
        this.displayName = this.$store.getters['AUTH.myInfo'].displayName.displayName
        console.log('private info', this.$store.getters['AUTH.myPrivateInfo'])
        console.log('my info', this.$store.getters['AUTH.myInfo'])
        this.profileImageUrl = this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl ? this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl : ''
        // this.profileImageUrl = this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl
      } else {
        setTimeout(() => {
          this.loadProfile()
        }, 100)
      }
    },
    loadProductList () {
      if (this.$store.getters['AUTH.myProductsList']) {
        this.fulfillmentsOrders = JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList']))
        console.log('go', this.fulfillmentsOrders)
        this.sortFulfillments()
      } else {
        setTimeout(() => {
          this.loadProductList()
        }, 100)
      }
    },

    sortFulfillments () {
      // if (this.sortByOrders == 'newest first') {
      this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => b.created - a.created)
      // } else if (this.sortByOrders == 'oldest first') {
      //   this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => a.created - b.created)
      // }

      // else if (this.sortByOrders == 'highest price') {
      //   this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => a.order[0].price - b.order[0].price)
      // } else if (this.sortByOrders == 'lowest price') {
      //   this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => b.order[0].price - a.order[0].price)
      // }
    },
  },
  directives: {
    ClickOutside
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
    this.getMyIncome()
    this.getMyBalance()
    this.loadProfile()
    this.getMyPublicStore()
    this.getMyStoreStats()
    this.getMyStoreClickStats()
    this.loadProductList()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .landing-wrapper {
    padding: 19px;
    padding-top: 14px;
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
    align-items: flex-start;
  }
  .balance {
    align-self: flex-start;
    margin-top: 18px;
    margin-bottom: 25px;

    p {
      color: #222;
      line-height: 1em;
      &:first-child {
        font-size: 45px;
        color: $color-primary;
      }

      &:last-child {
        margin-bottom: 8px;
        margin-left: 6px;
      }
    }
  }
  @media (max-width: 480px) {
    .balance {
      /*align-self: unset;*/
    }
  }
  .balance-text {
    margin-right: 10px
  }
  .balance-amount {

  }
  .income-row {
    min-width: 100px;
    margin-bottom: 10px;
    height: 32px;

    p {
      font-family: 'CA SaygonText', sans-serif;
      font-size: 14px;
      font-weight: 400;
    }

    .income-heading {
      flex: 1;
      margin-right: 20px;
      display: flex;
      align-items: center;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-child(1) {
        width: 15%;
        max-width: 150px;
      }
      &:nth-child(2) {
        width: 15%;
      }
      &:nth-child(3) {
        width: 10%;
        max-width: 60px;
      }
      &:nth-child(4) {
        width: 15%;
        max-width: 200px;
      }
      &:nth-child(5) {
        width: 15%;
        max-width: 120px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title-bar {
    margin-bottom: 16px;
  }
  .income-heading-row {
    margin-bottom: 20px;
    div {
      h3 {
        /*color: #5469d4;*/
        color: $color-primary;
        font-weight: 500;
      }
    }
  }
  .income-heading {
    .with-icon {
      align-self: center;
      justify-self: center;
      text-align: center;
    }
  }
  .icon-product {
    font-size: 24px;
  }

  h2 {

    font-weight: 700;
  }

  .balance, .bottom-section {
    /*padding-left: 19px;*/
    /*padding-right: 19px;*/
  }

  .bottom-section {
    /*padding-top: 20px;*/
    background-color: $light-grey;
  }

  @media (max-width: 980px) {
    .bottom-section {
      margin-bottom: 60px;
    }
  }

  .earned {
    margin-left: 15px;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      font-weight: 600;
      color: $color-primary;
    }
  }

  .mb_y {
    margin-top: 4px;
  }

  .mb_z {
    margin-bottom: 12px;
  }

  .order-number {
    p {
      font-size: 12px;
    }
  }
  .heading-pressed {
    letter-spacing: -0.01em;
  }
  .income-item-meta {
    font-size: 14px;
  }
  .superscript {
    margin-right: .15em;
    vertical-align: super;
    font-size: 60%;
  }
  .each-product-box {
    padding-left: 20px;
    padding-right: 20px;
    p {
      color: $color-background-dark;
    }

    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    .each-product-box {
      flex-wrap: wrap;
     
      .earned {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
      }
    }
  }

  .new-product-icon {
    margin-right: 15px;
    color: $color-primary;
    background-color: $color-background-dark;
    height: 50px;
    width: 50px;
    min-height: 50px;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 34px;
    font-weight: 400;
    /*position: absolute;*/
    /*left: 0;*/
  }
  .active-product-icon {
    color: $color-yellow;
    /*color: #aaa;*/
  }

  .icon-1 {
    display: none;
  }

  $gap: 10px;


  @mixin flex-wrap-fix($flex-basis, $max-viewport-width: 800px) {
    flex-grow: 1;
    flex-basis: $flex-basis;
    max-width: 100%;

    $multiplier: 1;
    $current-width: 0px;

    @while $current-width < $max-viewport-width {
      $current-width: $current-width + $flex-basis;
      $multiplier: $multiplier + 1;

      @media(min-width: $flex-basis * $multiplier) {
        max-width: percentage(1/$multiplier);
      }
    }
  }

  .link-in-bio-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &-wrapper {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      position: relative;
      height: 156px;
    }
    &-item {
      width: calc(100% - 30px);
      margin-left: 30px;
      height: 57px;
      background-color: $color-white;
      border-radius: 14px;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      cursor: pointer;
      max-width: 600px;

      &:hover {
        transform: scale(1.02);

        .item-options {
          transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
          transform: scale(0.98) !important;
        }
      }

      p {
        color: $color-background-dark;
      }

      & > p {
        font-size: 18px;
        text-align: center;
        max-width: calc(100% - 140px);
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .collect-email-title {
        max-width: calc(100% - 180px);
      }

      .list-collect-email {
        & > input, & > button {
          height: 100% !important;
          min-height: 57px;
          margin: 0;
          border: none;
        }

        & > input {
          flex: 1;
          background-color: transparent;
          font-size: 18px;
          font-weight: 600;
        }

        & > button {
          flex: unset;
          width: unset;
          background-color: transparent;
          border-left: 2px solid #000;
          border-radius: 0;
          padding-left: 16px;
          padding-right: 16px;
          min-width: 82px;
        }
      }

      .grid-collect-email {
        flex: 1;
        & > input, & > button {
          height: 100% !important;
          min-height: 57px;
          margin: 0;
          border: none;
        }

        & > input {
          flex: 1;
          background-color: transparent;
          font-size: 18px;
          font-weight: 600;
        }

        & > button {
          flex: unset;
          width: unset;
          background-color: transparent;
          border-left: 2px solid #000;
          border-radius: 0;
          padding-left: 16px;
          padding-right: 16px;
          min-width: 82px;
        }
      }

      @media (max-width: 700px) {
        & > p {
          font-size: 16px;
        }
      }
    }
  }
  /*.link-in-bio-grid {
    z-index: 111;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    gap: 20px;

    &-wrapper {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      height: 156px;
    }

    &-item {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      height: 250px;
      background-color: $color-white;
      cursor: pointer;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

      &-default {
        background-size: 50px;
      }

      &-wrapper {
        &:hover {
          transform: scale(1.02);
        }
        -webkit-box-shadow: 0 0 20px rgba(8, 21, 8, .1);
        box-shadow: 0 0 20px rgba(8, 21, 8, .1);
        width: 250px;
        background-color: #fff;
        border-radius: 14px;
        height: 350px;
        min-height: 350px;
      }

      &-text {
        padding: 6px 6px;
        color: #000;

        p {
          color: #000;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }*/


  $grid-breakpoint-1: 600px;
  $grid-breakpoint-2: 768px;
  $grid-max-width: 1200px;

  $grid-item-wrapper-width-1: calc(50%);
  $grid-item-wrapper-width-2: calc(33.33%);
  $grid-item-wrapper-width-3: calc(25%);
  $grid-item-wrapper-width-4: calc(#{$grid-max-width} / 4);
  $grid-item-wrapper-height-1: calc(50vw - 7.5px);
  $grid-item-wrapper-height-2: calc(33.33vw - 5px);
  $grid-item-wrapper-height-3: calc(25vw - 4px);
  $grid-item-wrapper-height-4: calc(#{$grid-max-width} / 4);
  $grid-additional-height-1: 110px;
  $grid-additional-height-2: 120px;
  $grid-additional-height-3: 130px;
  $grid-additional-height-4: 140px;
  $grid-border-radius-1: 14px;
  $grid-border-radius-2: 14px;
  $grid-border-radius-3: 14px;

  $grid-gap-1: 10px;
  $grid-gap-2: 15px;
  $grid-gap-3: 20px;

  $grid-padding-1: 10px;
  $grid-padding-2: 15px;
  $grid-padding-3: 20px;


  .link-in-bio-grid {
    z-index: 111;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    gap: $grid-gap-1;
    padding-left: $grid-padding-1;
    padding-right: $grid-padding-1;

    &-wrapper {
      width: 100%;
      max-width: $grid-max-width;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    &-item {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: $color-white;
      cursor: pointer;
      height: calc(#{$grid-item-wrapper-height-1} - 20px);
      min-height: calc(#{$grid-item-wrapper-height-1} - 20px);
      max-height: calc(#{$grid-item-wrapper-height-1} - 20px);
      border-radius: $grid-border-radius-1;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

      &-default {
        background-size: 50px;
      }


      &-wrapper {
        &:hover {
          transform: scale(1.02);
        }
        -webkit-box-shadow: 0 0 20px rgba(8, 21, 8, .1);
        box-shadow: 0 0 20px rgba(8, 21, 8, .1);
        background-color: #fff;
        border-radius: $grid-border-radius-1;
        width: calc(#{$grid-item-wrapper-width-1} - #{$grid-gap-1}/2);
        height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1}/2 - #{$grid-padding-1} + #{$grid-additional-height-1});
      
        .collect-email-title {
          max-width: calc(100% - 180px);
        }

        .grid-collect-email {
          flex: 1;
          & > input, & > button {
            height: 100% !important;
            min-height: 57px;
            margin: 0;
            border: none;
          }

          & > input {
            flex: 1;
            background-color: transparent;
            font-size: 18px;
            font-weight: 600;
          }

          & > button {
            flex: unset;
            width: 100%;
            background-color: transparent;
            border-top: 2px solid #000;
            border-radius: 0;
            padding-left: 16px;
            padding-right: 16px;
            height: 60px !important;
          }
        }
      }

      &-text {
        padding: 10px 10px;
        color: #000;

        p {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          /*text-align: center;*/
        }
      }
    }
  }

  @media (min-width: $grid-breakpoint-1) {
    .link-in-bio-grid {
      padding-left: $grid-padding-2;
      padding-right: $grid-padding-2;
      gap: $grid-gap-2;

      &-item {
        height: calc(#{$grid-item-wrapper-height-2} - 20px);
        min-height: calc(#{$grid-item-wrapper-height-2} - 20px);
        max-height: calc(#{$grid-item-wrapper-height-2} - 20px);
      /*border-radius: $grid-border-radius-2;*/
      /*border-top-left-radius: $grid-border-radius-2;*/
      /*border-top-right-radius: $grid-border-radius-2;*/

        &-wrapper {
          /*border-radius: $grid-border-radius-2;*/
          width: calc(#{$grid-item-wrapper-width-2} - #{$grid-gap-2}*(2/3));
          height: calc(#{$grid-item-wrapper-height-2} - #{$grid-gap-2}*(2/3) - #{$grid-padding-2}*(2/3) + #{$grid-additional-height-2});
        }
      }
    }
  }
  @media (min-width: $grid-breakpoint-2) {
    .link-in-bio-grid {
      padding-left: $grid-padding-3;
      padding-right: $grid-padding-3;
      gap: $grid-gap-3;

      &-item {
        height: calc(#{$grid-item-wrapper-height-3} - 20px);
        min-height: calc(#{$grid-item-wrapper-height-3} - 20px);
        max-height: calc(#{$grid-item-wrapper-height-3} - 20px);

        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-3} - #{$grid-gap-3}*(3/4));
          height: calc(#{$grid-item-wrapper-height-3} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4) + #{$grid-additional-height-3});
        }
      }
    }

  }
  @media (min-width: calc(#{$grid-max-width} + 2 * #{$grid-padding-3})) {
    .link-in-bio-grid {

      &-item {
      height: $grid-item-wrapper-height-4;
      min-height: $grid-item-wrapper-height-4;
      max-height: $grid-item-wrapper-height-4;

        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4));
          height: calc(#{$grid-item-wrapper-height-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4) + #{$grid-additional-height-4});
        }
      }
    }
  }

  .copy-link {
    color: $color-primary;
    border: 1px solid $color-primary;
    padding: 2px;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;

    &:hover {
      background-color: $color-primary;
      color: $color-white;
    }
  }
  .p2 {
    padding-left: 5px;
    padding-right: 5px;
  }
  .add-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF99;
    z-index: 1;
  }
  .add-grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF99;
  }
  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    height: 106px;
    width: 106px;
    /*opacity: 0.6;*/
    border: 2px solid #000;
    background-color: #eaeaea;
  }

  @media (max-width: 800px) {
    .profile-image {
      width: 96px;
      height: 96px;
    }
  }
  .fz20p {
    font-size: 20px;
  }
  .fz22p {
    font-size: 22px;
  }
  .mt__ {
    margin-top: 18px;
  }

  .list-item-image {
    position: absolute;
    height: 40px;
    width: 40px;
    object-fit: cover;
    object-position: center;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .list-item-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .grid-item-icon {
    font-size: 20px;
    /*position: absolute;*/
    /*left: 10px;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
  }

  .fz__ {
    font-size: 14px;
  }

  .add-icon {
    width: 30px;
  }

  .add-icon-2 {
    width: 28px;
  }

  .ml__ {
    margin-left: 8px;
  }
  .w400max {
    max-width: 400px;
  }
  .disabled-save {
    opacity: 0.5;
  }
  .checking {
    position: absolute;
    width: 20px;
    right: -28px;
    top: 50%;
    transform: translateY(-50%);
  }
  .mb0 {
    margin-bottom: 0 !important;
  }
  .check-ok {
    width: 16px;
  }
  .spinner-2 {
    width: 16px;
    pointer-events: none;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  .username-not-available {
    font-size: 14px;
    color: $color-background-dark;
    margin-top: 5px;
  }
  .fz20p {
    font-size: 20px;
  }
  .fz22p {
    font-size: 22px;
  }
  .mt__ {
    margin-top: 8px;
  }

  .list-item-image {
    position: absolute;
    height: 40px;
    width: 40px;
    object-fit: cover;
    object-position: center;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .list-item-button {
    position: absolute;
    right: 55px;
    top: 50%;
    transform: translateY(-50%);
    min-width: unset;
  }
  .more-icon {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ddd;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
  .more-icon-grid {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    transform: translateY(-50%);
    background-color: #ddd;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
  .profile-banner {
    width: calc(100% + 38px);
    transform: translateX(-19px);
    height: 100%;
    min-height: 100vh;
    margin-top: 30px;
    margin-bottom: 85px;
    background-size: cover;
    border-radius: 14px;
    z-index: 1;
    /*border-bottom-left-radius: 14px;*/
    /*border-bottom-right-radius: 14px;*/
  }
  .profile-banner-background {
    position: absolute;
    width: calc(100% + 38px);
    transform: translateX(-19px);
    height: 100%;
    min-height: 100vh;
    z-index: 0;
  }
  .z2 {
    z-index: 2;
    position: absolute;
    left: 50%;
    /*top: 50%;*/
    top: 170px;
    transform: translate(-50%, -50%);
  }
  .hr_ {
    width: 100%;
    height: 1px;
    border: none;
    background-color: #333;
  }
  .dont-show {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .change-banner {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .change-photo {
    position: absolute;
    left: calc(50% + 65px);
    top: 150px;
  }
  .change-edit-photo {
    font-size: 20px;
    position: absolute;
    left: calc(50% + 30px);
    top: 80px;
    color: #000;
    background-color: #eee;
    border-radius: 50%;
    border: 1px solid #eee;
    color: #333;
    z-index: 6;
    opacity: 0.7;
    cursor: pointer;
  }

  .add-item-popup {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;

    &-inner {

      p {

      }
    }

    &-wrapper {
      position: fixed;
      left: 250px;
      top: 0;
      width: calc(100% - 250px);
      height: 100vh;
      background-color: #00000033;
      z-index: 125;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 980px) {
      .add-item-popup {
        &-wrapper {
          left: 0;
          padding-left: 0;
          width: 100%;
        }
      }
  }

  @media (max-width: 680px) {
      .add-item-popup {
        max-width: unset;
        height: 100%;
        border-radius: 0;
        padding-top: $header-height;
        &-wrapper {
          padding-left: 0;
        }
      }
  }

  .postable {
    display: table !important;
  }
  .my-products {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
  }
  .my-products, .custom-link {
    margin-left: 10px;
  }
  .popup-select-radio {
    width: 20px;
    input {
      margin: 0;
    }
  }
  .disabled-1 {
    opacity: 0.4;
  }
  .or-add-type {
    width: 100%;
    text-align: center;
    color: $color-background-dark;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mw_ {
    max-width: 100px;
  }
  .cancel-button {
    color: $color-background-dark !important;
    font-size: 12px;
    font-weight: 400;
  }
  .item-options {
    width: 200px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .1);
    box-shadow: 0 0 20px rgba(8, 21, 66, .1);
    /*z-index: 11;*/

    &:hover {
      -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .15);
      box-shadow: 0 0 20px rgba(8, 21, 66, .15);
    }

    a {
      font-size: 16px;
      color: $color-background-dark;
    }
  }
  .inside-ellipsis {

  }

  @media (max-width: 600px) {
    .flex-res {
      flex-direction: column;
      align-items: flex-start;
      & > div {
        margin-top: 5px;

        a {
          margin-left: 0;
          margin-right: 15px;
        }
      }
    }
  }
  .save-product-error {
    color: $color-secondary;
  }
  .add-product {
    color: $color-primary;
    font-weight: 500;
    text-decoration: underline;
  }
  .new-product-text {
    font-size: 18px;
  }
  .display-options, .profile-options {

    i {
      color: $color-background-dark !important;;
    }

    h4 {
      border-color: $color-background-dark !important;
      &:hover {
          border-color: $color-primary !important;
          i {
            /*color: $color-white !important;;*/
          }
      }
    }

  }
  .display-options {
    position: absolute;
    top: 16px;
    /*right: 19px;*/
    right: 0;
    z-index: 5;
  }
  .profile-options {
    position: absolute;
    top: 16px;
    /*left: 19px;*/
    left: 0;
    z-index: 5;
  }
  /*@media (max-width: 800px) {*/
  .profile-banner {
    position: absolute;
    height: 100vh;
    border-radius: 0;
    margin-top: 0;
    /*border-bottom-left-radius: 14px;*/
    /*border-bottom-right-radius: 14px;*/
  }
  .link-in-bio-list, .link-in-bio-grid {
    z-index: 15;
    margin-top: 320px;

    &-wrapper {
      max-width: unset;
    }
  }
  .link-in-bio-list {
    padding-left: 30px;
    padding-right: 30px;
  }
  .default {
    margin-left: 10px;
    color: $color-background-dark;
  }
  .set-view {
    position: absolute;
    top: 35px;
    right: 0px;
    font-size: 14px;
    color: $color-background-dark;
  }
  .new-image {
    img {
      width: 100px;
      height: 70px;
      object-fit: cover;
      border-radius: 6px;
      margin-top: 10px;
      margin-bottom: 5px;
      /*margin-right: 20px;*/
    }
  }

  @media (max-width: 600px) {
    .change-banner {
      top: 80px;
    }
    .change-photo {
      top: 120px;
      left: 20px;
    }
    .z2 {
      top: 240px;   
    }
  }
  .fz14i {
    font-size: 14px !important;
  }
  @media(max-width: 480px) {
    .res_ {
      display: none;
    }
  }
  .overlay {
    z-index: 4;
    position: relative;
    width: 100%;

    & > * {
      z-index: 1;
    }

    &::before {
      content: ' ';
      position: absolute;
      width: calc(100% + 40px);
      height: 100%;
      left: -20px;
      bottom: 0;
      background-color: #fafafa;
      z-index: 0;
    }
  }
  .controls {
    z-index: 4;
    position: relative;
    width: 100%;
    padding-bottom: 20px;

    & > * {
      z-index: 1;
    }

    &::before {
      content: ' ';
      position: absolute;
      width: calc(100% + 40px);
      height: 100%;
      left: -20px;
      bottom: 0;
      background-color: #fafafa;
      z-index: 0;
    }
  }
  .fade-background, .choose-theme {
    max-width: 400px;
  }
  .themes {
    .theme {
      cursor: pointer;
      -webkit-box-shadow: 0 1px 4px rgba(21, 21, 21, .25);
      box-shadow: 0 1px 4px rgba(21, 21, 21, .25);
      border-radius: 6px;
      flex: 1;

      .theme-background {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 30px;
        border-radius: 6px;
        border: 1px solid #00000088;
      }

      .theme-button {
        width: 100px;
        height: 40px;
        border-radius: 60px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      p {
        font-size: 16px;
        font-weight: 600;
      }

      &.light-theme {
        .theme-background {
          background-color: #fff;
        }
        .theme-button {
          border-color: #fff;
          background-color: #000;
        }
        p {
          color: #fff;
        }
      }

      &.dark-theme {
        .theme-background {
          background-color: #000;
        }
        .theme-button {
          border-color: #000;
          background-color: #fff;
        }
        p {
          color: #000;
        }
      }

      &.selected-theme {
        .theme-background {
          border-color: $color-primary;
          /*border-width: 2px;*/
        }
      }
    }
  }
  .zx {
    transform: translateY(2px);
  }

  .theme-0 {
    .link-in-bio-list-item, .link-in-bio-grid-item {
      background-color: #444;
      p, i {
        color: #fff;
      }
    }
    .add-list-item, .add-grid-item {
      background-color: #00000088;
    }
    .link-in-bio-grid-item-wrapper {
      background: none;
      border: 2px solid #000;
      padding: 6px;
    }
    .link-in-bio-grid-item-text {
      p {
        color: #000;
      }
    }
    .text-block {
      p {
        color: #000 !important;
      }
    }
    .submit-email {
      color: #fff;
    }
  }

  .theme-1 {
    .submit-email-grid {
      color: #fff !important;
      border-color: #fff !important;
    }
    .your-email-grid {
      color: #fff !important;
    }

    .username-display, .set-view {
      color: #fff;
    }
    .display-options, .profile-options {
      h4, p, i {
        border-color: #fff !important;
        color: #fff !important;
      }
    }
    .profile-image {
      border-color: #fff;
    }
    .link-in-bio-grid-item-wrapper {
        /*background-color: #444;*/
      background: none;
      border: 2px solid #fff;
      padding: 6px;
    }
    .link-in-bio-grid-item-text {
      p {
        color: #fff;
      }
    }
    .add-grid-item {
      p, i {
        color: #fff;
      }
    }
    .submit-email {
      color: #000;
    }
  }
  .text-block {
    background-color: transparent !important;
    p {
      font-size: 20px;
    }
  }
  .text-block {
    background-color: transparent !important;
    p {
      font-size: 20px;
    }
  }
  .color-white {
    color: $color-white !important;
  }
  .views-count {
    font-size: 14px;
    color: #888;
  }
  .item-views-count {
    position: absolute;
    left: 15px;
    top: 15px;
  }
  .item-views-count-list {
    color: #888 !important;
    position: absolute;
    left: -35px;
    top: 50%;
    margin: 0 !important;
    font-size: 12px !important;
    color: #ddd !important;
    transform: translateY(-50%);
  }
  .only-text-block {
    width: 100%;
    height: 40px !important;
    min-height: 40px !important;
    background-color: transparent !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border-color: transparent !important;

    .text-block {
      min-height: unset;
      max-height: unset;
    }

    .link-in-bio-grid-item-text {
      display: none;
      /*height: 40px !important;*/
      /*min-height: 40px !important;*/
      /*max-height: 40px !important;*/
    }

    .more-icon-grid {
      /*display: none;*/
    }

    .link-in-bio-grid-item {
      height: 100%;
    }
  }
  @media (max-width: 768px) {
    .link-in-bio-list {
      padding-left: 0;
      padding-right: 0;
    }
  }
  /*}*/
</style>
