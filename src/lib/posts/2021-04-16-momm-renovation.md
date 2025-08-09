---
layout: post
title: Museum of Making Music Renovation
category: exhibitions
titleistitle: 0
---
![MoMM Renovation](/assets/images/exhibitions/momm-renovation/momm-header.jpg){:class="img-responsive"}

**Opened:** 15 June, 2021

**Purpose:** To realign the Museum's core exhibition galleries with stated institutional goal of "exploring the accomplishments and impact of the music products industry." 

<!--more-->

**Content:** Completely rewritten storylines centered around the "industry ecosystem" of "**make**, **sell**, **use**." The first gallery, "**Making the Instruments**," presents stories about the drivers of change affecting instrument development, such as the need for musicians to be heard among larger ensembles, the movement of peoples across the globe, the rise and fall of popular music styles, and more. The second gallery, "**Providing the Instruments**," explores social, economic, and cultural factors impacting the industry and its retail operations during five distinct historical periods. The third gallery, "**Using the Instruments,**" features a wall-to-wall video presentation about the emotional power of music. The fourth gallery, "**Beyond the Instruments**," presents four stories about the cultural impact of instruments and their abilities to function as something more than tools for producing sound.

**Setting:** 19 distinct displays, 18 of which feature artifacts, primarily musical instruments, and one comprising printed panels with stories from the publishing sector of the industry. 15 touchscreen kiosks with directional speakers containing stories and accompanying images; audiovisual materials including musical excerpts, factory footage, and interviews from the NAMM Oral History program; and artifact information with high-resolution images.

**Roles:** Conception, research, narrative design, object selection, script writing, installation, audio calibration, technology selection and installation.

<div data-nanogallery2 = '{
    "thumbnailWidth": "auto",
    "thumbnailBorderVertical": 1,
    "thumbnailBorderHorizontal": 1,    
    "thumbnailLabel": {
        "position": "overImageOnBottom"
    },
    "thumbnailAlignment": "center",
    "thumbnailOpenImage": true,
    "itemsBaseURL":     "/assets/images/exhibitions/momm-renovation/"
  }'>

  <!-- ### gallery content ### -->
  {% for image in site.static_files %}
    {% if image.path contains 'assets/images/exhibitions/momm-renovation' %}
      {% unless image.path contains 'thumbnails' %}
        {% unless image.path contains 'header' %}
          <a href="{{ image.name }}" data-ngthumb="thumbnails/{{ image.basename }}_t.jpg" />
        {% endunless %}
      {% endunless %}
    {% endif %}
  {% endfor %}
</div>