document.addEventListener('DOMContentLoaded', function () {
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        var btn = dropdown.querySelector('.dropbtn');
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('open');
                }
            });
            dropdown.classList.toggle('open');
        });
    });

    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('open');
            });
        }
    });
});

/* Chatbot Functions and Initialization */
let chatbot = document.getElementById('chatbot');
let chatbotIcon = document.getElementById('chatbot-icon');
let closeChatbotBtn = document.getElementById('close-chatbot');
let chatbotSubmitBtn = document.getElementById('chatbot-submit');
let chatbotInput = document.getElementById('chatbot-input');
let chatbotConversation = document.getElementById('chatbot-conversation');

let questions = [
    "Hi there! What's your name?",
    "Great! What's your email?",
    "Can I have your phone number?",
    "Where are you located?",
    "Please tell us your message.",
    "Finally, what type of case are you dealing with?"
];

let currentQuestionIndex = 0;

// Function to handle sending a message
function handleUserResponse() {
    let userInput = chatbotInput.value.trim();
    if (userInput === '') return;

    // Display user message
    let userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput;
    chatbotConversation.appendChild(userMessage);
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

    // Clear input field
    chatbotInput.value = '';

    // Proceed to next question or end
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        askNextQuestion();
    } else {
        let botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        chatbotConversation.appendChild(botMessage);

        typeMessage("Thank you! We'll get back to you soon.", botMessage, () => {
            chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
        });

        chatbotInput.style.display = 'none';
        chatbotSubmitBtn.style.display = 'none';
    }
}

// Function to display the next question
function askNextQuestion() {
    let botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    chatbotConversation.appendChild(botMessage);

    typeMessage(questions[currentQuestionIndex], botMessage, () => {
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
    });
}

// Function to type message with delay
function typeMessage(text, element, callback) {
    let index = 0;
    let typingEffect = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        if (index === text.length) {
            clearInterval(typingEffect);
            if (callback) callback();
        }
    }, 50); // Adjust typing speed here
}

// Function to reset the chatbot
function resetChatbot() {
    // Clear the conversation history
    chatbotConversation.innerHTML = '';

    // Reset state to initial
    currentQuestionIndex = 0;
    
    // Display input fields again
    chatbotInput.style.display = 'block';
    chatbotSubmitBtn.style.display = 'block';
}

// Function to toggle chatbot visibility
function toggleChatbot() {
    chatbot.style.display = chatbot.style.display === 'none' || chatbot.style.display === '' ? 'flex' : 'none';
    chatbotIcon.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}

// Event listeners
chatbotSubmitBtn.addEventListener('click', handleUserResponse);
chatbotInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleUserResponse();
    }
});

closeChatbotBtn.addEventListener('click', () => {
    chatbot.style.display = 'none';
    chatbotIcon.style.display = 'flex';
    setTimeout(() => {
        chatbotIcon.classList.add('shake');
    }, 60000);

    // Reset the chatbot state
    resetChatbot();
});

chatbotIcon.addEventListener('click', () => {
    chatbot.style.display = 'flex';
    chatbotIcon.style.display = 'none';
    chatbotIcon.classList.remove('shake');

    // Start or restart the conversation
    if (currentQuestionIndex === 0) {
        askNextQuestion();
    }
});

// Show chatbot on page load
chatbot.style.display = 'flex';
askNextQuestion(); // Ensure this is called only once, and check initialization logic if necessary
