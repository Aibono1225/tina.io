import matter from 'gray-matter';

const fg = require('fast-glob');
var fs = require('node:fs');
var path = require('node:path');

export async function fetchBlogs() {
  const directory = path.resolve('./content/blog');
  const files = await fg(`${directory}/**/*.mdx`);

  return files.map((fileName) => {
    const fullPath = path.resolve(directory, fileName);

    const slug = fullPath
      .match(/.+?\/blog\/(.+?)$/)[1]
      .split('.')
      .slice(0, -1)
      .join('.');

    const file = fs.readFileSync(fullPath);
    const post = matter(file);
    return {
      data: { ...post.data, slug },
      content: post.content,
    };
  });
}

export async function fetchRelevantBlogs() {
  const blogs = await fetchBlogs();
  return blogs.filter(
    (post) =>
      new Date(post.data.date).getTime() >= new Date('2021-04-01').getTime(),
  );
}
