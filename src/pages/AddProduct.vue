<template>
  <div class="product-wrapper minh df fdc aic jcc f1 w100p" v-if="deleted">
    This product has been deleted
  </div>
  <div class="product-wrapper df fdc aic f1 w100p" v-else>

    <div class="full-screen-select" v-if="addCustomTimeSlot" @click="stopAddingCustomTimeSlot()">
      <div class="options-box" @click="stopProp($event)">
        <i class="fa-solid fa-x close-custom-menu" @click="stopAddingCustomTimeSlot()"></i>
        <h2>Add time slot</h2>
        <div class="w100p df fdc">
          <div class="slot-type w100p df aic">
            <input class="type-select" type="radio" name="">
            <select :model="addTimeSelected">
              <option :value="5">5 minutes</option>
              <option :value="10">10 minutes</option>
              <option :value="15">15 minutes</option>
              <option :value="20">20 minutes</option>
              <option :value="25">25 minutes</option>
              <option :value="30">30 minutes</option>
              <option :value="35">35 minutes</option>
              <option :value="40">40 minutes</option>
              <option :value="45">45 minutes</option>
              <option :value="50">50 minutes</option>
              <option :value="55">55 minutes</option>
              <option :value="60">1 hour</option>
              <option :value="90">90 minutes</option>
              <option :value="120">2 hours</option>
              <option :value="180">3 hours</option>
              <option :value="240">4 hours</option>
              <option :value="300">5 hours</option>
              <option :value="360">6 hours</option>
              <option :value="420">7 hours</option>
              <option :value="480">8 hours</option>
              <option :value="540">9 hours</option>
              <option :value="600">10 hours</option>
              <option :value="660">11 hours</option>
              <option :value="720">12 hours</option>
              <option :value="1440">24 hours</option>
            </select>
          </div>
          <div class="slot-type w100p df aic">
            <input class="type-select" type="radio" name="">
            <input class="type-custom" type="text" name="">
          </div>
        </div>

        <button class="button-1 button-smaller">Add</button>
      </div>
    </div>

    <!-- <div class="w100p df jcfs aic title-bar">
      <img @click="goTo('/products')" class="go-back-to-my-products" src="../../static/images/back.svg"> 
      <div class="df fdc">
        <h2 v-if="!uniqueProductId">New {{productTypeDisplay()}}</h2>
        <h2 v-if="uniqueProductId">{{heading}}</h2>
        <div v-if="uniqueProductId" class="df aic sub-heading-wrapper">
          <i v-if="productType == 'digital-download'" class="new-product-icon fal fa-arrow-to-bottom"></i>
          <i v-if="productType == 'digital-service'" class="new-product-icon fal fa-concierge-bell"></i>
          <i v-if="productType == 'calendar-event'" class="new-product-icon fal fa-calendar"></i>
          <p class="sub-heading">{{productTypeDisplay()}}</p>
        </div>
      </div>
    </div> -->
    <!-- <div class="w100p _position1 df jcsb aic">
      <div class="breadcrumb df">
        <h2 class="breadcrumb-other" @click="goTo('/me')">Home</h2>
        <h2 class="breadcrumb-separator">/</h2>
        <h2>{{newOrEdit()}} {{productTypeDisplay()}}</h2>
      </div>


      <div class="previews df jcsb aic">
        <div class="df" v-if="uniqueProductId">
          <a>URL:&nbsp;</a>
          <a :href="'http://localhost:8080/pay/' + uniqueProductId" target="_blank">/pay/{{uniqueProductId}}</a>
        </div>
        <div class="df" v-else>
          <a>Save this product to get your live URL</a>
        </div>
        <a>Preview:</a>
        <p>(PHONE)</p>
        <p>(COMP)</p>
        <p>(TAB)</p>
      </div>
    </div> -->
    <div class="top-bar-global w100p df jcsb aic position2x">
      <!-- <img @click="goTo('/products')" class="go-back-to-my-products curp" src="../../static/images/back.svg" > -->
      <div @click="goTo('/products')" class="df aic curp">
        <i class="fa-solid fa-arrow-left header-style-back"></i>
        <i class="fa-solid fa-pipe pipe" v-if="heading"></i>
      </div>
      <h2 class="text-dark header-style header-style-big no-all-cap">{{heading}}&nbsp;</h2>

      <!-- <div @click="goTo('/products')" class="df aic curp">
        <i class="fa-solid fa-arrow-left header-style-back"></i>
        <i class="fa-solid fa-pipe pipe"></i>
      </div> -->
      <!-- <h4 class="m0">
        {{heading}}
      </h4> -->
      <div class="f1"></div>
      <!-- <a v-if="uniqueProductId" class="copy-link" @click="copyLink($event, rootDomain + '/pay/' + uniqueProductId)">copy link</a> -->

      <a v-if="uniqueProductId" class="copy-link copy-link-1" @click="copyLink($event, rootDomain + '/' + myDisplayName() + '/' + uniqueProductId)">
        <i class="fa-solid fa-link link-icon ml5 mr5"></i>
        copy link
      </a>
    </div>

    <div class="product-detail-tabs df w100p">
      <div class="product-detail-tabs-tab df fdc f1 curp"
       v-bind:class="{
        'product-detail-tabs-tab-active': currentTab == 'product'
      }" @click="goToTab('product')">
        <a>
          Product Details
        </a>
      </div>
      <div class="product-detail-tabs-tab df fdc f1 curp" 
            v-bind:class="{
              'product-detail-tabs-tab-active': currentTab == 'fulfillment'
            }" @click="goToTab('fulfillment')">
        <a>
          Fulfillment
        </a>
      </div>
    </div>
    <div class="product-detail-box w100p df fdc w2">
      <div class="digital-download-details df jcsb aifs f1">
            <div class="w100p df fdc jcfe aifs f1" v-if="currentTab == 'description'">
              <div v-if="productImageUrl" class="one-input mt5i">
                <p class="reverse-color">Thumbnail</p>
                <div class="w100p posrel">
                  <vue-dropzone ref="myVueDropzone" 
                          id="dropzone-a"
                          class="dropzone dropzone-2 w100p"
                          @vdropzone-file-added="uploadedProductImage"
                          :options="dropzoneOptions">
                  </vue-dropzone>
                  <div class="dropzone-overlay">
                    <div class="w100p df fdc">
                      <img class="dropzone-image" :src="productImageUrl">
                      <p class="dropzone-file-text">Drag image here to replace or <span>browse</span></p>
                      <p class="dropzone-file-text"><span @click="removeProductImage($event)">Delete product image</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="one-input mt5i">
                <p class="reverse-color">Thumbnail</p>
                <div class="w100p posrel">
                  <vue-dropzone ref="myVueDropzone" 
                          id="dropzone-a"
                          class="dropzone w100p"
                          @vdropzone-file-added="uploadedProductImage"
                          :options="dropzoneOptions">
                  </vue-dropzone>
                  <div class="dropzone-overlay">
                    <div class="df fdc">
                      <img class="dropzone-file-placeholder" src="../../static/images/special-agent-v1/icon-image-placeholder.svg">
                      <p class="dropzone-file-text">Drag image here or <span>browse</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="uploadingImage" class="upload-status mt15" :class="{
                'image-upload-success': uploadingImage == 2
              }">
                <img v-if="uploadingImage == 2" class="dropzone-file-placeholder no-spin" src="../../static/images/special-agent-v1/icon-loading-success.svg">
                <img v-else class="dropzone-file-placeholder" src="../../static/images/special-agent-v1/icon-loading-spinner-1.png">
                <p class="dropzone-file-text" v-if="uploadingImage == 2">Upload successful!</p>
                <p class="dropzone-file-text" v-else>Uploading...</p>
              </div>
              <div class="one-input">
                <p class="reverse-color">Full Description</p>
                <wysiwyg v-model="description" class="wysiwyg" />
              </div>
            </div>

        <!-- <div v-if="productImageUrl" class="dropzone-wrapper image-dropzone-wrapper posrel df fdc aic jcc">
          <img class="image-uploaded" :src="productImageUrl">
          <a class="w100p tac image-uploaded-under" @click="removeProductImage()">Remove Image</a>
        </div>
        <div v-else class="dropzone-wrapper image-dropzone-wrapper posrel">
          <vue-dropzone ref="myVueDropzone" 
                  id="dropzone-a"
                  class="image-upload"
                  @vdropzone-file-added="uploadedProductImage"
                  :options="dropzoneOptions">
          </vue-dropzone>
          <div class="dropzone-overlay df fdc">
            <p>Drag Image Here</p>
            <p>or</p>
            <a class="button-b df aic jcc">Upload File</a>
          </div>
        </div> -->
        <div class="product-basics f1 df fdc">
          <div v-if="currentTab == 'product'" class="df fdc w100p minw">
            <!-- <div class="df w100p jcsb product-detail-outer" v-if="$store.getters['AUTH.isProUser']"> -->
            <div class="df w100p jcsb product-detail-outer">
              <div class="product-detail" :class="{'mr0': productType == 'subscription-physical-product'}">
                <h4>Heading</h4>
                <input placeholder="Product Heading" v-model="heading" type="" name="">
              </div>
              <!-- <div class="product-detail" v-if="productType !== 'subscription-physical-product'"> -->
              <div class="product-detail">
                <div class="df aic spec">
                  <h4 class="curp" :class="{'disabled-1': freeProduct}" @click="toggleFree(false)">Price</h4>
                  <h4 class="or-free disabled-1">or</h4>
                  <div class="f1 df" :class="{'disabled-1': !freeProduct}">
                    <h4 class="curp" @click="toggleFree(true)">Free</h4>
                    <input @change="adjustPrice()" v-model="freeProduct" type="checkbox" class="check-fulfillment-box i32 curp" name="">
                  </div>
                </div>
                <div class="df" :class="{'disabled-1': freeProduct}">
                  <input v-if="freeProduct" min="0" placeholder="$0.00" step="0.01" v-model="price" @click="toggleFree(false)" type="number" name="">
                  <input v-else min="0.99" placeholder="$0.00" step="0.01" @change="checkPrice($event)" v-model="price" @click="toggleFree(false)" type="number" name="">
                </div>
              </div>
            </div>
            <!-- <div class="product-detail v-else">
              <h4>Heading</h4>
              <input placeholder="Product Heading" v-model="heading" type="" name="">
            </div> -->
            <div class="product-detail">
              <h4>Image</h4>
              <div class="w100p df fdc jcfe aifs f1">
                <div v-if="productImageUrl" class="w100p one-input mt5i">
                  <!-- <p class="reverse-color">Thumbnail</p> -->
                  <div class="w100p posrel">
                    <vue-dropzone ref="myVueDropzone" 
                            id="dropzone-a"
                            class="dropzone dropzone-2 w100p"
                            @vdropzone-file-added="uploadedProductImage"
                            :options="dropzoneOptions">
                    </vue-dropzone>
                    <div class="dropzone-overlay">
                      <div class="df fdc">
                        <img class="dropzone-image" :src="productImageUrl">
                        <p class="dropzone-file-text as-button">Drag image here to replace or <span>browse</span></p>
                        <!-- <p class="dropzone-file-text"><span @click="removeProductImage($event)">Delete product image</span></p> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="w100p one-input mt5i">
                  <!-- <p class="reverse-color">Thumbnail</p> -->
                  <div class="w100p posrel">
                    <vue-dropzone ref="myVueDropzone" 
                            id="dropzone-a"
                            class="dropzone w100p"
                            @vdropzone-file-added="uploadedProductImage"
                            :options="dropzoneOptions">
                    </vue-dropzone>
                    <div class="dropzone-overlay">
                      <div class="df fdc">
                        <img class="dropzone-file-placeholder" src="../../static/images/special-agent-v1/icon-image-placeholder.svg">
                        <p class="dropzone-file-text">Drag image here or <span>browse</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="uploadingImage" class="upload-status mt15" :class="{
                  'image-upload-success': uploadingImage == 2
                }">
                  <img v-if="uploadingImage == 2" class="dropzone-file-placeholder no-spin" src="../../static/images/special-agent-v1/icon-loading-success.svg">
                  <img v-else class="dropzone-file-placeholder" src="../../static/images/special-agent-v1/icon-loading-spinner-1.png">
                  <p class="dropzone-file-text" v-if="uploadingImage == 2">Upload successful!</p>
                  <p class="dropzone-file-text" v-else>Uploading...</p>
                </div>
                <!-- <div class="one-input">
                  <p class="reverse-color">Full Description</p>
                  <wysiwyg v-model="description" class="wysiwyg" />
                </div> -->
              </div>
            </div>
            <div class="product-detail f1 df fdc">
              <h4>Description</h4>
              <textarea placeholder="Describe the product" v-model="description" :maxlength="maxlength" class="f1"></textarea>
            </div>
            <div class="product-detail">
              <h4>Secondary Heading</h4>
              <input placeholder="Secondary Heading" v-model="secondaryHeading" type="" name="">
            </div>
            <div class="product-detail">
              <h4>Call To Action Text</h4>
              <input placeholder="Call To Action" v-model="callToActionText" type="" name="">
            </div>
            <!-- <div class="product-detail" v-if="!$store.getters['AUTH.isProUser']">
              <h4>Price</h4>
              <div class="df">
                <input placeholder="0.00" step="0.01" @change="changePrice($event)" v-model="price" type="number" name="">
              </div>
            </div> -->
          </div>
          <div v-if="currentTab == 'fulfillment'" class="df fdc w100p minw">
            
            <!-- DOWNLOAD -->
            <div class="product-detail df" v-if="productType == 'digital-download'">
              <div class="check-fulfillment">
                <input v-model="addFile" type="checkbox" class="check-fulfillment-box" name="">
              </div>
              <div class="check-detail f1">
                <h4>Send File</h4>
                <p class="sub-line text-dark">Files will be sent automatically after purchase</p>
                <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper posrel">
                  <div class="df fdc aic jcc">
                    <img class="file-icon" src="../../static/images/file-icon.png">
                    <p class="file-text">
                      {{productDeliveryFile.name}}
                    </p>
                    <a class="file-remove-text" @click="removeProductDeliveryFile()">Remove File</a>
                  </div>
                </div>
                <div v-else class="dropzone-wrapper posrel">
                  <vue-dropzone ref="myVueDropzone" 
                          id="dropzone"
                          class="file-upload"
                          @vdropzone-file-added="uploadedProductDeliveryFile"
                          :options="dropzoneOptions2">
                  </vue-dropzone>
                  <div class="dropzone-overlay df fdc">
                    <p>Drag File Here</p>
                    <p>or</p>
                    <a class="button-b df aic jcc">Upload File</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- CALENDAR EVENT -->
            <div v-if="productType == 'calendar-event'" class="w100p product-detail df fdc">
              <div class="product-detail df product-detail-responsive mb0i">
                <div class="check-detail max-detail f2">
                  <h4>Time zone</h4>
                  <div class="posrel df aic">
                    <p class="text-dark select-as-text-visible">
                      {{myTimezone.substring(12, myTimezone.length)}}
                    </p>
                    <i class="fa-solid fa-chevron-down select-as-text-visible-chevron"></i>
                    <select v-model="myTimezone" class="select-as-text">
                      <option v-for="(item, i) in allTimezones" :label="item.label" :value="item.label">
                        {{item}}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <hr class="fulfillment-hr"/>
              <div class="check-detail f1">
                <h4>set your weekly hours</h4>
                <!-- <p class="sub-line text-dark">When would you like to take this appointment?</p> -->
                <div class="my-availability df fdc">
                  <div class="one-day df jcsb w100p aic" v-for="(day, i) in [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ]">
                    <p class="f1 w100p text-dark">{{day}}</p>
                    <div class="time-select df aic">
                      <p class="text-dark">From</p>
                      <select v-model="calendarFrom[i]" class="r0 r1">
                        <option>12 am</option>
                        <option>1 am</option>
                        <option>2 am</option>
                        <option>3 am</option>
                        <option>4 am</option>
                        <option>5 am</option>
                        <option>6 am</option>
                        <option>7 am</option>
                        <option>8 am</option>
                        <option>9 am</option>
                        <option>10 am</option>
                        <option>11 am</option>
                        <option>12 pm</option>
                        <option>1 pm</option>
                        <option>2 pm</option>
                        <option>3 pm</option>
                        <option>4 pm</option>
                        <option>5 pm</option>
                        <option>6 pm</option>
                        <option>7 pm</option>
                        <option>8 pm</option>
                        <option>9 pm</option>
                        <option>10 pm</option>
                        <option>11 pm</option>
                      </select>
                      <p>to</p>
                      <select v-model="calendarTo[i]" class="r1">
                        <option>12 am</option>
                        <option>1 am</option>
                        <option>2 am</option>
                        <option>3 am</option>
                        <option>4 am</option>
                        <option>5 am</option>
                        <option>6 am</option>
                        <option>7 am</option>
                        <option>8 am</option>
                        <option>9 am</option>
                        <option>10 am</option>
                        <option>11 am</option>
                        <option>12 pm</option>
                        <option>1 pm</option>
                        <option>2 pm</option>
                        <option>3 pm</option>
                        <option>4 pm</option>
                        <option>5 pm</option>
                        <option>6 pm</option>
                        <option>7 pm</option>
                        <option>8 pm</option>
                        <option>9 pm</option>
                        <option>10 pm</option>
                        <option>11 pm</option>
                      </select>
                    </div>

                    <div class="df">
                      <input type="time" name="">
                      <input type="time" name="">
                    </div>
                  </div>
                </div>
                <!-- <input placeholder="http://" v-model="redirectURL" class="mw2" type="" name=""> -->
              </div>
              <div class="product-detail df product-detail-responsive">
                <div class="check-detail f1">
                  <h4>Appointment Length</h4>
                  <div class="appointment-length-options-2 df fww">
                    <span v-for="(time, t) in appointmentLengths"
                      class="df aic appointment-length-2 appointment-length-selected">
                      <p class="f1">
                        {{time}} minutes
                      </p>
                      <i class="fa-solid fa-x remove-time-option" @click="toggleAppointmentLength(time)"></i>
                    </span>
                    <span
                      class="df aic appointment-length-2 appointment-length-selected appointment-add-time"
                      @click="startAddingCustomTimeSlot()">
                      <i class="fa-solid fa-plus add-time-option"></i>
                      <p>
                        add
                      </p>
                    </span>
                  </div>
                  <!-- <div class="appointment-length-options df fdc">
                    <span
                      class="df aic appointment-length"
                      :class="{'appointment-length-selected': appointmentLengths.indexOf(15) > -1}"
                      @click="toggleAppointmentLength(15)">
                      <input type="checkbox" name="">
                      <p class="f1">
                        15 minutes
                      </p>
                    </span>
                    <span
                      class="df aic appointment-length"
                      :class="{'appointment-length-selected': appointmentLengths.indexOf(30) > -1}"
                      @click="toggleAppointmentLength(30)">
                      <input type="checkbox" name="">
                      <p class="f1">
                        30 minutes
                      </p>
                    </span>
                    <span
                      class="df aic appointment-length"
                      :class="{'appointment-length-selected': appointmentLengths.indexOf(60) > -1}"
                      @click="toggleAppointmentLength(60)">
                      <input type="checkbox" name="">
                      <p class="f1">
                        1 hour
                      </p>
                    </span>
                    <span
                      class="df aic appointment-length"
                      :class="{'appointment-length-selected': appointmentLengths.indexOf(90) > -1}"
                      @click="toggleAppointmentLength(90)">
                      <input type="checkbox" name="">
                      <p class="f1">
                        90 minutes
                      </p>
                    </span>
                  </div> -->
                </div>
              </div>
            </div>

            <!-- PHYSICAL PRODUCT SUBSCRIPTION -->
            <div v-if="productType == 'subscription-physical-product'" class="w100p df jcsb aic mb15">
              <h3 class="m___">Subscription Items</h3>
              <a class="text-primary-color add-size" @click="addSubscriptionItem()">add item</a>
            </div>
            <div v-if="productType == 'subscription-physical-product'" class="w100p df jcsb aic mb15">
              <div class="w100p subscription-physical-product-items">
              <VueSlickCarousel
                  class="w100p"
                  :key="carouselKey + '-b'"
                  :slidesPerRow="1"
                  :draggable="false"
                  :arrows="true">
                <div key="o" v-for="(oneProduct, o) in subscriptionProducts" class="w100p one-psubscription-product">
                  <div class="product-detail m__">
                    <h4>Item Name</h4>
                    <input placeholder="Item Name" v-model="oneProduct.name" type="" name="">
                  </div>
                  <div class="product-detail m__">
                    <h4>Item SKU</h4>
                    <input placeholder="Item SKU" v-model="oneProduct.sku" type="" name="">
                  </div>
                  <div class="product-detail m__">
                    <h4>Weight (lb)</h4>
                    <input placeholder="Weight in lb" v-model="oneProduct.weightLb" type="" name="">
                  </div>
                  <div class="product-detail m__">
                    <h4>Image</h4>
                    <input placeholder="Item Image" v-model="oneProduct.image" type="" name="">
                  </div>
                  <div class="product-detail m__">
                    <h4>Price</h4>
                    <input placeholder="Item Price" v-model="oneProduct.price" type="" name="">
                  </div>
                  <div class="size-actions w100p df jcfe aic">
                    <p class="text-dark curp" v-if="subscriptionProducts.length > 1" @click="deleteSubscriptionItem(o)">
                      delete size
                    </p>
                  </div>
                </div>
              </VueSlickCarousel>
              </div>
            </div>
            <div v-if="productType == 'subscription-physical-product'" class="w100p df jcsb aic mb15">
              <div class="w100p df g20 aic">
                <input :class="{'disabled-1': !physicalProductSubscriptionCanBeCustomized}" v-model="physicalProductSubscriptionCanBeCustomized" type="checkbox" class="wun" name="">
                <h4 class="f1 mb0">Allow the customer to select custom quantities</h4>
              </div>
            </div>
            
            <!-- PHYSICAL PRODUCT -->
            <div v-if="productType == 'physical-product'" class="w100p df jcsb aic mb15">
              <h3 class="m___">Sizes</h3>
              <a class="text-primary-color add-size" @click="addSize()">add size</a>
            </div>
            <div v-if="productType == 'physical-product'" class="product-sizes w100p">
              <VueSlickCarousel
                  class="w100p"
                  :key="carouselKey"
                  :slidesPerRow="1"
                  :draggable="false"
                  :arrows="true">
                <div v-for="(size, s) in sizes" :key="s" class="product-size w100p df fdc">
                  <div class="product-detail m__">
                    <h4>Size</h4>
                    <input placeholder="small, medium, etc" v-model="sizes[s].name" type="" name="">
                  </div>

                  <div class="product-detail m__">
                    <h4>Product SKU</h4>
                    <input placeholder="SKU" v-model="sizes[s].productSku" type="" name="">
                  </div>

                  <div class="product-detail m__">
                    <h4>Price</h4>
                    <input placeholder="Price" v-model="sizes[s].price" type="number" name="">
                    <!-- <input placeholder="SKU" v-model="productSku" type="" name=""> -->
                  </div>

                  <div class="df w100p jcsb product-detail-outer">
                    <div v-if="uniqueProductId" class="product-detail m___">
                      <h4>Stock</h4>
                      <input :value="$store.getters['AUTH.inventory'][uniqueProductId]" type="number" name="" @input="updateInventoryCount($event, uniqueProductId)">
                    </div>
                    <div class="product-detail m___">
                      <h4>Weight (lb)</h4>
                      <input placeholder="Weight (lb)" v-model="weightLb" type="" name="">
                    </div>
                  </div>

                  <div class="size-actions w100p df jcfe aic">
                    <p class="text-dark curp" v-if="sizes.length > 1" @click="deleteSize(s)">
                      delete size
                    </p>
                  </div>
                </div>
              </VueSlickCarousel>
            </div>

            <!-- <div v-else-if="(this.productType == 'physical-product')" class="mb20" v-else>
              <p class="text-dark">Save the product to set inventory.</p>
            </div> -->

            <br/>

            <hr class="w100p"/>


            <!-- PHYSICAL PRODUCT SUBSCRIPTION - 2 -->
            <div v-if="productType == 'subscription-physical-product'" class="fulfillment-type w100p df aic g20 mb20">
              <!-- <div class="df curp fullfillment-type-box"
                  :class="{'faded-box': fulfillMyself}"
                  v-if="Object.keys(myShippingRates.zones).length == 0">
                <div class="check-detail f1 df fdc jcc aic">
                  <h4 class="button-1 button-smaller button_ mb0i" @click="startConfigureZones()">enable shipping</h4>
                  <p class="activate-your-network" :class="{'faded': fulfillMyself}">to start selling<br/>physical products</p>
                </div>
              </div> -->
              <div class="df curp fullfillment-type-box"
                  :class="{'faded-box': !fulfillMyself}"
                  @click="setFulfillMyself(true)">
                <div class="check-detail f1" :class="{'faded': !fulfillMyself}">
                  <h4 class="mb0i check-button">I will fulfill this product myself.</h4>
                  <p class="activate-your-network"><span class="faded">Shipping rates can be<br/>set in </span><a class="link" @click="goTo('/shipping')">shipping</a></p>
                </div>
              </div>
              <div class="df curp fullfillment-type-box"
                  :class="{'faded-box': fulfillMyself}">
                <div class="check-detail f1 df fdc jcc aic">
                  <h4 class="button-1 button-smaller button_ mb0i">activate</h4>
                  <p class="activate-your-network" :class="{'faded': fulfillMyself}"> your shipping network<br/>to enable automatic fulfillment.</p>
                </div>
              </div>
            </div>
            <!-- PHYSICAL PRODUCT - 2 -->
            <div class="fulfillment-type w100p df aic g20 mb20">
              <div class="df curp fullfillment-type-box"
                  :class="{'faded-box': fulfillMyself}"
                  v-if="(this.productType == 'physical-product') && (Object.keys(myShippingRates.zones).length == 0)">
                <div class="check-detail f1 df fdc jcc aic">
                  <!-- {{Object.keys(myShippingRates.zones)}} -->
                  <h4 class="button-1 button-smaller button_ mb0i" @click="startConfigureZones()">enable shipping</h4>
                  <p class="activate-your-network" :class="{'faded': fulfillMyself}">to start selling<br/>physical products</p>
                </div>
              </div>
              <div class="df curp fullfillment-type-box"
                  :class="{'faded-box': !fulfillMyself}"
                  v-else-if="this.productType == 'physical-product'"
                  @click="setFulfillMyself(true)">
                <div class="check-detail f1" :class="{'faded': !fulfillMyself}">
                  <h4 class="mb0i check-button">I will fulfill this product myself.</h4>
                  <p class="activate-your-network"><span class="faded">Shipping rates can be<br/>set in </span><a class="link" @click="goTo('/shipping')">shipping</a></p>
                </div>
              </div>
              <div class="df curp fullfillment-type-box"
                  :class="{'faded-box': fulfillMyself}"
                  v-if="this.productType == 'physical-product'">
                <div class="check-detail f1 df fdc jcc aic">
                  <h4 class="button-1 button-smaller button_ mb0i">activate</h4>
                  <p class="activate-your-network" :class="{'faded': fulfillMyself}"> your shipping network<br/>to enable automatic fulfillment.</p>
                </div>
              </div>
            </div>


            <!-- <div class="product-detail df curp" v-if="(this.productType == 'physical-product') && !fulfillMyself" @click="setUseMyShippingNetwork(true)">
              <div class="check-fulfillment" :class="{'faded': !useMyNetwork}">
                <input :checked="useMyNetwork" type="radio" class="check-fulfillment-box" name="">
              </div>
              <div class="check-detail f1" :class="{'faded': !useMyNetwork}">
                <h4>Use my shipping network</h4>
              </div>
            </div>
            <div class="product-detail df curp" v-if="(this.productType == 'physical-product') && !fulfillMyself" @click="setUseMyShippingNetwork(false)">
              <div class="check-fulfillment" :class="{'faded': useMyNetwork}">
                <input :checked="!useMyNetwork" type="radio" class="check-fulfillment-box" name="">
              </div>
              <div class="check-detail f1" :class="{'faded': useMyNetwork}">
                <h4>Select shipping provider</h4>
              </div>
            </div> -->

            <!-- PHYSICAL PRODUCT - 3 -->
            <div class="product-detail df" v-if="(productType == 'physical-product') && !fulfillMyself && !useMyNetwork">
              <!-- <div class="physical-fultillment-options" v-if="fulfillMyself">
              </div> -->
              <div class="physical-fultillment-options w100p">
                <!-- <hr class="w100p"/> -->
                <div class="check-detail f1">
                  <h4>Select your Shipping Provider</h4>
                  <select v-model="fulfillAutomaticallyOptions.shippingProvider" class="w100p">
                    <option :value="provider.provider" v-for="(provider, p) in myShippingProviders">{{provider.provider}} ({{provider.id}})</option>
                  </select>
                  <!--  -->
                  <!-- Track Inventory? -->
                  <!-- Variants? -->
                  <!-- Sizes? ,,, -->
                </div>
              </div>
              <!-- <div class="check-fulfillment">
                <input v-model="addFile" type="checkbox" class="check-fulfillment-box" name="">
              </div>
              <div class="check-detail f1">
                <h4>Send File</h4>
                <p class="sub-line">Files will be sent automatically after purchase</p>
                <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper posrel">
                  <div class="df fdc aic jcc">
                    <img class="file-icon" src="../../static/images/file-icon.png">
                    <p class="file-text">
                      {{productDeliveryFile.name}}
                    </p>
                    <a class="file-remove-text" @click="removeProductDeliveryFile()">Remove File</a>
                  </div>
                </div>
                <div v-else class="dropzone-wrapper posrel">
                  <vue-dropzone ref="myVueDropzone" 
                          id="dropzone"
                          class="file-upload"
                          @vdropzone-file-added="uploadedProductDeliveryFile"
                          :options="dropzoneOptions2">
                  </vue-dropzone>
                  <div class="dropzone-overlay df fdc">
                    <p>Drag File Here</p>
                    <p>or</p>
                    <a class="button-b df aic jcc">Upload File</a>
                  </div>
                </div>
              </div> -->
            </div>

            <!-- FULFILLMENT DETAILS -->
            <!-- <div class="product-detail df w100p" v-if="this.productType == 'physical-product'">
              <div class="physical-fultillment-options w100p" v-if="!fulfillMyself && (fulfillAutomaticallyOptions.shippingProvider == 'Ship My Orders')">
                <div class="check-detail f1">
                  <h4>Ship My Orders ID</h4>
                  <input placeholder="" v-model="fulfillAutomaticallyOptions.smoID" class="w100p mw2" type="" name="">
                </div>
              </div>
            </div> -->

            <hr class="w100p"/>

            <!-- AFTER CHECKOUT -->
            <div class="w100p df fdc product-detail">
              <div class="w100p df g20 aic">
                <input :class="{'disabled-1': !addURL}" v-model="addURL" type="checkbox" class="wun" name="">
                <h4 class="f1 mb0">Send the customer to another webpage after checkout</h4>
              </div>
              <p v-if="!addURL" class="default-action text-dark mt10 fsi disabled-1">The customer will see a receipt by default.</p>
              <div class="product-detail df fdc" v-if="addURL">
                  <p :class="{'disabled-1': !addURL}" class="sub-line text-dark mt15">The customer will be sent to this URL after purchase</p>
                  <input :class="{'disabled-1': !addURL}" placeholder="http://" v-model="redirectURL" class="mw2" type="" name="" @click="setAddUrl(true)">
              </div>
            </div>
          </div>

        <!-- <a class="link link-bigger" :href="buildCustomLink()" target="_blank">{{buildCustomLink()}}</a> -->
        <!-- <div class="share-url share-url-v1 share-url-v3 dis" v-if="uniqueProductId" @click="stopProp($event)">
          <div class="df fdc jcc aic posrel">
            <p class="header tac">Custom Link:</p>
            <a :href="rootDomain + '/pay/' + uniqueProductId" target="_blank">{{rootDomain + '/pay/'}}</a>
            <a :href="rootDomain + '/pay/' + uniqueProductId" target="_blank">{{uniqueProductId}}</a>
            <p class="copied" :class="{'show-copied': showCopied}">
              copied
            </p>
            <a class="f1 df jcfe aic copy" @click="copyLink($event, rootDomain + '/pay/' + uniqueProductId)">copy</a>
          </div>
        </div> -->
        <!-- <div class="df fdc" v-if="uniqueProductId">
              <a>URL:&nbsp;</a>
              <a :href="'http://localhost:8080/pay/' + uniqueProductId" target="_blank">{{'http://localhost:8080/pay/' + uniqueProductId}}</a>
            </div> -->
        </div>
      </div>
    </div>
    <div class="df fdc w100p mt20 minw" v-bind:class="{'saving-now': saving}">
      <p class="save-product-error mb15" v-if="saveProductError">{{saveProductError.message}}</p>
      <div class="product-detail df g20">
        <button class="button-1" v-if="public" @click="saveProduct()">save</button>
        <button class="just-save button-2" v-else @click="saveProduct()">save</button>
        <button class="button-1" @click="saveProduct(true)" v-if="!public">publish</button>
        <button @click="deactivateProduct()" class="button-2" v-else>un-publish</button>
        <!-- {{$store.getters['AUTH.globalPopup']}} -->
      </div>
      <div class="w100p df jcsb mt30" v-bind:class="{'saving-now': saving}">
        <p class="just-save curp" @click="goTo('/products')">cancel</p>
        <p class="just-save fz14 curp" @click="deleteProduct()">delete product</p>
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'
import paths from '@/util/paths'
import products from '@/util/products'
import LandingProduct from '@/components/LandingProduct'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'AddProduct',
  data () {
    return {
      subscriptionProducts: [
        {
          name: '',
          sku: '',
          weightLb: 1,
          image: '',
          price: 9.99
        }
      ],
      physicalProductSubscriptionCanBeCustomized: false,
      carouselKey: 1,
      sizes: [
        {
          name: 'Medium',
          sku: '',
          weightLb: 0
        }        
      ],
      addCustomTimeSlot: false,
      saving: false,
      saveProductError: false,
      freeProduct: false,
      productSku: '',
      weightLb: 0,
      myShippingProviders: {}, // for physical product
      myShippingRates: {}, // for physical product
      fulfillMyself: true, // for physical product
      useMyNetwork: false, // for physical product
      fulfillMyselfOptions: {
        
      }, // for physical product
      fulfillAutomaticallyOptions: {
        smoID: '',
        shippingProvider: ''
      }, // for physical product
      uploadingImage: false,
      currentTab: 'product',
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      maxlength: 200,
      allTimezones: common.timezones,
      myTimezone: '(GMT-05:00) Eastern Time (US & Canada)',
      addTimeSelected: 5,
      appointmentLengths: [15, 30, 60, 90],
      customAppointmentLengths: [],
      appointmentLength: '15 minutes',
      calendarFrom: [
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
      ],
      calendarTo: [
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
      ],
      dropzoneOptions: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 1,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      dropzoneOptions2: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 20,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      loading: false,
      productImageUrl: '',
      productDeliveryFile: '',
      heading: '',
      price: 0.99,
      description: 'This is awesome.',
      secondaryHeading: 'Get it now!',
      redirectURL: '',
      callToActionText: 'Get It Now',
      productType: '',
      addFile: true,
      addURL: false,
      created: '',
      modified: '',
      ownerId: null,
      productId: null,
      uniqueProductId: null,
      public: false,
      deleted: false,
      showCopied: false
    }
  },
  props: ['feel'],
  components: {
    LandingProduct,
    vueDropzone: vue2Dropzone,
    VueSlickCarousel
  },
  methods: {
    forceRerender () {
      this.carouselKey = this.carouselKey + 1
    },
    addSize () {
      let sizes = this.sizes
      sizes.push({
        name: 'large',
        sku: '',
        weightLb: 0
      })
      this.sizes = sizes
    },
    addSubscriptionItem () {
      let subscriptionProducts = this.subscriptionProducts
      subscriptionProducts.push({
        name: '',
        sku: '',
        weightLb: 1,
        image: '',
        price: 9.99
      })
      this.subscriptionProducts = subscriptionProducts
    },
    deleteSize (s) {
      let sizes = this.sizes
      sizes.splice(s, 1)
      this.sizes = sizes
    },
    deleteSubscriptionItem (s) {
      let subscriptionProducts = this.subscriptionProducts
      subscriptionProducts.splice(s, 1)
      this.subscriptionProducts = subscriptionProducts
    },
    startAddingCustomTimeSlot () {
      this.addCustomTimeSlot = true
    },
    stopAddingCustomTimeSlot () {
      this.addCustomTimeSlot = false
    },
    toggleAppointmentLength (length) {
      let appointmentLengths = this.appointmentLengths
      let index = appointmentLengths.indexOf(length)

      if (index == -1) {
        appointmentLengths.push(length)
      } else {
        appointmentLengths.splice(index, 1)
      }

      this.appointmentLengths = appointmentLengths
    },
    openOnboardingPopup () {
      this.$store.dispatch('AUTH.setOnboardingPopup', {open: true})
    },
    myDisplayName () {
      if (this.$store.getters['AUTH.myInfo']) {
        return this.$store.getters['AUTH.myInfo'].displayName && this.$store.getters['AUTH.myInfo'].displayName.displayName
      }
      return ''
    },
    startConfigureZones () {
      console.log('startConfigureZones')
      this.$store.dispatch('AUTH.startConfigureZones', {}).then((res) => {
        this.getMyShippingRates()
      })
    },
    setAddUrl (addURL) {
      this.addURL = addURL
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
    checkPrice (event) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.price = 0.99
      }
    },
    updateInventoryCount (event, productId) {
      this.$store.dispatch('AUTH.updateInventoryCount', {productId, count: event.target.value})
    },
    toggleFree (freeProduct, fromInput) {
      if (freeProduct) {
        console.log('from price0', this.freeProduct)
        this.price = 0
      } else {
        console.log('from price', this.freeProduct)
        if (this.price == 0) {
          console.log('from price2')
          this.price = 0.99
        }
      }
      this.freeProduct = freeProduct
    },
    adjustPrice () {
      console.log('adjustPrice', this.freeProduct)
      if (this.freeProduct) {
        this.price = 0
      }
    },
    setUseMyShippingNetwork (value) {
      this.useMyNetwork = value
      console.log('useMyNetwork', this.useMyNetwork)
    },
    setFulfillMyself (value) {
      this.fulfillMyself = value

      console.log('fulfillMyself', this.fulfillMyself)
    },
    goToTab (currentTab) {
      this.currentTab = currentTab
    },
    flashCopied () {
      this.showCopied = true
      setTimeout(() => {
        this.showCopied = false
      }, 1000)
    },
    stopProp (e) {
      e.stopPropagation()
    },
    copyLink (e, link) {
      e.stopPropagation()
      console.log('a', link)
      this.flashCopied()
      console.log('b', link)
      navigator.clipboard.writeText(link);
      console.log('c', link)
    },
    goTo (path) {
      window.scroll(0,0)
      router.push(path)
    },
    changePrice (e) {
      let price = e.target.value
      console.log('price', price)
      this.price = price
    },
    newOrEdit () {
      if (this.uniqueProductId) {
        return 'Edit '
      }
      return 'New '
    },
    productTypeDisplay () {
      let type = this.productType
      if (type == 'digital-download') {
        return 'Digital Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
    deactivateProduct () {
      this.saving = true
      this.$store.dispatch('AUTH.deactivateProduct', {uniqueProductId: this.uniqueProductId}).then((res) => {
        console.log('PRODUCT deactivated', res)
        if (res == 'ok') {
          this.saving = false
          this.public = false
        }
      })
    },
    deleteProduct () {
      let productObject = {
        uniqueProductId: this.uniqueProductId,
        productId: this.productId,
      }
      this.$store.dispatch('AUTH.deleteProduct', productObject).then((res) => {
        console.log('Product archived', res)
        this.deleted = true
      })
    },
    confirmSaveAndOnboard () {
      let popup = {
        heading: 'Ready to get paid?',
        text: 'Connect an account to receive funds',
        callToAction: 'Save product and link account',
        callToAction2: 'Save product',
        action: async () => {
          await this.saveProduct(false, true)
          this.$store.dispatch('AUTH.setGlobalPopup', {})
          this.openOnboardingPopup()
        },
        action2: async () => {
          console.log('action2 saveProduct')
          this.saveProduct(false, true)
        },
        loadingSpinner: true
      }
      this.$store.dispatch('AUTH.setGlobalPopup', popup)
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
    saveProduct (activate, override) {
      console.log('saveProduct', activate, override)
      this.setProductError(null)

      if (this.heading == '') {
        this.setProductError('validation-heading', 'The heading cannot be empty.')
        return false
      } else if (this.description == '') {
        this.setProductError('validation-description', 'The description cannot be empty.')
        return false
      } else if (this.callToActionText == '') {
        this.setProductError('validation-call-to-action', 'The call to action cannot be empty.')
        return false
      } else if (this.weightLb < 0) {
        this.setProductError('validation-weight', 'The weight cannot be less than 0.')
        return false
      }

      return new Promise(async (resolve, reject) => {
        if (!override) {
          if (!(this.$store.getters['AUTH.myConnectId'] && this.$store.getters['AUTH.myConnectId'].verified)) {
            if ((this.price > 0) || this.productType == 'physical-product') {
              this.confirmSaveAndOnboard()
              return false
            }
          }
        }
        console.log('saveProduct')

        this.saving = true

        let productObject = {
          subscriptionProducts: this.subscriptionProducts,
          physicalProductSubscriptionCanBeCustomized: this.physicalProductSubscriptionCanBeCustomized,
          sizes: this.sizes,
          calendarFrom: this.calendarFrom,
          calendarTo: this.calendarTo,
          myTimezone: this.myTimezone,
          appointmentLength: this.appointmentLength,
          appointmentLengths: this.appointmentLengths,
          customAppointmentLengths: this.customAppointmentLengths,
          heading: this.heading,
          price: this.price,
          description: this.description,
          secondaryHeading: this.secondaryHeading,
          redirectURL: this.redirectURL,
          callToActionText: this.callToActionText,
          addFile: this.addFile,
          addURL: this.addURL,
          created: this.created,
          modified: this.modified,
          productType: this.productType,
          productImageUrl: this.productImageUrl,
          uniqueProductId: this.uniqueProductId,
          productDeliveryFile: this.productDeliveryFile,
          productId: this.productId,
          productSku: this.productSku,
          freeProduct: this.freeProduct,
          weightLb: this.weightLb,
          myShippingProviders: this.myShippingProviders,
          myShippingRates: this.myShippingRates,
          fulfillMyself: this.fulfillMyself,
          useMyNetwork: this.useMyNetwork,
          fulfillMyselfOptions: this.fulfillMyselfOptions,
          fulfillAutomaticallyOptions: this.fulfillAutomaticallyOptions
        }
        if (activate) {
          productObject.public = true
        }
        this.$store.dispatch('AUTH.saveProduct', productObject).then((res) => {
          let product = res
          for (let i in product) {
            this[i] = product[i]
          }
          this.saving = false
          return resolve(true)
        })
      })
    },
    removeProductImage () {
      this.productImageUrl = ''
    },
    removeProductDeliveryFile () {
      this.productDeliveryFile = ''
    },
    uploadedProductImage (file) {
      let item = {
        productId: this.productId,
        file
      }
      this.$store.dispatch('AUTH.uploadProductImage', item).then((res) => {
        this.productImageUrl = res.url
      })
    },
    uploadedProductDeliveryFile (file) {
      let item = {
        productId: this.productId,
        file
      }
      this.$store.dispatch('AUTH.uploadProductDeliveryFile', item).then((res) => {
        this.productDeliveryFile = res
      })
    },
    generateNewInternalProductId () {
    },
    loadDefaultProduct () {
      let randomNumber = Math.floor(Math.random() * 100000000000)
      let now = (new Date()).getTime()
      let route = this.$route
      let type = route.params.type

      let defaultProduct = {
        myTimezone: '(GMT-05:00) Eastern Time (US & Canada)',
        calendarFrom: [
          '9 am',
          '9 am',
          '9 am',
          '9 am',
          '9 am',
          '9 am',
          '9 am',
        ],
        calendarTo: [
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
        ],
        addTimeSelected: 5,
        appointmentLength: '15 minutes',
        appointmentLengths: [15, 30, 60, 90],
        customAppointmentLengths: [],
        productImageUrl: '',
        productDeliveryFile: '',
        heading: '',
        price: 0.99,
        description: 'This is awesome.',
        secondaryHeading: 'Get it now!',
        redirectURL: '',
        callToActionText: 'Purchase',
        productType: type,
        addFile: true,
        addURL: false,
        created: now,
        modified: '',
        productId: randomNumber,
        uniqueProductId: null,
        productSku: '',
        freeProduct: '',
        weightLb: 0,
      }
      for (let i in defaultProduct) {
        this[i] = defaultProduct[i]
      }

    },
    getProductData () {
      let route = this.$route
      let productId = route.params.id
      if (productId) {
        this.$store.dispatch('AUTH.getProductDetails', productId).then((product) => {
          for (let i in product) {
            this[i] = product[i]
          }
        })
      }
    },
    setupProduct () {
      this.loadDefaultProduct()
      this.getProductData()
    },
    getMyShippingRates () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyShippingRates', {}).then((res) => {
          this.myShippingRates = {
            zones: res.zones,
            providers: res.providers,
            loaded: true
          }
          console.log('this.myShippingRates', this.myShippingRates)
        })
      } else {
        setTimeout(() => {
          this.getMyShippingRates()
        }, 500)
      }
    },
    loadMyShippingProviders () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyShippingProviders', {}).then((res) => {
          this.myShippingProviders = res || {}
        })
      } else {
        setTimeout(() => {
          this.loadMyShippingProviders()
        }, 500)
      }
    },
  },
  computed: {
  },
  watch: {
    'subscriptionProducts': {
      handler: function (params) {
        this.forceRerender()
      }
    },
    'sizes': {
      handler: function (params) {
        this.forceRerender()
      }
    },
    '$route.params': {
      handler: function (params) {
        let id = params.id
         if (id) {
          this.getProductData()
         } else {
          this.loadDefaultProduct()
         }
      },
      // deep: true,
      immediate: true
    }
  },
  created () {
    this.setupProduct()

    this.getMyShippingRates()
    this.loadMyShippingProviders()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  ._position1 {
    margin-top: 8px;
  }

  h1 {
    text-transform: capitalize;
  }

  h2 {
    /*font-size: 24px;*/
    /*font-weight: 500;*/
    /*font-family: 'Rubik', 'sans-serif';*/
    /*letter-spacing: .04em !important;*/
    color: #2b2b2b;
    /*color: $color-primary;*/
  }

  h3 {
    margin-bottom: 18px;
    text-align: left;
    /*color: #5469d4;*/
    color: $color-primary;
  }

  hr {
    margin-bottom: 45px;
  }

  .product-wrapper {
    /*background-color: #292929;*/
    padding: 19px;
    padding-top: 14px;
    padding-bottom: 100px
  }
  .product-splash, .product-choose-your-feel {
    width: 100%;
    height: 566px;
    margin-bottom: 120px;
  }
  .product-products {
    flex-wrap: wrap;
  }
  .product-product-image {
    width: 515px;
    min-width: 515px;
    height: 566px;
  }
  .top-bar-global {
    /*height: 68px;*/
  }
  .whole-page-box-global {
  }
  $image-upload-size: 200px;
  .image-upload {
    width: $image-upload-size;
    height: $image-upload-size;
    border-radius: 6px;
    /*padding: 12px;*/
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          /*background-color: #5469d4;*/
          background-color: $color-primary;
          color: $color-white;
        }
      }
    }

    & > * {
      margin: 0 !important;
    }
  }
  .image-uploaded {
    width: $image-upload-size;
    height: $image-upload-size;
    border-radius: 6px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    object-fit: cover;
  }
  .image-uploaded-under {
    margin-top: 6px;
    font-size: 12px;
  }
  .file-upload {
    width: 100%;
    /*max-width: 500px;*/
    height: 75px;
    border-radius: 6px;
    /*padding: 12px;*/
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    /*margin-right: 20px;*/
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #5469d4;
          color: $color-white;
        }
      }
    }
  }
  .product-delivery-file {
    & > div {
      border: 1px solid rgba(50, 50, 93, 0.1);
      border-radius: 6px;
      width: 100%;
      height: 75px;
    }
  }
  .dropzone-overlay {
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    /*background-color: #aaa;*/
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
/*    background-color: #fbfbfb;
    border: 1px dashed rgba(50, 50, 93, 0.12);*/

    p {
        font-size: 14px;
      span {
        font-size: 14px;
        color: $color-primary;
        border: 1px solid $color-primary;
        padding: 3px 6px;
        border-radius: 8px;
      }
      /*margin-bottom: 6px;*/
    }

  }
  .product-basics {
    /*height: 200px;*/
    width: 100%;
    min-height: 200px;
  }
  textarea {
    border-radius: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 16px;
    width: 100% !important;
    background: white;
    margin-bottom: 6px;
  }
  .digital-download-details {
    height: 100%;
  }
  .product-detail {
    margin-bottom: 40px;
    max-width: 500px;

    h4 {
      text-transform: lowercase;
      letter-spacing: 0.02em;
    }

    input {
      margin-bottom: 0 !important;
    }
  }
  .product-detail-outer {
    max-width: 500px;

    & > .product-detail {
      flex: 1;
      &:first-child {
        flex: 2;
        margin-right: 20px;
      }
    }
  }
  $placeholderColor: #898989;
  h4 {
    font-family: Kollektif;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: rgb(43, 43, 43);
  }
  input, textarea, select, .dropzone {
    max-width: 540px;
    border-color: #bbb !important;
    background-color: #fff;
    font-size: 14px;
    padding: 12px 10px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: Kollektif;
    color: rgb(43, 43, 43);


    ::-webkit-input-placeholder { /* Edge */
      color: $placeholderColor;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $placeholderColor;
    }

    ::placeholder {
      color: $placeholderColor;
    }
  }
  .sub-line {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .check-fulfillment {
    margin-right: 20px;

    input {
      width: 20px;
    }
  }
  .check-fulfillment-box {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 20px;
    margin: 0;
  }
  .mw2 {
    /*max-width: 500px;*/
  }
  .mw3 {
    /*max-width: 500px;*/
  }
  .just-save {
    background-color: transparent;
    box-shadow: none;
    color: #2b2b2b;
    margin-right: 10px;
  }
  .button-b {
    /*border: 1px solid #5469d4;*/
    border: 1px solid $color-primary;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    /*color: #5469d4;*/
    color: $color-primary;
    padding: 2px 6px;
    height: 30px;

    &:hover {
      border: 1px solid transparent;
      /*background-color: #5469d4;*/
      background-color: $color-primary;
      color: $color-white;
    }
  }
  .image-dropzone-wrapper {
    margin-right: 20px;
  }
  .file-icon {
    opacity: 0.5;
    height: 35px;
    margin-bottom: 10px;
  }
  .file-text {
    font-size: 14px;
    margin-bottom: 10px;
    color: $color-background-dark;
  }
  .file-remove-text {
    font-size: 10px;
    text-decoration: underline;
    color: $color-primary;
  }
  .r0 {
    margin-right: 10px;
  }
  .r1 {
    margin-left: 10px;
  }
  .one-day {
    margin-top: 4px;
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    .one-day {
      flex-direction: column;
    }
  }
  .max-detail {
    /*max-width: 350px;*/
    select {
      max-width: 300px;
    }
  }
  .reference {
    margin-top: 4px;
    font-size: 12px;
    margin-bottom: 12px;
  }
  .previews {
    div {
      a {
        font-size: 14px;
        color: #444;
      }
    }
  }

  @media (max-width: 980px) {
    .digital-download-details {
      flex-direction: column;
      .dropzone-wrapper {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }

  .delete-product {
    font-size: 12px;
    margin-top: 30px;
    margin-left: 40px;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    cursor: pointer;
  }

  .minh {
    height: 100%;
  }
  .title-bar {
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    .product-detail-responsive {
      flex-direction: column;
    }
  }
  .copy {
    margin-top: 6px;
  }
.share-url {
  /*margin-left: 185px;*/
  /*position: absolute;*/
  /*left: 100%;*/
  margin-bottom: 10px;
  width: 100%;
  /*max-width: 660px;*/
  /*min-width: 660px;*/
  /*transform: translateY(-25%);*/
  & > div {
    padding-top: 15px;
    padding-bottom: 15px;
    /*height: 42px;*/
    border-radius: 29px;
    /*background-color: $color-primary;*/
    border: 1px solid $color-primary;
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    /*padding: 20px 30px;*/

    p, a {
      /*color: white;*/
      color: $color-primary;
    }

    .header, .link {
      color: #FFFFFF !important;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 16px;
    }

    .header {
      width: 140px;
      min-width: 140px;
      color: $color-primary !important;
      /*margin-bottom: 10px;*/
      /*font-weight: 500;*/
      /*font-size: 12px;*/
      /*font-family: 'Inter'*/
    }
    .link {
      text-align: center;
      
      /*text-align: center;*/
      /*font-size: 16px;*/
      /*font-weight: 600;*/
      /*margin-bottom: 10px;*/
      /*word-break: break-all;*/

      &:hover {
        text-decoration: none;
      }
    }
    .link-bigger {
      /*font-size: 18px;*/
    }
    @media (max-width: 420px) {
      /*.link {
        font-size: 14px;
      }*/
    }
    .copy {
      text-decoration: none;
      font-size: 13px;
      font-weight: 400;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.share-url2 {
  position: relative;
  left: unset;
  margin-left: 0;
  margin-top: -20px;
  margin-bottom: 15px;
}

.copied {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.07s;
  position: absolute;
  bottom: 7px;
  right: 120px;
  font-size: 12px;
  background-color: white;
  border-radius: 5px;
  padding: 6px 8px;
  color: black !important;
}

.show-copied {
  opacity: 1;
}

.go-back-to-my-products {
  margin-right: 15px;
}

.delete-product-1 {
  width: 100%;
  justify-content: flex-end;
  p {
    font-weight: 400;
    color: #676767 !important;
  }
}

.delete-product-2 {
  justify-content: flex-start;
  p {
    font-weight: 400;
    color: #474747 !important;
  }
}

.default-action {
  font-size: 14px;
}

.sub-heading {
  font-family: Kollektif;
  font-size: 14px;
  line-height: 1em;

  &-wrapper {
    margin-top: 6px;
  }
}

.new-product-icon {
  height: 1px;
  margin-right: 6px;
}

.application-process-tabs {
  margin-bottom: 20px;
}

@media (min-width: 980px) {
  .w2 {
    padding: 30px;
  }
}

.m0 {
  margin: 0;
}

.product-detail-tabs {
  &-tab {
    padding: 20px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    a {
      color: $color-background-dark;
      font-weight: 700;
      font-weight: 16px;
      text-transform: lowercase;
      letter-spacing: 0.02em;
    }
    &-active {
      background-color: $color-white;
      -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .05);
      box-shadow: 0 0 20px rgba(8, 21, 66, .05);
      a {
      }
    }
  }
}
.product-detail-box {
  background-color: $color-white;
  padding: 20px;
  letter-spacing: 0.5px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .05);
  box-shadow: 0 0 20px rgba(8, 21, 66, .05);
}

.copy-link {
  color: $color-primary;
  border: 1px solid $color-primary;
  padding: 2px;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 10px;
}

.dropzone-file-placeholder {
  height: 35px;
}

.dropzone {
  border-radius: 6px;
  border: 1px solid #efefef;
}

.dropzone-file-text {
  margin-top: 10px;
  color: $color-background-dark;
  z-index: 10;
  text-align: center;
}

.dropzone-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  z-index: 1;
  border-radius: 6px;
  object-fit: cover;
  /*height: 200px;*/
}
.dropzone-overlay {
  z-index: 1;
}

.as-button {
  background-color: #FFFFFFEE;
  padding: 10px;
  border-radius: 6px;
}


.fullfillment-type-box {
  width: 320px;
  height: 100px;
  border-radius: 20px;
  border: 2px solid #888;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.faded-box {
  border-color: #eee;
}
.or-free {
  margin-left: 10px;
  margin-right: 10px;
}
.spec {
  h4 {
    margin-bottom: 9px;
  }
}
.disabled-1 {
  opacity: 0.4;
}
.i32 {
  width: 15px;
  height: 15px;
  margin-bottom: 1px;
  margin-left: 5px;
}
.activate-your-network {
  color: $color-background-dark;
  font-size: 12px;
  font-style: italic;
}
.button_ {
  width: 270px;
  margin-bottom: 4px !important;
}
.fz14 {
  font-size: 14px;
  color: #444;
}
.save-product-error {
  color: $color-secondary;
}

.saving-now {
  opacity: 0.4;
}

.copy-link {
  color: $color-primary;
  border: 1px solid $color-primary;
  padding: 2px;
  border-radius: 5px;
  font-size: 12px;
  line-height: 12px;
  margin-left: 10px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  kerning: 100;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  img {
    height: 16px;
    height: 16px;
    object-fit: contain;
  }
  &:hover {
    background-color: $color-primary;
    color: $color-white;
  }
}
.minw {
  & > * {
    /*min-width: 500px;*/
  }
}
.mt3 {
  margin-top: 3px;
}
.check-button {
  font-weight: 700;
}
.position2x {
  padding: 2px 10px 14px;
  margin-top: 0;
  margin-bottom: 0;
}
@media (max-width: 800px) {
  .fulfillment-type {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .fulfillment-type {
    transform: scale(0.85);
  }
}

@media (max-width: 500px) {
  .fulfillment-type {
    transform: scale(0.78);
  }
}

.link {
  color: $color-primary;
}
.no-all-cap {
  text-transform: none;
}

.appointment-length {
  cursor: pointer;
  opacity: 0.375;
  
  input {
    cursor: pointer;
    width: 24px;
    flex: unset;
    margin: 0;
  }

  p {
    margin-left: 20px;
    color: $color-background-dark;
  }

  &.appointment-length-selected {
    opacity: 1;
    p {
      font-weight: 600;
    }
  }
}



input[type="time"]::-webkit-calendar-picker-indicator {
    background: none;
}

$selector-height: 30px;

.select-as-text {
  border: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  height: $selector-height;
  padding: 0;
  opacity: 0;


  &-visible {
    height: $selector-height;
    display: flex;
    align-items: center;
    font-weight: 200;
    color: $color-primary;

    &-chevron {
      font-size: 10px;
      margin-left: 8px;
      margin-bottom: 2px;
      color: $color-primary;
    }
  }
}

.fulfillment-hr {
  height: 1px;
  border: none;
  width: calc(100% + 40px);
  transform: translateX(-20px);
  background-color: #dadada;
  margin-top: 20px;
  margin-bottom: 30px;
}

.mb0i {
  margin-bottom: 0 !important;
}

.product-size {
  background-color: #f6f6f6;
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
}

.m__ {
  margin-bottom: 20px;
}

.m___ {
  margin-bottom: 0;
}

.add-size {
  font-size: 14px;
  text-decoration: underline;
}
.size-actions {
  p {
    font-size: 12px;
  }
}

.wun {
  width: 24px !important;
  margin-top: 0;
}

.mb0 {
  margin-bottom: 0 !important;
}

.one-psubscription-product {
  background-color: #f7f7f7;
  padding: 10px 12px;
  border-radius: 10px;
}

.mr0 {
  margin-right: 0 !important;
}

</style>
