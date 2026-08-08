# options

1. pip install django-ratelimit

2. use DRF DRF's built-in throttling for less packages

- in settings.py

```python
REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "10/min",
    },
}
```

- or per view:

```python
from rest_framework.throttling import UserRateThrottle

class BookProject(APIView):
    throttle_classes = [UserRateThrottle]
```

- then define:

```python
DEFAULT_THROTTLE_RATES = {
    "user": "100/hour",
}
```

- or for different rate limits

```python
REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
    "rest_framework.throttling.AnonRateThrottle",
    "rest_framework.throttling.UserRateThrottle",
],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "10/min",
    },
}
```

```python
"DEFAULT_THROTTLE_RATES": {
    "anon": "10/min",
    "user": "100/hour",
}
```
- so REST_FRAMEWORK inside settings.py will looks like
```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],

    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],

    "DEFAULT_THROTTLE_RATES": {
        "anon": "10/min",
        "user": "100/hour",
    },
}
```

another way to test rate limit 

```sh
for i in $(seq 1 12); do
    curl -s -o /dev/null -w "%{http_code}\n" \
    http://localhost:8000/api/v1/book/
done
```
or we can add a header and a token
-H "Authorization: Token c3d......." \