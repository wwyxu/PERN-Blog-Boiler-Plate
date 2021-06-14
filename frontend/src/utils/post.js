export const shrinkPost = (post) => {
  if (post.length > 80) {
    return post.substring(0, 80) + "...";
  } else {
    return post;
  }
};
