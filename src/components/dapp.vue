<template>
  <div id="header">
    <h1>The hate boutique</h1>
  <hateTable/>
  <hello-metamask/>
  </div>
</template>
<script>
import metamask from "@/components/metamask";
import hateTable from "@/components/hateTable";
export default {
  name: "hatedapp",
  beforeCreate() {
    console.log("registerWeb3 Action dispatched from hatedapp.vue");
    this.$store.dispatch("registerWeb3");
    console.log("Registering data");
    this.$store.dispatch("registerData");
    console.log("Registering getContractInstance");
    this.$store.dispatch("getContractInstance");
  },
  components: {
    "hello-metamask": metamask,
    "hateTable": hateTable
  }
};
</script>
<style scoped>
#header {
  font-family: hateFont;
  font-size: 20pt;
  padding-top: 20px;
  color: #ffffff;
}
</style>