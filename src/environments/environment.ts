const baseURL = 'http://localhost:1337';

export const environment = {
  production: false,
  baseApiURL: baseURL,
  commentsApiURL: `${baseURL}/comments`,
  usersApiURL: `${baseURL}/users`,
  authApiURL: `${baseURL}/auth`,
  tweetsApiURL: `${baseURL}/tweets`,
  uploadApiURL: `${baseURL}/upload`
};
