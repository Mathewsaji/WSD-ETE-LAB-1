
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const sortBtn = document.getElementById('sort-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');


let newsData = [];
let currentPage = 1;
let newsPerPage = 3;
let sorted = false;


async function fetchNews() {
    try {
        const response = await fetch('news.json');
        const data = await response.json();
        newsData = data;
        displayNews();
    } catch (error) {
        console.error(error);
    }
}


function displayNews() {
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const paginatedNews = newsData.slice(startIndex, endIndex);

    
    newsContainer.innerHTML = '';

    
    paginatedNews.forEach((news) => {
        const newsArticle = document.createElement('article');
        newsArticle.innerHTML = `
            <h2>${news.title}</h2>
            <p>Author: ${news.author}</p>
            <p>Published at: ${news.publishedAt}</p>
            <p>${news.description}</p>
            <img src="${news.urlToImage}" alt="${news.title}">
            <p><a href="${news.url}">Read more</a></p>
        `;
        newsContainer.appendChild(newsArticle);
    });
}


function sortNewsByDate() {
    if (!sorted) {
        newsData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        sorted = true;
    } else {
        newsData.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        sorted = false;
    }
    displayNews();
}


function handleSearchInput() {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredNews = newsData.filter((news) => {
        return (
            news.title.toLowerCase().includes(searchQuery) ||
            news.author.toLowerCase().includes(searchQuery) ||
            news.description.toLowerCase().includes(searchQuery)
        );
    });
    newsData = filteredNews;
    displayNews();
}

function handlePagination(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < Math.ceil(newsData.length / newsPerPage)) {
        currentPage++;
    }
    displayNews();
}


fetchNews();
searchInput.addEventListener('input', handleSearchInput);
sortBtn.addEventListener('click', sortNewsByDate);
prevBtn.addEventListener('click', () => handlePagination('prev'));
nextBtn.addEventListener('click', () => handlePagination('next'));
