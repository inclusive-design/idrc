---
layout: layouts/ideas.njk
title: Ideas
eleventyNavigation:
  key: Ideas
  order: 3
headerBgColor: yellow-500
headerTextColor: black
permalink: "ideas/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.ideas
  size: 6
  alias: posts
---
