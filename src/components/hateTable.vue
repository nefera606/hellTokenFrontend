<template>
  <div id="hateTable">
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Hate</th>
          <th>More</th>
          <th>Clean</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.topic">
          <td>{{row.topic}}</td>
          <td>{{row.value}}</td>
          <td>
            <input placeholder="tokens">
            <button @click="addHate(row.topic)">add</button>
          </td>
          <td>
            <button @click="cleanHate(row.topic)">clean</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "hateTable",
  computed: {
    web3() {
      return this.$store.state.web3;
    },
    data() {
      return this.$store.state.data;
    }
  },
  methods: {
    addHate(topic) {
      console.log(this.$refs[`amount-${topic}`],topic);
      // this.$store.state.contractInstance().iHate(topic,this.amount, {
      //   gas: 300000,
      //   from: this.$store.state.web3.coinbase
      // }, (err, result) => {
      //   if (err) {
      //     console.log(err)
      //   }
      // })
    },
    cleanHate(topic) {
      this.$store.state.contractInstance().toHeaven(100000,topic, {
        gas: 300000,
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hateTable {
  padding-left: 30%;
}
table {
  font-family: hateFont;
  color: #000000;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #e72f85;
  margin: 10px 10px 0 10px;
  background-color: #fff;
  text-align: center;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #000000;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #aeaeb3;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>