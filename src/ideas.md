---
layout: layouts/ideas.njk
title: Ideas
intro: Thoughts, ideas, and reflections based on our work in the field. 
eleventyNavigation:
  key: Ideas
  order: 6
headerBgColor: yellow-500
headerBorderColor: yellow-200
headerTextColor: black
permalink: "ideas/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.ideas
  size: 6
  alias: posts
---
