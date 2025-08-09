---
layout: post
title: Accordions&#58; Expanding Voices in the USA
category: exhibitions
titleistitle: 1
---
![Where is the accordion now?](/assets/images/exhibitions/accordions/accordions_header.jpg){:class="img-responsive"}

**Opened:** 13 December, 2018
<br>
**Closed:** 31 August, 2019

**Purpose:** Examining the contemporary state of the accordion in the USA, providing visitors with a sense of the instrument's versatility and the diversity of its players.

<!--more-->

**Content:** The primary content of the exhibition comprises twelve accordions, chosen for their diversity, and the stories of 15 players from wide-ranging musical and geographical locales. This presentation is bookended by a short history of the instrument and a look to its future.

**Setting:** The exhibition space is designed to orient the visitor to the accordion's contemporary status quickly, opening with a small presentation of historical instruments and a brief narrative of the accordion's development. An "exploded" piano accordion is arranged with its components spread across a section of wall, allowing visitors a unique glimpse at the instrument's internal mechanisms. The exhibition's primary instruments are display on plexiglas shelves near short captions about their significance and the musicians who might use them--or in some cases who loaned them to the exhibition. Two touchscreen displays, one on either side of the instrument display, contain extended narratives about the instruments and musicians. Each musician included in the exhbition is paired with representative music clips so that visitors can hear a handful of the many contemporary contexts for the accordion. Three interactive accordions--two button and one piano--and a short video demonstration let visitors experience the instrument themselves.

**Roles:** Conception, research, fieldwork, script writing, object selection, interaction design, fabrication, installation.

<div data-nanogallery2 = '{
    "thumbnailWidth": "auto",
    "thumbnailBorderVertical": 1,
    "thumbnailBorderHorizontal": 1,    
    "thumbnailLabel": {
        "position": "overImageOnBottom"
    },
    "thumbnailAlignment": "center",
    "thumbnailOpenImage": true,
    "itemsBaseURL":     "/assets/images/exhibitions/accordions/"
  }'>

  <!-- ### gallery content ### -->
  {% for image in site.static_files %}
    {% if image.path contains 'assets/images/exhibitions/accordions' %}
      {% unless image.path contains 'thumbnails' %}
        {% unless image.path contains 'header' %}
          <a href="{{ image.name }}" data-ngthumb="thumbnails/{{ image.basename }}_t.jpg" />
        {% endunless %}
      {% endunless %}
    {% endif %}
  {% endfor %}
</div>