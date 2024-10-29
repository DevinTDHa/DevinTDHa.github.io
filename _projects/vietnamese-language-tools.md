---
layout: page
title: Tools for Vietnamese Language Learning
description: Series of posts describing tools for Vietnamese language learning
img: assets/img/projects/VN/anki_vietnam.png
#importance: 1
category: Vietnamese
related_publications: true
date: 2024-10-25
toc: 
  beginning: true
---

This year I really set out to improve my Vietnamese. My parents are Vietnamese, so I have a base understanding of the language but it frustrates me that I can't talk to them about more topics.

Oh, and special thanks to my girlfriend for providing me with the thumbnail image {% cite fayca_anki_vietnamese %}!

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <div style="max-width: 300px; margin: auto;">
            {% include figure.liquid loading="eager" path="assets/img/projects/VN/anki_vietnam.png" title="duck_494" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>

# Introduction

This project is about ...

The results of this project are the reason I wanted to start a blog in the first place... to use my skills as a computer scientist to help myself in learning the Vietnamese language and have fun in the process!

TODO

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
