import { UtgPage } from './app.po';

describe('utg App', () => {
  let page: UtgPage;

  beforeEach(() => {
    page = new UtgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
