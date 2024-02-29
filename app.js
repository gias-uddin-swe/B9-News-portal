const loadAllCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("category-bar-container");
      data.data.news_category.slice(0, 5).forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <button onclick="loadNewsByCategory('${category.category_id}')" class="category-btn"> ${category.category_name} </button>
          `;
        container.appendChild(div);
      });
    });
};

const loadNewsByCategory = (category) => {
  handleSpinner("block");
  fetch(`https://openapi.programming-hero.com/api/news/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      displayNews(data.data);
    });
};

const displayNews = (news) => {
  handleSpinner("none");
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  news.forEach((singleNews) => {
    const div = document.createElement("div");
    div.classList.add("singleNews");
    div.innerHTML = `

        <div class="news-photo">
          <img
            src=${singleNews.image_url}
            alt=""
          />
        </div>
        <div class="news-info">
          <div class="news-header">
            <h4>${singleNews.title.slice(0, 20)}</h4>
            <p class="news-badge">
            ${singleNews.rating.badge} <sup> <h6 class="news-rating"> ${
      singleNews.rating.number
    }</h6></sup>
            </p>
          </div>
          <p>
          ${singleNews.details.slice(0, 200)}
          </p>

          <div class="news-footer">
            <div class="author">
              <div class="">
                <img
                  class="author-img"
                  src=${singleNews.author.img}
                  alt=""
                />
              </div>
              <div class="author-info">
                <h6> ${singleNews.author.name}</h6>
                <p>Date: ${singleNews.author.published_date}</p>
              </div>
            </div>
            <div class="Views author">
              <img
                class="view-img"
                src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/view-icon.png"
                alt=""
              />
              <p>${singleNews.total_view}</p>
            </div>
            <div class="details-btn-container">
              <button onclick="handleDetails(${JSON.stringify({name:"gias"})})" class="details-btn">Details</button>
            </div>
        </div>
      </div>
      `;
    newsContainer.appendChild(div);
  });
};

const handleSearch = () => {
  const value = document.getElementById("search-box").value;
  if (value) {
    loadNewsByCategory(value);
  } else {
    alert("Please enter valid string ");
  }
};

const handleSpinner = (status) => {
  document.getElementById("loading-spiner").style.display = status;
};

const handleDetails = (data) => {
  console.log(data);
};

loadNewsByCategory("01");
loadAllCategory();
