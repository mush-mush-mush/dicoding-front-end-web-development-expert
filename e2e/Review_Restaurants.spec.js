/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('adding review', async ({ I }) => {
  const firstResto = locate('restaurant-card').first();
  I.click(firstResto);

  const username = 'e2e username23467';
  const review = 'e2e review test23467';

  I.seeElement('#username');
  I.fillField('#username', username);
  I.pressKey('Enter');

  I.seeElement('#userReview');
  I.fillField('#userReview', review);
  I.pressKey('Enter');

  I.click('#formReview button');

  I.wait(1);
  I.refreshPage();

  const lastReview = locate('.card-body__title').last();
  const textLastReview = await I.grabTextFrom(lastReview);

  const lastUser = locate('.user-profile__name').last();
  const textLastUser = await I.grabTextFrom(lastUser);

  assert.strictEqual(review, textLastReview);
  assert.strictEqual(username, textLastUser);
});
