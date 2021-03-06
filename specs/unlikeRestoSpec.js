/* eslint-disable no-undef */
import FavRestaurantIdb from '../src/scripts/models/idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Remove from favorite', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavRestaurantIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await FavRestaurantIdb.deleteResto(1);
  });

  it('should display remove widget when the restaurant has been added', async () => {
    await TestFactories.createLikeButtonRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove from favorite"]')).toBeTruthy();
  });

  it('should not display remove widget when the restaurant has been added', async () => {
    await TestFactories.createLikeButtonRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="add to favorite"]')).toBeFalsy();
  });

  it('should be able to remove added restaurant from the list', async () => {
    await TestFactories.createLikeButtonRestaurant({ id: 1 });

    document.querySelector('[aria-label="remove from favorite"]').dispatchEvent(new Event('click'));

    expect(await FavRestaurantIdb.getAllResto()).toEqual([]);
  });

  it('should not throw error if the removed restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonRestaurant({ id: 1 });

    await FavRestaurantIdb.deleteResto(1);
    document.querySelector('[aria-label="remove from favorite"]').dispatchEvent(new Event('click'));

    expect(await FavRestaurantIdb.getAllResto()).toEqual([]);
  });
});
