websites
django docs:https://docs.djangoproject.com/en/6.0/topics/cache/
pypi: https://pypi.org/project/django-redis/3.1.6/

> pip install django-redis

in settings.py

```python
CASHES = {
"default": {
"BACKEND": "redis_cache.cache.RedisCache",
"LOCATION": os.environ.get(
("REDIS_URL", "redis://redis:6379/0")
),
"OPTIONS": {
"CLIENT_CLASS": "django_redis.client.DefaultClient",
},
}
}
```

in your view.py

```python
from django.core.cache import cache

#example:

def get(self, request):
    print("🔥🔥🔥 BOOK VIEW WAS CALLED 🔥🔥🔥")
    query = request.query_params.get("q", "django")

    # create a cache key (consistent)
    cache_key = f"books{query}"

    # check if there ais a pre-existinng enty
    cached_books = cache.get(cache_key)

    # if so return said entry
    if cached_books is not None:
        print("✅✅✅ cache hit ✅✅✅")

        #return said entry
        return Response(cached_books)

    # other wise create the query and insert the entry
    print("❌❌❌ CACHE MISS ❌❌❌")

    response = requests.get(
            endpoint,
            params={
                "q": query,
                "key": api_key,
                "maxResults": 10,
            },
            timeout=10,
        )

    # wrap the date into a var name data?
    # and return Response(data)
    data = {
            "query": query,
            "count": len(books),
            "books": books,
        }
    cache.set(cache_key, data, timeout=300)
    print(data)
    return Response(data)


```

good practice is to create a const var up top in the view (CACHE Time to Live)

```python
CACHE_TTL=60
# then call it
cache.set(cache_key, data, timeout=CACHE_TTL)

```

test caching in redis-cli

```bash
➜  docker exec -it redis-container redis-cli

127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> keys *
1) ":1:bookspython"
2) ":1:throttle_user_172.20.0.1"
3) ":1:throttle_anon_172.20.0.1"
127.0.0.1:6379>
```
and after 1 min it will be cleared
