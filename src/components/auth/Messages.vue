<template>
  <div class="wrap-messages df fdc">
    <h2>
      Messages
    </h2>
    <span class="df w100p space1">
      <p>Contacts</p>
      <p class="space2">Chats</p>
    </span>
<!--     <input type="text" placeholder="E-mail" name="" v-model="email">
    <input type="password" placeholder="Password" name="" v-model="password">
    <input type="password" placeholder="Password" name="" v-model="password2">
    <p v-if="$store.getters.authError">{{ $store.getters.authError }}</p>
    <button @click="register()">Register</button> -->
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data () {
    return {
      email: ''
    }
  },
  props: [],
  components: {

  },
  methods: {
  },
  computed: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/settings.scss";

.wrap-messages {
  padding: $padding4;
  padding-top: 0;
  padding-bottom: 0;
}

.space1 {
  margin-top: 14px;
}

.space2 {
  margin-left: 18px;
}
</style>
