$(document).ready(function() {
    fetch('/playlist') // Assuming Flask serves the playlist data at this endpoint
        .then(response => response.json())
        .then(data => {
            const playlist = document.getElementById('playlist');
            data.playlist.forEach(song => {
                const li = document.createElement('li');
                li.textContent = song;
                playlist.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching playlist:', error));
});