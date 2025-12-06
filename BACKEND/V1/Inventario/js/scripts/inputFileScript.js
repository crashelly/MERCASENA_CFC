

const fileInput = document.getElementById('file-upload');
const fileNameDisplay = document.getElementById('file-name');
const uploadButton = document.getElementById('upload-btn');

// Display file name after selection
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
        fileNameDisplay.classList.remove('hidden');
        // uploadButton.removeAttribute('disabled');
    } else {
        fileNameDisplay.textContent = 'Ningun archivo seleccionado';
        fileNameDisplay.classList.add('hidden');
        // uploadButton.setAttribute('disabled', 'true');
    }
});



const fileInput2 = document.getElementById('file-upload-edit');
const fileNameDisplay2 = document.getElementById('file-name-edit');
const uploadButton2 = document.getElementById('upload-btn-s');

// Display file name after selection
fileInput2.addEventListener('change', () => {
    if (fileInput2.files.length > 0) {
        fileNameDisplay2.textContent = fileInput2.files[0].name;
        fileNameDisplay2.classList.remove('hidden');
        // uploadButton2.removeAttribute('disabled');
    } else {
        fileNameDisplay2.textContent = 'Ningun archivo seleccionado';
        fileNameDisplay2.classList.add('hidden');
        // uploadButton2.setAttribute('disabled', 'true');
    }
});

