let currentAccount = null;
const MERCHANT_ACCOUNT = '0x75bd01A1608E68557A59F86856130bB7dbe6102e'


/**
    To Generate a random ID
    source:- https://stackoverflow.com/a/1349426/275002
**/
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

function utf8ToHex(str) {
      return Array.from(str).map(c =>
        c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
        encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
      ).join('');
}


function detectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        return true
    } else {
        return false
    }
}

function set_wallet_address(wallet_address) {
    $.get("set_wallet/"+wallet_address, function(data, status){

  });
}

function addOrder(wallet_address,tx,name,invoice_id) {
    $.post("add_order/",
                        { wallet_address: wallet_address, tx: tx,name:name,invoice_id:invoice_id },
                         function(data, status){
                                if(data == 'OK') {
                                    alert('Order placed successfully')
                                } else {
                                    alert('Order could not place successfully')
                                }
    });
}

function handleAccountsChanged(accounts) {
    console.log('Calling HandleChanged')

    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        $('#enableMetamask').html('<img width="50" height="50" src="data:image/jpeg;base64,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" alt=""> Connected')
        $('#wallet_address').val(currentAccount)
        set_wallet_address(currentAccount)
        $('#status').html('')

        if(currentAccount != null) {
            // Set the button label
            $('#enableMetamask').html('<img width="50" height="50" src="data:image/jpeg;base64,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" alt=""> Connected')
        }
    }
    console.log('WalletAddress in HandleAccountChanged ='+currentAccount)
}

function connect() {
    console.log('Calling connect()')
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
    if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
        $('#status').html('You refused to connect Metamask')
    } else {
        console.error(err);
    }
    });
}

$( document ).ready(function() {

    m = detectMetaMask()
    if(m) {
        $('#enableMetamask').removeClass('meta-gray')
        $('#enableMetamask').addClass('meta-normalcurrentAccount')
        $('#enableMetamask').attr('disabled',false)
        connect()

    } else {
        $('#enableMetamask').attr('disabled',true)
        $('#enableMetamask').removeClass('meta-normal')
        $('#enableMetamask').addClass('meta-gray')
    }

    $('#enableMetamask').click(function() {
        connect()
    });

    $('.btn-buy').click(function() {
        let price = $(this).data("price")
        let name = $(this).data("name")
        console.log(name,price)
        eth_wei = ethUnit.toWei(price, 'ether');
        console.log('RESULT ='+eth_wei)
        console.log('Wallet ='+currentAccount)
        console.log('RESULT IN HEX ='+eth_wei.toString(16))
        let invoice_id = 'INV-'+makeid(5)
        console.log(invoice_id)

        const transactionParameters = {
              nonce: '0x00', // ignored by MetaMask
              gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
              gas: '0x22710', // customizable by user during MetaMask confirmation.
              to: MERCHANT_ACCOUNT, // Required except during contract publications.
              from: currentAccount, // must match user's active address.
              value: eth_wei.toString(16),
              data:utf8ToHex(invoice_id),
              chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };
            console.log(transactionParameters)

            if(currentAccount != null) {
                const txHash = ethereum.request({
                 method: 'eth_sendTransaction',
                 params: [transactionParameters],
                })
                .then(function(tx){
                    console.log('Transaction Hash ='+tx)
                    console.log('Wallet Inside ='+currentAccount)
                    console.log('Product Name ='+name)
                    console.log('Invoice ID = '+invoice_id)
                    addOrder(currentAccount,tx,name,invoice_id)
                })
                .catch((error) => {
                    console.log('Error during the transaction')
                    console.log(error)
                });
            }

    });
})