---
layout: layouts/page.njk
title: This is a test page
headerBgColor: indigo-100
headerBorderColor: indigo-100
headerTextColor: black
sections: []
---
{% youtube "https://www.youtube.com/watch?v=r6HQ4OtL4nA" %}

This is some text that appears before an image.

{% imageAndText "/media/3-dimensions.png", "Image of 3 dimensions of inclusive design.", "right", "center" %}


{% youtube "https://www.youtube.com/watch?v=r6HQ4OtL4nA" %}

This is a description that should appear to the left of the image.
{% endimageAndText %}

This is text that appears after an image.