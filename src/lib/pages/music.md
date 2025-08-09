---
layout: page
title: Music 
permalink: /music/
order: 2
---
<div>
{% for post in site.categories.music %}
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