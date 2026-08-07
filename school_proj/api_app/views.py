from django.shortcuts import render
import os
import requests
from rest_framework.response import Response
from rest_framework.views import APIView


class BookProject(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        query = request.query_params.get("q", "django")
        api_key = os.getenv("GOOGLE_BOOKS_API_KEY")
        endpoint = "https://www.googleapis.com/books/v1/volumes"

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
                    "preview_link": info.get("previewLink"),
                }
            )

        return Response(
            {
                "query": query,
                "count": len(books),
                "books": books,
            }
        )


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
