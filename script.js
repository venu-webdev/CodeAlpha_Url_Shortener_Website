const resultRow = $('.result-row');
const shortBtn = $('#short-btn-btn');
const shortedUrlInput = $('#shorten-url');
const originalUrlInput = $('#original-url');

shortBtn.on('click', async function (e) {
    e.preventDefault();
    const input = $('#input-url');
    const url = input.val();

    if (url.includes('https://') || url.includes('http://')) {
        input.val('');
        if (url.length > 30) {
            originalUrlInput.text(url.substring(0, 30) + "...");
        } else {
            originalUrlInput.text(url);
        }
        originalUrlInput.attr('href', url);
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data = await response.json();
        const shortUrl = data.result.full_short_link2;
        const copyInput = $('#input-copy').val(shortUrl);
        shortedUrlInput.attr('href', shortUrl);
        shortedUrlInput.text(shortUrl);
        resultRow.css('display', 'flex');

    } else {
        alert('Not a valid url');
    }
})

// function copyLink() {
//     // shortedUrlInput.select();
//     // shortedUrlInput.setSelectionRange(0, 99999);
//     // navigator.clipboard.writeText(shortedUrlInput.text());


//     const input_field = $('#shorten-url');

//     input_field.select();// select the input field
//     input_field.setSelectionRange(0, 99999);// For mobile devices
//     navigator.clipboard.writeText(input_field.value)

//     alert("copied to Clipboard");

// }

function copyLink() {
    // set focus to hidden element and select the content
    $('#input-copy').focus();
    // select all the text therein  
    $('#input-copy').select();

    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }

    // clear temporary content
    // $('#input-copy').val('');
    alert("copied to clipboard");
    return succeed;
}
