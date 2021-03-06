import DrawerInitiator from '../utils/drawer-init';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content, menuLinks }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._menuLinks = menuLinks;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      menuLinks: this._menuLinks,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipContentBtn = document.querySelector('.skip-link');
    skipContentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#mainContent').focus();
    });
  }
}

export default App;
