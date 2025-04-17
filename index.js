function fetchWordleData(url, callback) {
    fetch(url)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => console.error('Error fetching wordle data:', error));
  }

  function displayWordles() {
    fetchWordleData('https://venokii.github.io/wordle/wordle.json', function(wordleData) {
      const today = new Date().toISOString().slice(0, 10);
      const todaysWordle = wordleData[today];
      if (todaysWordle) {
        document.getElementById('todaysWordle').innerHTML = `<h2 class="text-4xl font-bold mb-4">Today's Wordle</h2><p class="text-2xl">${todaysWordle}</p>`;
      } else {
        document.getElementById('todaysWordle').innerHTML = `<h2 class="text-4xl font-bold mb-4">Today's Wordle</h2><p class="text-2xl">No wordle for today yet!</p>`;
      }

      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const tomorrowsWordle = wordleData[tomorrow];
      if (tomorrowsWordle) {
        document.getElementById('tomorrowsWordle').innerHTML = `<h2 class="text-4xl font-bold mb-4">Tomorrow's Wordle</h2><p class="text-2xl">${tomorrowsWordle}</p>`;
      } else {
        document.getElementById('tomorrowsWordle').innerHTML = `<h2 class="text-4xl font-bold mb-4">Tomorrow's Wordle</h2><p class="text-2xl">No wordle for tomorrow yet!</p>`;
      }

      let allWordlesHTML = '<h2 class="text-4xl font-bold mb-4">All Wordles</h2>';
      Object.keys(wordleData).forEach(date => {
        if (date !== today && date !== tomorrow) {
          allWordlesHTML += `<p class="text-xl mb-2"><strong>${date}</strong>: ${wordleData[date]}</p>`;
        }
      });
      document.getElementById('allWordles').innerHTML = allWordlesHTML;
    });
  }

  document.getElementById('showAllWordlesBtn').addEventListener('click', function() {
    const allWordlesDiv = document.getElementById('allWordles');
    if (allWordlesDiv.classList.contains('hidden')) {
      allWordlesDiv.classList.remove('hidden');
      this.textContent = 'Hide All Wordles';
    } else {
      allWordlesDiv.classList.add('hidden');
      this.textContent = 'Show All Wordles';
    }
  });

  document.getElementById('donateBtn').addEventListener('click', function() {
    document.getElementById('donateModal').classList.remove('hidden');
  });

  document.getElementById('closeDonateBtn').addEventListener('click', function() {
    document.getElementById('donateModal').classList.add('hidden');
  });

  displayWordles();
