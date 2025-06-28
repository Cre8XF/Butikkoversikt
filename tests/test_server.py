import unittest
from unittest.mock import patch, Mock
import sys
import os

# Ensure Admin directory is on path for importing server
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'Admin'))
import server

class ServerMetaTests(unittest.TestCase):
    def setUp(self):
        self.client = server.app.test_client()

    def test_returns_description_meta_tag(self):
        html = '<html><head><meta name="description" content="Test description"></head><body></body></html>'
        mock_response = Mock()
        mock_response.text = html
        with patch('server.requests.get', return_value=mock_response):
            response = self.client.get('/api/meta?url=https://example.com')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.get_json(), {"description": "Test description"})

    def test_invalid_url_returns_400(self):
        response = self.client.get('/api/meta?url=invalid')
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
