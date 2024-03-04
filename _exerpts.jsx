
let pre_order_path = pre_order_details_path + '/' + (orderNumber || 'f')
let _preOrderData = await db.ref(pre_order_path).once('value')
let preOrderData = _preOrderData.val()


fullOrder = {
    created: (new Date()).getTime(),
    order: fullOrder,
    fulfillmentDetails: preOrderData
}

let new_fulfillment_required = fulfillments_by_user_path + (customerId || 'f') + '/' + orderNumber
let fulfillmentOrderDetails = {...fullOrder, status: 'unfulfilled'}
await db.ref(new_fulfillment_required).set(fulfillmentOrderDetails)





          <!-- <div class="income-row income-heading-row df fulfillment-item-each">
            <div class="income-heading">
              <h3>
                Order #
              </h3>
            </div>
            <div class="income-heading">
              <h3>
                Placed
              </h3>
            </div>
            <div class="income-heading">
              <h3>
                Product
              </h3>
            </div>
            <div class="income-heading">
              <h3>
                Customer
              </h3>
            </div>
            <div class="income-heading">
              <h3>
                
              </h3>
            </div>
          </div> -->




        <!-- <div class="w100p df fdr">
          <div class="w100p df fdc responsive-order-box"
            v-for="(item, i) in fulfillmentsEvents"
            v-if="!item.archived || showArchived">
            <div class="income-row df fulfillment-item-each">

              <div class="income-heading">
                <p class="responsive-order-name">
                  {{item.order[0].heading}}
                </p>
              </div>
              <div class="income-heading">
                <p class="responsive-title">
                  Order #
                </p>
                <p>
                  {{item.orderId}}
                </p>
              </div>
              <div class="income-heading fdc _position3 aifsi">
                <p class="responsive-title">
                  Event Date
                </p>
                <p>
                  <span>{{item.fulfillmentDetails.selectedTimeAvailabe.time}} {{item.fulfillmentDetails.selectedTimeAvailabe.letters}} on {{item.fulfillmentDetails.selectedDay.weekday}}, {{month(item.fulfillmentDetails.selectedDay.month)}} {{item.fulfillmentDetails.selectedDay.day}}</span>
                </p>
              </div>
              <div class="income-heading">
                <p class="responsive-title">
                  Placed
                </p>
                <p>
                  {{formatDate(item.created)}} ago
                </p>
              </div>
              <div class="income-heading _mb">
                <p class="responsive-title">
                  Customer
                </p>
                <p>
                  {{item.fulfillmentDetails.email}}
                </p>
              </div>
              <div class="income-heading w100p df jcc">
                <button class="fulfill-button"
                      v-if="item.status !== 'fulfilled'"
                      @click="showCalendarFulfillMenu(item)"
                      >
                  Fulfillment
                </button>
                <span class="fulfill-order-after df fdc jcc aic w100p" v-else-if="item.archived">
                  <span class="df aic jcfs order-fulfilled-wrap">
                    <img src="../../static/icons/circle-check-light-active.svg" class="order-fulfilled">
                    <p cless="f1 tac">  
                      completed (archived)
                    </p>
                  </span>
                  <span class="df anti-hover">
                    <span class="mini-button" @click="deleteProduct(item.orderId, true)">
                      Unarchive
                    </span>
                  </span>
                </span>
                <span class="fulfill-order-after df fdc" v-else="">
                  <span class="df aic jcc order-fulfilled-wrap">
                    <img src="../../static/icons/circle-check-light-active.svg" class="order-fulfilled">
                    <p>  
                      completed 
                    </p>
                  </span>
                  <span class="df anti-hover">
                    <span class="mini-button mr-x" @click="unfulfill(item.orderId)">
                      Mark Incomplete
                    </span>
                    <span class="mini-button" @click="deleteProduct(item.orderId)">
                      Archive
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div> -->




        
    <!-- Sort orders, sort events, show archived -->
    <!-- <div class="special-box-2 w100p df fdc">
      <div class="top-bar-global posrel w100p _position1 df jcsb aic">
          <h2 class="text-dark">Orders</h2>
          <p class="sort-by">sort by: <span @click="sortOrders(true)">{{sortByOrders}}</span></p>
          <div class="sort-select" v-if="sortingOrders">
            <p @click="selectSort('newest first')">newest first</p>
            <p @click="selectSort('oldest first')">oldest first</p>
            <p @click="selectSort('highest price')">highest price</p>
            <p @click="selectSort('lowest price')">lowest price</p>
          </div>
      </div>
      <div class="top-bar-global posrel w100p _position2 df jcsb aic">
        <h2 class="text-dark">Events</h2>
        <p class="sort-by">sort by: <span @click="sortEvents(true)">{{sortByEvents}}</span></p>
        <div class="sort-select" v-if="sortingEvents">
          <p @click="selectSortEvents('soonest first')">soonest first</p>
          <p @click="selectSortEvents('latest first')">latest first</p>
          <p @click="selectSortEvents('highest price')">highest price</p>
          <p @click="selectSortEvents('lowest price')">lowest price</p>
        </div>
      </div>
      <div class="archived w100p df jcfe aic">
        <input type="checkbox" v-model="showArchived" name="">
        <a class="balance-text" @click="flipArchived()">show archived</a>
      </div>
    </div> -->



    
  <!-- <div class="income-heading instructions">
    <p class="responsive-title">
      Instructions:
    </p>
    <p>
      {{item.fulfillmentDetails.productDeliveryInstructions}}
    </p>
  </div> -->
  <!-- <div class="income-heading instructions instructions2 df jcsb w100p" v-if="item.fulfillmentDetails.productDeliveryFile && item.fulfillmentDetails.productDeliveryFile.url">
    <p class="f1">Attachment:</p>
    <img src="../../static/icons/file-arrow-down-light-active.svg" class="download-file">
    <a class="responsive-title fu" :href="item.fulfillmentDetails.productDeliveryFile.url">
      Download File
    </a>
  </div>
  <div class="income-heading instructions instructions2 df jcfs" v-else>
  </div> -->
  <!-- {{item}} -->
  <!-- <p>
    (<span @click="unfulfill(item.orderId)">unfulfill</span>, <span @click="deleteProduct(item.orderId)">archive</span>)
  </p> -->
  <!-- <div class="title-box df jcsb">
    <h3 class="text-dark title-right">Orders:</h3>
    <h3 class="text-dark title-right">{{$store.getters['AUTH.displayData'] ? ($store.getters['AUTH.displayData'].fulfillments + (ordersCompleted() || 0)) : '0'}}</h3>
  </div>
  <div class="title-box df jcsb">
    <h3 class="text-dark title-right">Completed:</h3>
    <h3 class="text-dark title-right">{{ordersCompleted()}}</h3>
  </div>
  <div class="title-box df jcsb" v-if="showArchived">
    <h3 class="text-dark title-right">Archived:</h3>
    <h3 class="text-dark title-right">{{ordersArchived()}}</h3>
  </div> -->