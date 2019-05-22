<template>
  <div>
    <div class="helltoken-info" id="helltokenContainer">
      <p>Metamask: {{ web3.isInjected }}</p>
      <p>Network: {{ web3.networkId }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>
      <input v-model="token" placeholder="tokens">
      <button @click="getHate()">Get your hate</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "hello-metamask",
  computed: {
    web3() {
      return this.$store.state.web3;
    }
  },
  methods: {
    getHate() {

    }
  }
};
</script>
<style scoped>
#helltokenContainer {
  width: 500px;
  border: 10pt;
  border-color: #fad9e3;
  font-size: 10pt;
  background-color: beige;
  color: black;
}
</style>