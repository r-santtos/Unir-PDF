document.getElementById('mergeButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var files = fileInput.files;

    if (files.length < 2) {
        alert('Selecione pelo menos dois arquivos PDF.');
        return;
    }

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('pdfs', files[i]);
    }

    fetch('/merge-pdfs', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'merged.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Erro:', error));
});
