//const pay = require('./ilps') << comment this
const con = require('./conn')
const ilp = require('ilp')
const spsp = require('ilp-protocol-spsp')

function querypay(){

    async function pay (recipient, amount) {
        const plugin = ilp.createPlugin()
        await plugin.connect()
        await spsp.pay(plugin, {
          receiver: recipient,
          sourceAmount: amount
        })
        process.exit(0)
       }

  con.query("SELECT * FROM `pay_list` where `status` = 1", function (err, result, fields) {
    if (err) throw err;
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            // use '$spsp.ilp-test.com' if you're on the testnet
               pay(result[i].receiver,
                result[i].sourceAmount)
            console.log('Receiver: ', result[i].receiver);
            console.log('sourceAmount: ', result[i].sourceAmount);                
        }
    } else {console.log("Nobody to pay")}
    });    
}
    module.exports = querypay;
