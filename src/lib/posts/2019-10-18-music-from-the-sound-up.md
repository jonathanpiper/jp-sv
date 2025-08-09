---
layout: post
title: Music from the Sound Up&#58; The Creative Tools of Synthesis
category: exhibitions
titleistitle: 1
---
![Waves, Light, Sieve, Taste](/assets/images/exhibitions/sound-up/sound-up-header.jpg){:class="img-responsive"}

**Opened:** 18 October, 2019
<br>
**Closed:** 13 March, 2020 (early close due to the coronavirus pandemic)

**Purpose:** Presenting and exploring six fundamental concepts in audio synthesis to provide visitors with a functional understanding of how synthesizers create sound.

<!--more-->

**Content:** The fundamental concepts—oscillators, additive synthesis, filters, envelopes, LFOs, and reverberation—are illustrated through physically-rooted metaphors: waves, light, sieve, taste, motion, space. Visitors are given the chance to hear the effect of each concept on a synthesized sound.

**Setting:** Each concept/metaphor is presented as a discrete station comprising a large panel with explanatory text and an accompanying control surface. The control surface allows visitors to trigger a sound and makes basic—and obvious—parameters available for modification. For example, the oscillators/waves station exposes frequency/pitch and amplitude/volume, the reverberation/space station exposes decay time and wet/dry mix, etc. The most complex station, additive synthesis/light, exposes the amplitude of eight total sine waves in a harmonic series. The stations are driven by custom software, written in Python and PureData, running on Raspberry Pi 4 computers. To allow visitors to experience the flow of "building a sound," each Raspberry Pi is connected to an RFID transceiver. Visitors are given tokens equipped with RFID tags at the entrance to the exhibition. When placed on the station's control surface, the station both begins actively writing the state of its exposed parameters to the tag's memory and reads the state of any other station that the tag has interacted with. As the visitor progresses, the effects of each station builds on the last so that, by the end, their tag represents a unique combination of parameters effectively equivalent to a synth patch. They can then use the same tag to "load" their sound onto and then play one of four interactive instruments. These MIDI-enabled instruments are connected to similar Raspberry Pi 4 computers with RFID transceivers that read the station state data to recreate the visitor's sound.

Check out the [GitHub repository](https://github.com/jonathanpiper/SYNTHSPEX){:target="_blank"} for the Python code used for the exhibition. The PureData synth engine was written by [Dr. Chris Warren](https://music.sdsu.edu/index.php/faculty/chris_warren){:target="_blank"}.

The exhibition was featured at the 2020 NAMM Show in a touchscreen-driven format to account for a smaller physical space and the available infrastructure. The station interfaces were reimagined using HTML5, CSS, and Javascript, using the Eel Python library to serve as a bridge to the PureData patch. To replace the physical RFID tokens, each visitor was given a randomly generated four-digit code that could be used to store and recall their sound for use on three interactive instruments.

**Roles:** Conception, research, interaction design, script writing, installation, software design and programming, technology selection and installation.

<div data-nanogallery2 = '{
    "thumbnailWidth": "auto",
    "thumbnailBorderVertical": 1,
    "thumbnailBorderHorizontal": 1,    
    "thumbnailLabel": {
        "position": "overImageOnBottom"
    },
    "thumbnailAlignment": "center",
    "thumbnailOpenImage": true,
    "itemsBaseURL":     "/assets/images/exhibitions/sound-up/"
  }'>

  <!-- ### gallery content ### -->
  {% for image in site.static_files %}
    {% if image.path contains 'assets/images/exhibitions/sound-up' %}
      {% unless image.path contains 'thumbnails' %}
        {% unless image.path contains 'header' %}
          <a href="{{ image.name }}" data-ngthumb="thumbnails/{{ image.basename }}_t.jpg" />
        {% endunless %}
      {% endunless %}
    {% endif %}
  {% endfor %}
</div>