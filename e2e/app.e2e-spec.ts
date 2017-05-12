import { SignUpAppPage } from './app.po';

describe('sign-up-app App', function() {
  let page: SignUpAppPage;

  beforeEach(() => {
    page = new SignUpAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
