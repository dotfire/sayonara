import DiscourseURL from 'discourse/lib/url';

export default {
  name: 'sayonara-redirects',
  after: 'url-redirects',

  initialize(container) {

    const currentUser = container.lookup('current-user:main');

    if (currentUser) {
      const username = currentUser.get('username');
      DiscourseURL.rewrite(new RegExp(`^/u/${username}/?$`, "i"), `/u/${username}/activity/bookmarks`);
    }

    DiscourseURL.rewrite(/^\/u\/([^\/]+)\/?$/, "/u/$1/activity/bookmarks", {
      exceptions: ['/u/account-created', '/users/account-created', '/u/password-reset', '/users/password-reset']
    });
  }
};
