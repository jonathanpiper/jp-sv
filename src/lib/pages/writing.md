---
layout: page
title: Writing 
permalink: /writing/
order: 5
---
<div>
{% for post in site.categories.writing %}
    <div>
        <a href="{{ post.url }}"><h3>
        {% if post.titleistitle == 1 %}<em>{% endif %}
        {{ post.title }}
        {% if post.titleistitle == 1 %}</em>{% endif %}
        </h3></a>
        {{ post.short }}
    </div>
    <br>
{% endfor %}
</div>