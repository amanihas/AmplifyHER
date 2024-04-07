window.onload = function() {
    // Path to your text file
    const filePath = 'output.txt';

    // Using fetch API to get the file content
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            // Display the file content in the <div> element
            const fileContentElement = document.getElementById('fileContent');
            fileContentElement.innerText = text;
        })
        .catch(error => {
            console.error('There was a problem fetching the file:', error);
        });
};