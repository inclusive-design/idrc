---
layout: layouts/news.njk
title: News
eleventyNavigation:
  key: News
  order: 1
headerbgcolor: blue-500
permalink: "news/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.posts
  size: 6
  alias: posts
---
