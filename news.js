const apiKey = "99fe1e189e484b5eac60d4b700048d71";
const newsGrid = document.getElementById('newsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');

async function fetchNews(category = 'technology') {
    try {
        loadingSpinner.classList.remove('hidden');
        newsGrid.innerHTML = '';

        const categoryQueries = {
            'technology': 'technology',
            'ai': 'artificial intelligence machine learning',
            'web': 'web development javascript',
            'programming': 'programming software development'
        };

        const query = categoryQueries[category.toLowerCase()] || 'technology';
        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok' && data.articles) {
            displayNews(data.articles.slice(0, 12)); // Display first 12 articles
        } else {
            throw new Error('Failed to fetch news');
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        newsGrid.innerHTML = `
            <div class="col-span-full text-center text-red-500">
                <p>Failed to load news. Please try again later.</p>
            </div>`;
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        if (!article.title || !article.url) return;

        const newsCard = `
            <div class="news-card bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
                <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" 
                     alt="${article.title}"
                     class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">${article.title}</h3>
                    <p class="text-gray-400 mb-4 line-clamp-2">${article.description || ''}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-primary">${article.source.name}</span>
                        <a href="${article.url}" target="_blank" 
                           class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                           Read More
                        </a>
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
            btn.classList.add('active');
            fetchNews(btn.dataset.category);
        });
    });
});
