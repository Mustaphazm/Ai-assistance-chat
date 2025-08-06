document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const newsBtn = document.getElementById('newsBtn');
    const newsModal = document.getElementById('newsModal');
    const closeNewsBtn = document.getElementById('closeNewsBtn');
    const newsList = document.getElementById('newsList');
    const categoryBtns = document.querySelectorAll('.category');
    
    let currentCategory = 'general';
    
    // Category selection
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
        });
    });
    
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // News functionality
    newsBtn.addEventListener('click', getNews);
    closeNewsBtn.addEventListener('click', () => {
        newsModal.style.display = 'none';
    });
    
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        userInput.value = '';
        
        // Show typing indicator
        const typingMsg = addMessage('Typing...', 'ai');
        
        try {
            // For demo purposes, using a simple response
            // In real implementation, this would call your API
            const response = await getAIResponse(message, currentCategory);
            
            // Remove typing indicator and add actual response
            typingMsg.remove();
            addMessage(response, 'ai');
        } catch (error) {
            typingMsg.remove();
            addMessage("Sorry, I couldn't respond right now.", 'ai');
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageDiv;
    }
    
    async function getAIResponse(message, category) {
        // This is a simplified response generator
        // In a real app, you would call your backend API
        
        const responses = {
            general: [
                "I understand you're asking about general topics. Could you provide more details?",
                "That's an interesting question. Here's what I think...",
                "I'm here to help with general information. What specifically would you like to know?"
            ],
            sports: [
                "Sports are exciting! Which sport or team are you interested in?",
                "I can help with sports information. What would you like to know?",
                "Sports news and updates are available. What specific information do you need?"
            ],
            tech: [
                "Technology is fascinating! What tech topic are you interested in?",
                "I can help with tech questions. What would you like to know?",
                "From gadgets to software, I'm here to help with tech information."
            ],
            cooking: [
                "Cooking is a wonderful skill! What recipe or cooking technique do you need help with?",
                "I'd be happy to help with cooking questions. What are you making?",
                "From ingredients to techniques, I'm here to assist with your cooking needs."
            ],
            news: [
                "I can help with news information. What topic are you interested in?",
                "For the latest news, what specific area would you like to know about?",
                "News updates are available. What type of news are you looking for?"
            ]
        };
        
        const categoryResponses = responses[category] || responses.general;
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }
    
    async function getNews() {
        newsModal.style.display = 'block';
        newsList.innerHTML = '<p>Loading news...</p>';
        
        try {
            // In a real app, this would call your news API
            // For demo, we'll use mock data
            const mockNews = [
                {
                    title: "Breaking: Major Tech Announcement",
                    description: "A leading tech company has announced a revolutionary new product.",
                    url: "#"
                },
                {
                    title: "Sports Championship Finals",
                    description: "The championship finals are set to begin next week with top teams competing.",
                    url: "#"
                },
                {
                    title: "New Cooking Trend Takes Over",
                    description: "A new cooking method is gaining popularity among home chefs.",
                    url: "#"
                }
            ];
            
            displayNews(mockNews);
        } catch (error) {
            newsList.innerHTML = '<p>Could not load news at this time.</p>';
        }
    }
    
    function displayNews(articles) {
        newsList.innerHTML = articles.map(article => `
            <div class="news-item">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `).join('');
    }
});
