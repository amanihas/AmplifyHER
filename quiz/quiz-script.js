

$(document).ready(function() {

    // Handle button click to generate playlist
  //   $('#generatePlaylistBtn').on('click', function() {
  //     window.location.href = 'http://127.0.0.1:5500/playlist'; // Navigate to playlist page
  // })

  fetch('/songs')
      .then(response => response.json())
      .then(data => {
          const songList = document.getElementById('song-list');
          data.songs.forEach(song => {
              const li = document.createElement('li');
              li.textContent = song;
              songList.appendChild(li);
          });
      })
      .catch(error => console.error('Error fetching songs:', error));

  // Handle button click to view playlist
  // document.getElementById('generatePlaylistBtn').addEventListener('click', function() {
  //     window.location.href = '/playlist.html'; // Navigate to playlist page
  // });

  var questions = [
  {
    // Q1: Energy level
    question: "What is the mood of the music you are looking for?",
    choices: ["Reflective", "Mellow", "Dramatic", "Energetic"]
  },
  {
    // Q2: Instrumentalness
    question: "What is your prefered level of lyrics in a song?",
    choices: ["No lyrics", "Minimal lyrics", "Moderate lyrics", "Abundant lyrics"]
  }, 
  {
    // Q3: Danceability
    question: "Where do you most enjoy listening to music?",
    choices: ["Laying in bed", "Walking in the park", "At the gym", "Anywhere I can dance"]
  },
  {
    // Q4: Genre
    question: "What genre of music do you enjoy the most?",
    choices: ["Pop/Indie", "Electronic", "Rock/Alternative", "Rap"]
  }, 
  {
    // Q5: Mood
    question: "How would others describe you",
    choices: ["Quiet", "Chill", "Classy", "Positive"]
  }];
  
  var questionCounter = 0; // Tracks question number
  var selections = []; // Array containing user choices
  var quiz = $('#quiz'); // Quiz div object

  // Display initial question
  displayNext();

  // questions[i].choices[selections[i]]

  // Event listener for answer choice buttons to move to the next question
  $(document).on('click', '.answer-button', function() {
    var choiceIndex = $(this).data('index');
    selections[questionCounter] = choiceIndex; // Save user choice
    questionCounter++;
    displayNext();
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter--;
    displayNext();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      class: 'question-container',
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var answerButtons = createAnswerButtons(index);
    qElement.append(answerButtons);

    return qElement;
  }

  // Creates rectangular answer choice buttons
  function createAnswerButtons(index) {
    var buttonContainer = $('<div class="answer-container">');
    var choices = questions[index].choices;

    for (var i = 0; i < choices.length; i++) {
      var button = $('<div class="answer-button">').text(choices[i]);
      button.attr('data-index', i); // Set data attribute to track choice
      buttonContainer.append(button);
    }

    return buttonContainer;
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
      } else {
        var answersElem = displayAnswers();
        quiz.append(answersElem).fadeIn();
        $('#prev').hide();
      }
    });
  }

  // var energy, lyrics, dance, mood;

  // if (questions[0].choices[selections[i]] == 0)
  //   energy = 0.25;
  // else if (questions[0].choices[selections[i]] == 1)
  //   energy = 0.50;
  // else if (questions[0].choices[selections[i]] == 2)
  //   energy = 0.75;
  // else if (questions[0].choices[selections[i]] == 3)
  //   energy = 1.00;

// Displays user selections for each question
function displayAnswers() {
  var answers = $('<div>', { id: 'answers' });
  var energy, lyrics, dance;
  var categories = [energy, lyrics, dance];

  for (i = 0; i < categories.length; i++)
  {
    if (selections[i] == 0) categories[i] = 0.25;
      else if (selections[i] == 1) categories[i] = 0.50;
      else if (selections[i] == 2) categories[i] = 0.75;
      else if (selections[i] == 3) categories[i] = 1.00;
  }

  // Calculate energy based on user selection for each question
  if (selections[0] == 0) energy = 0.25;
    else if (selections[0] == 1) energy = 0.50;
    else if (selections[0] == 2) energy = 0.75;
    else if (selections[0] == 3) energy = 1.00;

  for (var i = 0; i < selections.length; i++) {
    var answer = $('<p>').text('Question ' + (i + 1) + ': You chose ' + questions[i].choices[selections[i]] + energy);
    answers.append(answer);
  }

  return answers;
}
});