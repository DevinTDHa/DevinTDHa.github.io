---
layout: post
title: Extracting the most common words in Vietnamese
date: 2024-10-25
description: We extract the most common words in Vietnamese by analyzing word frequencies of large bodies of text
tags: natural-language-processing vietnamese
categories: vietnamese-language-learning-tools
related_posts: false
toc:
  sidebar: left
thumbnail: assets/img/projects/VN/word_frequencies_log10.png
related_publications: true
---

This post is the first in a series about tools for Vietnamese language learning tools. I will describe, how we can extract the most common words in a number of corpora in the Vietnamese language.

For the whole project, see the [Projects page](/projects).

> **Summary**
>
> TODO

## Goal

When learning a language, is it useful to know some words of the target language to understand it and be able to communicate with other people. But in which order should we learn these new words?

As a starting point, I assumed that learning the most frequent words would be pretty good. And indeed, I read some discussions  {% cite liPowerLawDistribution2017 SizeVocabularySet %} where people also agree with this. While just learning the most common words will not suddenly help me become fluent, it certainly would help me to read and immerse myself more without having to pick up the dictionary all the time.

So I downloaded the [first Anki deck I found on the internet](https://Ankiweb.net/shared/info/1903023972) and started learning.

## Problem

Pretty soon however, I found some problems with the Anki deck:

1. There is no usage context on the cards, so it is pretty hard to remember them.
2. The quality of translations is lacking for lots of cards
3. Using 5 minutes of research, I have no idea how these words were extracted in the first place. Seems to be quite random at times.

So I set out to improve my learning experience. While other frequency lists exist CITE, I wanted to create my own for fun with the data I already had.

*Note: While researching for this blog post I realized that I really should have looked deeper into available resources. For example, I could've easily used available word frequency lists and included the Wikipedia corpus. Reading Vietnamese Wikipedia is actually my ultimate goal. Whoops 🤦! But at least I learned some things and know better for next time.*

## Solution

TODO
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/VN/word_frequencies.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    TODO: Caption
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/VN/word_frequencies_log10.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Word Frequencies on Log10 scale. It's beautiful.
</div>

## Conclusion and Future Work

Next part with automatic Anki card creation.

- Also adding cards wastes a lot of time and is boring and tedious
- Hint at next part where we create the Anki cards automatically
