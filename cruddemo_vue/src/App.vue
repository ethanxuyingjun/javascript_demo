<template>
  <div id="app">
    <el-row type="flex" class="row-bg">
      <el-col :span="22">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/address">Address Book</router-link></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="2" style="margin-bottom: 1px; background-color:#545c64" align="right">
         <el-select  style="width: 100px; margin-top: 15px; margin-right: 5px;" size="mini" v-model="value" @change="toggleLang">
           <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           >
           </el-option>
       </el-select>
      </el-col>
    </el-row>
    
   
    <transition name="fade" mode="out-in">
       <router-view class="view"></router-view>
     </transition>
   </div>
</template>

<script>
export default {
  data() {
      return {
        activeIndex: '1',
        options:
          [{
             value: 'en',
             label: 'English'
           }, {
               value: 'zh',
               label: '中文'
           }],
        value: localStorage.getItem('locale')   
      };
    },
  methods: {
      toggleLang(lang) {
         if(lang == 'zh') {
             localStorage.setItem('locale', 'zh')
             this.$i18n.locale = localStorage.getItem('locale')
         } else if(lang == 'en') {
             localStorage.setItem('locale', 'en')
             this.$i18n.locale = localStorage.getItem('locale')
         }
     }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

</style>
