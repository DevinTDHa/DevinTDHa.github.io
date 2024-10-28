---
layout: post
title: Extracting the most common words in Vietnamese
date: 2024-10-25
description: We extract the most common words in Vietnamese by analyzing word frequencies of large documents
tags: natural-language-processing vietnamese
categories: vietnamese-language-learning-tools
related_posts: false
toc:
  sidebar: left
thumbnail: assets/img/projects/VN/word_frequencies_log10.png
related_publications: true
---

This post is the first in a series about tools for Vietnamese language learning tools. I will describe, how we can extract the most common words in a number of large documents in the Vietnamese language.

For the whole project, see the [Projects page](/projects).

> **Summary**
>
> TODO

## Goal

When learning a language, is it useful to know some words of the target language to understand it and be able to communicate with other people. But in which order should we learn these new words?

As a starting point, I assumed that learning the most frequent words would be pretty good. And indeed, I read some discussions  {% cite liPowerLawDistribution2017 SizeVocabularySet2021 %} where people have a similar approach to learning. In summary, learning the first 1000-2000 most common words lets you understand basic conversations, with more words allowing for more texts. Li is painting a pretty bleak picture here, who estimates that you will need 27.000 words to become near fluent!

I am aware that just learning the most common words will not suddenly help me become fluent (sadly). But it certainly would help me to read and immerse myself more without having to pick up the dictionary all the time.

So I downloaded the [first Anki deck I found on the internet](https://Ankiweb.net/shared/info/1903023972) and started learning.

## Problem

Pretty soon however, I found some problems with the Anki deck:

1. There is no usage context on the cards, so it is pretty hard to remember them.
2. The quality of translations is lacking for lots of cards
3. Using 5 minutes of research, I have no idea how these words were extracted in the first place. Seems to be quite random at times.

So I set out to improve my learning experience and I wanted to create my own word frequency list for fun with the data I already had.

*Note: While researching for this blog post I realized that I really should have looked deeper into available resources. For example, I could've easily used [this available word frequency list](https://github.com/rspeer/wordfreq). Note sure what happened there and I missed it. Whoops 🤦! But at least I learned lots of things along the way.*

## Solution

So to go ahead and extract these words we will need to:

1. Download and pre-process some large text documents or *corpora*.
2. Apply something called *word segmentation* to all sentences to find the correct words.
3. Count and merge the word frequencies for all documents

### Corpora

For people unfamiliar with this term: According to Witkionary a *corpus* in our context is "a collection of writings in form of an electronic database used for linguistic analyses". It will form the basis for our analysis.

I wanted to include two types of corpus: First, texts that are more formal such as the news and Wikipedia and second conversations. For this I decided on the following corpora:

1. Binhvq News Corpus {% cite vuongquocBinhvqNewscorpusCorpus2024 %}, which includes news with about 111 million words
2. viwik18 {% cite NTT123Viwik18Vietnamese2018 %}, which is a dump of the vietnamese wikipedia from 2018
3. Facebook comment corpus which was also included in the repo of the Binhvq News Corpus.
4. opensubtitles.org.Actually.Open.Edition which is a (questionable?) dump of subtitle files from Open Subtitles

We can just download the corpora and start working with them, as they already are in a readable format (just raw text basically).

Except for the subtitles one, which involves a bit more work. I will only summarize the processing of this corpus, but I will probably write a whole blog post about it at some later point in time. To process this dataset, I applied the following steps:

1. Extract all subtitles zips which have the vietnamese language code (vi)
2. Parse the SRT files and join them together to a single line. This is because a sentence might be distributed over multiple lines.
3. Use a sentence segmentation model to extract the sentences and write them to a text file.

With the text available, we proceed with the next step of processing


### Applying Word Segmentation to the texts

...

### Analyzing How Many Words You Need

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
