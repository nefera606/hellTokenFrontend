import Web3 from 'web3'
import hateAbi from './hateAbi'

const address = "0xa9edb6a9c1f407340d7f1cff36fa299308397422"


let getHate = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: web3.isConnected(),
      web3() {
        return web3
      }
    })
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
}).then(result => {
  return new Promise(async function (resolve, reject) {
    console.log("Getting data from smart contract");
    let hateContract = result.web3().eth.contract(hateAbi);
    let hateInstance = hateContract.at(address);
    let filter = new RegExp('(.*)\\n');
    hateInstance.lastIndex((err, result) => {
      let hateItems = [];
      let i = 0;
      console.log("i: " + i + "  index: " + result)
      for (i = 0; i < result; i++) {
        hateItems.push(new Promise((resolve, reject) => {
          console.log("i: " + i + "  index: " + result)
          let item = {};
          hateInstance.topicIndex(i, (err, result) => {
            console.log("i: " + i + "  index: " + result)
            item.hextopic = result;
            let topic = filter.exec(web3.toAscii(result));
            topic != null ? item.topic = web3.toAscii(result) : item.topic = web3.toAscii(result);
            hateInstance.hated(result, (err, result) => {
              item.value = result.toNumber();
              resolve(item);
            });
          });
        }));
      }
      Promise.all(hateItems).then(values => {
        resolve(values);
      })
    });
  })
})

export default getHate;