---
layout: layouts/news.njk
title: News
eleventyNavigation:
  key: News
  parent: About
  order: 2
headerBgColor: blue-100
headerBorderColor: blue-500
headerTextColor: black
secondaryNavigation:
  key: About
  label: More about us
permalink: "/news/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.news
  size: 6
  alias: posts
---
