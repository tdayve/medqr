document.getElementById('decode-button').addEventListener('click', (event) => {
    console.log('Scan QR Code button clicked');
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function() {
        console.log('File read successfully');
        const img = new Image();
        img.src = reader.result;
        img.onload = function() {
            console.log('Image loaded successfully');
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                console.log('QR code found');
                const decryptedData = decryptData(code.data);
                window.location.href = `https://www.medqr.or.ke/result.html?data=${encodeURIComponent(decryptedData)}`;
            } else {
                alert('No QR code found.');
            }
        };
    };
    reader.readAsDataURL(file);
});

function decryptData(encryptedData) {
    // Implement your decryption logic here
    return atob(encryptedData); // Example using Base64 decoding
}
