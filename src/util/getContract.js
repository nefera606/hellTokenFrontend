import Web3 from 'web3'
import hateAbi from './hateAbi'

const address = "0xa9edb6a9c1f407340d7f1cff36fa299308397422"


let getContract = new Promise(function (resolve, reject) {
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
    resolve(hateInstance);
  });
})

export default getContract;
