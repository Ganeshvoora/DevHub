async function fetchNews(topic) {
    let searchTerm = topic || document.getElementById('searchInput').value.trim();
    if (!searchTerm) {
        searchTerm = 'Technology'; // Default topic
    }

    const loading = document.getElementById('loading');
    const newsContainer = document.getElementById('news-container');
    
    loading.classList.remove('hidden');
    newsContainer.innerHTML = '';

    try {
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            `https://news.google.com/rss/search?q=${searchTerm}&hl=en-IN&gl=IN&ceid=IN:en`
        )}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            newsContainer.innerHTML = "<p class='text-center'>No news found.</p>";
            return;
        }

        data.items.slice(0, 9).forEach(article => {
            const newsCard = `
                <div class="news-item">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available.'}</p>
                    <div class="flex justify-between items-center mt-4">
                        <a href="${article.link}" target="_blank" class="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                            Read More
                        </a>
                        <div class="flex gap-2">
                            <button onclick="shareNews('${article.link}')" class="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                                <i class="fas fa-share-alt"></i>
                            </button>
                            
                        </div>
                    </div>
                </div>
            `;
            newsContainer.innerHTML += newsCard;
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = "<p class='text-center text-red-500'>Failed to load news. Please try again later.</p>";
    } finally {
        loading.classList.add('hidden');
    }
}

function shareNews(url) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this news!',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
}


// Load news on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchNews('Technology');
});

// Add search on Enter key
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchNews();
    }
});
