---
layout: layouts/page.njk
title: This is a test page
headerBgColor: indigo-100
headerBorderColor: indigo-100
headerTextColor: black
sections: []
---
{% youtube "https://www.youtube.com/watch?v=r6HQ4OtL4nA" %}

{% imagePosition "/media/80-20-disparity.png", "80 20 disparity", "center", "100%", "k" %}

{% imageAndText "/media/3-dimensions.png", "Three dimensions", "right", "center" %}
This is some text that appears along the image.
{% endimageAndText %}

This is some text that appears before an image.

This is text that appears after an image.