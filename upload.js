document.getElementById('decode-button').addEventListener('click', (event) => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

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
                window.location.href = `https://www.medqr.or.ke/result.html?data=${encodeURIComponent(decryptedData)}`;
            } else {
                alert('No QR code found.');
            }
        };
    };
    reader.readAsDataURL(file);
});

function decryptData(encryptedData) {
    try {
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'encryptionKey').toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null; // Handle the error or return a default value
    }
}
