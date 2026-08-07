from unittest.mock import patch

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


class BookThrottleTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/v1/book/?q=python"

    @patch("api_app.views.requests.get")
    def test_anon_user_gets_throttled_after_10_requests(self, mock_get):
        mock_get.return_value.json.return_value = {"items": []}
        mock_get.return_value.raise_for_status.return_value = None

        for _ in range(10):
            response = self.client.get(self.url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_429_TOO_MANY_REQUESTS,
        )