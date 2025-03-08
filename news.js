const apiKey = "99fe1e189e484b5eac60d4b700048d71";
const newsGrid = document.getElementById('newsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');

async function fetchNews(category = 'technology') {
    try {
        loadingSpinner.style.display = 'block';
        newsGrid.innerHTML = '';

        // Convert category names to query parameters
        let query = '';
        switch(category.toLowerCase()) {
            case 'ai':
                query = 'artificial intelligence';
                break;
            case 'web dev':
                query = 'web development';
                break;
            default:
                query = 'technology';
        }

        const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            throw new Error('Failed to fetch news');
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        newsGrid.innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        const newsCard = `
            <div class="news-card">
                <img src="${article.urlToImage || 'https://picsum.photos/300/200'}" alt="${article.title}">
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.description || ''}</p>
                    <div class="news-meta">
                        <span class="source">${article.source.name}</span>
                        <a href="${article.url}" target="_blank" class="read-more">Read More</a>
                    </div>
                </div>
            </div>
        `;
        newsGrid.innerHTML += newsCard;
    });
}

// Initialize news page
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            const category = e.target.textContent; // Use button text instead of dataset
            fetchNews(category);
        });
    });
});
