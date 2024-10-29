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
> - published code at ...

## Goal

When learning a language, is it useful to know at least *some* words of the target language to understand it and be able to communicate with other people. But in which order should we learn these new words?

As a starting point, I assumed that learning the most frequent words would be pretty good. And indeed, I read some discussions {% cite liPowerLawDistribution2017 SizeVocabularySet2021 %} where people have a similar approach to learning. In summary, learning the first 1000-2000 most common words lets you understand basic conversations, with more words allowing for more texts. Li {% cite liPowerLawDistribution2017 %} is painting a pretty bleak picture here, who estimates that you will need 27.000 words to become near fluent!

I am aware that just learning the most common words will not suddenly help me become fluent (sadly). But it certainly would help me to read and immerse myself more without having to pick up the dictionary all the time.

So I downloaded the [first Anki deck I found on the internet](https://Ankiweb.net/shared/info/1903023972) and started learning.

## Problem

Pretty soon however, I found some problems with the Anki deck:

1. There is no usage context on the cards, so it is pretty hard to remember them.
2. The quality of translations is lacking for lots of cards
3. Using 5 minutes of research, I have no idea how these words were extracted in the first place. Seems to be quite random at times.

So I set out to improve my learning experience and I wanted to create my own word frequency list for fun with the data I already had.

*Note: While researching for this blog post I realized that I really should have looked deeper into available resources. For example, I could've easily uses [this available word frequency list](https://github.com/rspeer/wordfreq). Note sure what happened there and I missed it. Whoops 🤦! But at least I learned lots of things along the way (and I think my list used more data).*

### Where To Find Which Words

So first, we will need to find some Vietnamese texts. I will describe which ones in the [Corpora](#corpora) section. For people unfamiliar with this term: According to Wiktionary a *corpus* in our context is "a collection of writings in form of an electronic database used for linguistic analyses".

Moreover, we can't just use the raw words from the text. While the Vietnamese language does not have inflections like in English, we have to consider compound words, which Vietnamese utilizes heavily.

To illustrate this, let's take the following example sentence:

```text
Anh sẽ thành công. (I will succeed.)
```

Here, we want to consider the word `thành công` as it means succeed, instead of its compounds. This task is called *text or word segmentation* and I will describe a way to do this quickly in the [Word Segmentation](#word-segmentation) section.

## Solution

So to go ahead and extract these words we will need to:

1. Select, download and pre-process the corpora.
2. Apply word segmentation to all sentences to find the correct words.
3. Count and merge the word frequencies for all documents

### Corpora

I wanted to include two types of corpus: First, texts that are more formal such as the news and Wikipedia and second conversations. For this I decided on the following corpora:

1. Binhvq News Corpus {% cite vuongquocBinhvqNewscorpusCorpus2024 %}, which includes news with about 111 million words
2. viwik18 {% cite NTT123Viwik18Vietnamese2018 %}, which is a dump of the vietnamese wikipedia from 2018
3. Facebook comment corpus which was also included in the repo of the Binhvq News Corpus.
4. opensubtitles.org.Actually.Open.Edition {% cite 5719123SubtitlesOpensubtitlesorg %} which is a (questionable?) dump of subtitle files from Open Subtitles

We can just download the corpora and start working with them, as they already are in a readable format. Basically they are just raw text, split across many small files.

In total, we have TODO.

That is, except for the subtitles files.

#### Processing Open Subtitles Files

Processing the subtitle files involves a bit more work. I will only summarize the processing of this corpus, but I will probably write a whole blog post about it at some later point in time. To process this dataset, I applied the following steps:

1. Extract all subtitles zips which have the Vietnamese language code (vi)
2. Parse the SRT files and join them together to a single line. This is because a sentence might be distributed over multiple lines.
3. Use a *sentence segmentation model* to extract the sentences and write them to a text file.
   - A sentence segmentation model separates a single line of text into sentences.

With the text available, we proceed with the next step of processing: the word segmentation described earlier.

### Word Segmentation

To perform the word segmentation, I chose to go for a non-deep learning approach for which I have two reasons. First, I thought using a deep learning model would take forever to process everything. Second, after a quick search I found a paper {% cite vuVnCoreNLPVietnameseNatural2018 %} and its Github Repo {% cite corenlpVncorenlpVnCoreNLP2024 %} written in Java which describes a "transformation rule-based learning model". I'm not going to pretend to know what this exactly means, but "rule-based" sounds fast, and it's supposed to be accurate enough.

I was not overly concerned with accuracy and hoped due to the size of the texts that it would average out. I was mostly concerned with getting it done, so I can actually stop procrastinating and start learning Vietnamese.

Running the code, it seems like it doesn't use all available resources on my computer to process it, using only on a single core. Thus, I set out to run it concurrently on all my available computer cores.

I haven't worked with concurrent Java code before and I feel a bit clunky with it. Once I started to use [Scala](https://www.scala-lang.org/) for work, I could never look back. But I never really worked with concurrency in Scala before either at this point and was a bit intimidated by it.

Turns out, that it is actually quite simple in this case! All you have to do is use [parallel collections](https://docs.scala-lang.org/overviews/parallel-collections/overview.html). If we apply the algorithm in parallel to multiple files, we can quite easily achieve some speedup (also known as an [embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel) problem). The resulting code is quite small, and I published it [in the repo for this post](https://github.com/DevinTDHa/vn-nlp-exp/blob/main/rdrsegmenter_wfreqs/VnCoreNLPScala/src/main/scala/ProcessFolder.scala).

Using this parallelized code, I was able to completely process all corpora quite quickly. I can't be bothered to run it again, but it must have been less than 2 hours to process everything.

### Analyzing How Many Words You Need

Let's recall that in the [Goal](#goal) section, I described that ... (something about word frequencies and we can reference the other thing again for the percentagers)

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
- Published code at ...
