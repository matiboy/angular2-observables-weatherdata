import { Angular2ObservablesDatedataPage } from './app.po';

describe('angular2-observables-datedata App', function() {
  let page: Angular2ObservablesDatedataPage;

  beforeEach(() => {
    page = new Angular2ObservablesDatedataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
