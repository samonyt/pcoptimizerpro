const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const fs = require('fs');

(async () => {
    const formData = new URLSearchParams();

    formData.append('createserialkey', '');
    formData.append('dpdProductName', '1');
    formData.append('txtEmail', 'abc@def.com');
    formData.append('txtItemNo', '123');
    formData.append('txtOrderNo', '123');
    formData.append('dpdExpiry', '5');

    let opts = {
        method: 'POST',
        headers: {
            cookie: 'ASPSESSIONIDQWQDADTB=BFLKPJMDBAKNFIJHILNHKIAB'
        },
        body: formData
    }

    const keyRegex = /(\w\w\w\w-\w\w\w\w-\w\w\w\w)<br \/>/;

    while (true) {
        let replyData = await fetch('https://www.pcoptimizerpro.com/admin/docreatelicense.asp', opts);

        let data = await replyData.text();

        if (keyRegex.test(data)) {
            let key = data.match(keyRegex)[1];

            console.log(key);
            fs.appendFile('keys.txt', '[Key] ' + key + ' ', err => {
                if (err) throw err;
            });
        }
    }
})();