# jekyll-infinite-scroll
jekyll infinite scroll

## install

```
$ npm i jekyll-infinite-scroll
```
or
```
<script src="https://cdn.rawgit.com/J911/jekyll-infinite-scroll/master/lib/InfiniteScroll.js"></script>
```
or
direct download [this link](https://github.com/J911/jekyll-infinite-scroll/archive/master.zip)

## Using
1. set pagenation in jekyell
add "jekyll-paginate" in `_config.yml` and `Gemfile`
and set `_config.yml`
```
paginate: 2
paginate_path: "/page/:num"
```

2. set pagenation in html
(example)
```
<div class="card--group" id="card-wrapper">
    {%- if paginator.posts.size > 0 -%}
    {%- for post in paginator.posts -%}
        <a href="{{ post.url | relative_url }}">
            <div class="card">
                <div class="card__header">
                    <h3 class="card__header__title">{{ post.title | escape }}</h3>
                </div>
                <div class="card__body">
                    {%- assign date_format = paginator.minima.date_format | default: "%b %-d, %Y" -%}
                    {{ post.date | date: date_format }}
                    {{ post.excerpt }}
                </div>
            </div>
        </a>
    {%- endfor -%}
{%- endif -%}
</div>
```
3. include this lib and setting
```
<script src='lib/InfiniteScroll.js'></script>
<script>
    var postWrapperId = 'card-wrapper';
    var paginatePath = '/page/'
    new InfiniteScroll(paginatePath, postWrapperId);
</script>
```
4. Done! ✌🏻

## LICENSE
MIT License