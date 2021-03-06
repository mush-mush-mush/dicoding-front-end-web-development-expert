import '../templates/components/_restaurantCard';
import FavoriteRestoDB from '../../models/idb';
import renderLoading from '../templates/loading';
import renderError from '../templates/errorMessage';

const Favorite = {
  async render() {
    return `
    <header class="hero">
        <picture>
                <source media="(max-width: 960px)" srcset="./images/heros/hero-image_2-m.jpg" class="hero-img lazyload" alt="hero image" type="image/jpg">
                <source media="(max-width: 480px)" srcset="./images/heros/hero-image_2-m.webp" class="hero-img lazyload" alt="hero image" type="image/webp">
                <source media="(max-width: 480px)" srcset="./images/heros/hero-image_2-s.jpg" class="hero-img lazyload" alt="hero image" type="image/jpg">
                <source media="(max-width: 480px)" srcset="./images/heros/hero-image_2-s.webp" class="hero-img lazyload" alt="hero image" type="image/webp">
                <img src="./images/heros/hero-image_2.jpg" class="hero-img" alt="hero image lazyload" type="image/jpg">
                <img src="./images/heros/hero-image_2.webp" class="hero-img" alt="hero image lazyload" type="image/webp">
        </picture>
        <div class="hero-container container">
            <h1 class="hero-title">Discover the best restaurant for you</h1>
        </div>
      </header>
    <div class="content container">
        <section class="section">
        <h2 class="section-heading">Your Favorite</h2>
          <div class="section-content favorite-list">
            <h1
          </div>
        </section>
        </div>
        `;
  },

  async afterRender() {
    const favoriteList = document.querySelector('.favorite-list');
    favoriteList.innerHTML = renderLoading();

    try {
      favoriteList.innerHTML = '';
      const restaurants = await FavoriteRestoDB.getAllResto();

      if (!restaurants) throw 'Failed to fetch';
      if (restaurants.length < 1) throw 'Nothing has been added';

      restaurants.map((item) => {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.data = item;
        favoriteList.insertAdjacentElement('beforeend', restaurantCard);
      });
    } catch (error) {
      console.log(error);
      favoriteList.innerHTML = '';
      favoriteList.innerHTML = renderError(error);
    }
  },
};

export default Favorite;
