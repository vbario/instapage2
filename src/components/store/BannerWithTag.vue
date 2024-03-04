<template>
  <div class="w100p">
    <div class="banner w100p df aic jcc" :style="
        'background-image: url(' + (banner ? banner.url : '') + ');'">
      
      <div class="df jcc aic profile-header-wrapper">

        <img v-if="profileImageUrl" class="profile-image" :src="profileImageUrl.profileImageUrl">
        <img v-else class="profile-image" src="../../../static/images/user-solid.svg">

        <div v-if="displayName" class="df fdc profile-texts">
          <h3 class="fz22p username-display">
            @{{displayName.displayName}}
          </h3>
          <span class="df aic">
            <p class="username-url">
              pshbl.co/{{displayName.displayName}}
            </p>
            <i class="fa-regular fa-copy copy-store-link"></i>
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerWithTag',
  data () {
    return {
    }
  },
  props: ['displayName', 'profileImageUrl', 'banner'],
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
  /*$banner-height-1: 120px;*/

  .banner {
    background-color: #44D600;
    background: linear-gradient(83deg, #44D600 -47.16%, rgba(68, 214, 0, 0.00) 201.11%);
    padding-top: 25px;
    padding-bottom: 25px;
    /*height: $banner-height-1;*/
    background-position: center;
    background-size: cover;
  }
  
  .profile-header-wrapper {
    z-index: 2;
  }

  .username-display {
    color: #000;
  }

  .username-url {
    color: #999;
    font-size: 14px;
  }

  .copy-store-link {
    margin-left: 5px;
    transform: translateY(-2px);
    font-size: 11px;
    color: #999;
    cursor: pointer;
  }

  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    height: 170px;
    width: 170px;
    background-color: #eaeaea;
    z-index: 2;
    -webkit-box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
    box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
  }

  .profile-texts {
    padding: 8px 13px;
    padding-left: 30px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-left: 0;
    transform: translateX(-16px);
    background-color: #fff;
    z-index: 1;
    -webkit-box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
    box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
  }

  @media (max-width: 800px) {
    .profile-image {
      width: 140px;
      height: 140px;
    }
    .links {
      margin-top: 23px;
      gap: 20px;
    }
    .link {
      gap: 10px;
      max-width: 85px;

      &-image {
        width: 68px;
        height: 68px;
      }
      &-text {
        font-size: 12px;
      }
    }
    /*.profile-header-wrapper {
      flex-direction: column;
    }
    .profile-texts {
      align-items: center;
      margin-left: 0;
      margin-top: 20px;
    }*/
  }

  @media (max-width: 568px) {
    .profile-image {
      width: 120px;
      height: 120px;
    }
  }

  @media (max-width: 480px) {
    .profile-image {
      width: 100px;
      height: 100px;
    }
  }

  @media (min-width: 568px) {
    .profile-texts {
      padding: 14px 18px;
      padding-left: 30px;
    }
    .username-display {
      font-size: 28px;
    }
    .username-url {
      font-size: 15px;
    }
  }

  @media (min-width: 800px) {

    .banner {
      padding-top: 38px;
      padding-bottom: 38px;
    }

    .links {
      margin-top: 30px;
    }

    .profile-image {
      width: 155px;
      height: 155px;
    }
    .profile-texts {
      padding: 16px 20px;
      padding-left: 30px;
    }
    .username-display {
      font-size: 30px;
    }
    .username-url {
      font-size: 16px;
    }
  }

  @media (min-width: 1200px) {
    .profile-texts {
      padding: 17px 23px;
      padding-left: 33px;
    }
    .username-display {
      font-size: 32px;
    }
    .username-url {
      font-size: 17px;
    }
  }
</style>
