---
title: Exhibitions
layout: page
permalink: "/exhibitions/"
order: 3
---

From 2017 to 2023, I curated the exhibitions&#151;both permanent and temporary&#151;at the [NAMM Museum of Making Music (MoMM)](https://www.museumofmakingmusic.org){:target="_blank"} in Carlsbad, CA and, each January, at MoMM's booth at the NAMM Show in Anaheim, CA. My activities have included conception, ideation, research, fieldwork, script writing, object selection, visual design, interaction and experience design, software programming, fabrication, and installation.
<br/><br/>
<div>
{% for post in site.categories.exhibitions %}
    <div>
        <a href="{{ post.url }}"><h3>
        {% if post.titleistitle == 1 %}<em>{% endif %}
        {{ post.title }}
        {% if post.titleistitle == 1 %}</em>{% endif %}
        </h3></a>
        {{ post.excerpt }}
    </div>
    <br>
{% endfor %}
</div>
