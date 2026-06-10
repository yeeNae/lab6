const API_URL = 'https://xinkihbesdckpcopslfl.supabase.co/rest/v1/article';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbmtpaGJlc2Rja3Bjb3BzbGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MjgyOTIsImV4cCI6MjA5NjUwNDI5Mn0.VIyJezC7lcGE_iecjlGmtjzL64dVXOn7B-i7S7YprvM';

async function getArticles() {
    try {
        const response = await fetch(`${API_URL}?select=*`, {
            method: 'GET',
            headers: {
                'apikey': API_KEY,
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        const data = await response.json();
        
        renderArticles(data);
    } catch (error) {
        console.error('Błąd podczas pobierania:', error);
        document.getElementById('articles-list').innerHTML = '<p class="text-red-500">Błąd ładowania artykułów.</p>';
    }
}

function renderArticles(articles) {
    const listContainer = document.getElementById('articles-list');
    listContainer.innerHTML = '';

    if (articles.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500">Brak artykułów w bazie.</p>';
        return;
    }

    articles.forEach(article => {
        const date = new Date(article.created_at).toLocaleDateString('pl-PL');
        
        listContainer.innerHTML += `
                <div class="bg-white p-5 rounded shadow border-l-4 border-blue-500">
                    <h3 class="text-xl font-bold">${article.title}</h3>
                    <p class="text-gray-600 mb-2">${article.subtitle || ''}</p>
                    <p class="text-sm text-gray-400 mb-4">Napisał(a): ${article.author} | Dodano: ${date}</p>
                    <p class="text-gray-800 whitespace-pre-wrap">${article.content}</p>
                </div>
            `;
    });
}

document.getElementById('add-article-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const newArticle = {
        title: document.getElementById('title').value,
        subtitle: document.getElementById('subtitle').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'apikey': API_KEY,
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
        });

        if (response.status === 201) {
            alert('Artykuł został poprawnie dodany!');
            document.getElementById('add-article-form').reset();
            getArticles();
        } else {
            alert('Wystąpił błąd podczas dodawania artykułu.');
        }
    } catch (error) {
        console.error('Błąd dodawania:', error);
    }
});

getArticles();
