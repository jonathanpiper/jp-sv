---
layout: post
title: What Good is Music?
category: exhibitions
titleistitle: 1
---
![What Good is Music](/assets/images/exhibitions/what-good-is-music/wgim-header.jpg){:class="img-responsive"}

**Opened:** 21 June, 2022
<br>
**Closed:** February, 2023

**Purpose:** To encourage visitors to consider the many roles that music can play in their lives, in their communities, and in the world at large through a series of provocative questions.

<!--more-->

**Content:** Three primary questions: "What good is music for me?", "What good is music for us?", and "What good is music for the world?". Each question is accompanied by a contextualizing statment, e.g. about how music can be used in daily life for positive outcomes or how music can connect groups of people with external activities or sentiments.

**Setting:** Each question is presented as an intuitive interactive opportunity: placing balls in buckets to indicate an answer, threading paracord around pegs to complete a statement, and writing a freeform response on supplied cards. A child-oriented area asks younger viistors to illustrate how music makes them feel with colored pencils on magnetic tiles that can be taken home or placed on a magnetic board to form a collage.

**Roles:** Conception, script writing, interaction design, fabrication, installation.

The image gallery below includes renders from the design phase of the exhibition, which was performed in Figma and Autodesk Fusion 360.

<div data-nanogallery2 = '{
    "thumbnailWidth": "auto",
    "thumbnailBorderVertical": 1,
    "thumbnailBorderHorizontal": 1,    
    "thumbnailLabel": {
        "position": "overImageOnBottom"
    },
    "thumbnailAlignment": "center",
    "thumbnailOpenImage": true,
    "itemsBaseURL":     "/assets/images/exhibitions/what-good-is-music/"
  }'>

  <!-- ### gallery content ### -->
  {% for image in site.static_files %}
    {% if image.path contains 'assets/images/exhibitions/what-good-is-music' %}
      {% unless image.path contains 'thumbnails' %}
        {% unless image.path contains 'header' %}
          <a href="{{ image.name }}" data-ngthumb="thumbnails/{{ image.basename }}_t.jpg" />
        {% endunless %}
      {% endunless %}
    {% endif %}
  {% endfor %}
</div>