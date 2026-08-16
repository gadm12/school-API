from django.shortcuts import render
import os
import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import UserRateThrottle
from rest_framework.throttling import AnonRateThrottle
from django.core.cache import cache
from rich import print

CACHE_TTL = 60 * 5


class BookUserRateThrottle(UserRateThrottle):
    rate = "20/min"


class BookAnonRateThrottle(AnonRateThrottle):
    rate = "10/min"


class BookProject(APIView):

    permission_classes = []
    throttle_classes = [
        BookUserRateThrottle,
        BookAnonRateThrottle,
    ]

    def get(self, request):
        query = request.query_params.get("q", "django")

        cache_key = f"books:{query.lower().strip()}"
        cached_books = cache.get(cache_key)

        if cached_books is not None:
            print("✅✅✅ CACHE HIT ✅✅✅")
            return Response(cached_books)

        print("❌❌❌ CACHE MISS ❌❌❌")

        api_key = os.getenv("GOOGLE_BOOKS_API_KEY")
        endpoint = "https://www.googleapis.com/books/v1/volumes"

        try:
            response = requests.get(
                endpoint,
                params={
                    "q": query,
                    "key": api_key,
                    "maxResults": 10,
                },
                timeout=10,
            )

            response.raise_for_status()

        except requests.RequestException:
            return Response(
                {
                    "error": "Google Books service is temporarily unavailable."
                },
                status=503,
            )

        google_data = response.json()

        books = []

        for item in google_data.get("items", []):
            info = item.get("volumeInfo", {})

            books.append(
                {
                    "google_id": item.get("id"),
                    "title": info.get("title"),
                    "authors": info.get("authors", []),
                    "thumbnail": info.get("imageLinks", {}).get(
                        "thumbnail"
                    ),
                    "description": info.get("description"),
                    "preview_link": info.get("previewLink"),
                }
            )

        data = {
            "query": query,
            "count": len(books),
            "books": books,
        }
        cache.set(cache_key, data, timeout=CACHE_TTL)
        print(data)
        return Response(data)


# from django.shortcuts import render
# import os
# import requests
# from rest_framework.response import Response
# from rest_framework.views import APIView

# # Create your views here.


# class BookProject(APIView):
#     authentication_classes = []
#     permission_classes = []

#     def get(self, request):
#         query = request.query_params.get("q", "django")
#         api_key = os.getenv("GOOGLE_BOOKS_API_KEY")
#         endpoint = "https://www.googleapis.com/books/v1/volumes"

#         response = requests.get(
#             endpoint,
#             params={
#                 "q": query,
#                 "key": api_key,
#             },
#             timeout=10,
#         )

#         response.raise_for_status()
#         google_data = response.json()

#         books = []

#         for item in google_data.get("items", []):
#             info = item.get("volumeInfo", {})

#             books.append(
#                 {
#                     "google_id": item.get("id"),
#                     "title": info.get("title"),
#                     "authors": info.get("authors", []),
#                     "thumbnail": info.get("imageLinks", {}).get("thumbnail"),
#                     "description": info.get("description"),
#                     "preview_link": info.get("previewLink"),
#                 }
#             )

#         return Response(books)
