
const decode =document.querySelector('.button')

decode.addEventListener('click', (event)=> {
    const fileInput=document.querySelector(".file-input")
    const file = fileInput.files[0];
    if (true) {

    const reader = new FileReader();
    reader.onload = function() {
        const img = new Image();
        img.src = reader.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                const decryptedData = decryptData(code.data);
                window.location.href = `result.html=${encodeURIComponent(decryptedData)}`;
            } else {
                alert('No QR code found.');
            }
        };
    };
    reader.readAsDataURL(file);}
    else{window.alert("no file")}
});

function decryptData(encryptedData) {
    // Implement your decryption logic here
    return atob(encryptedData); // Example using Base64 decoding
}
