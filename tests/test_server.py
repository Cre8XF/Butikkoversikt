import json
from unittest.mock import patch, Mock

import pytest

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'Admin'))

from server import app


def test_meta_description_returned():
    html = '<html><head><meta name="description" content="Test desc"></head></html>'
    mock_response = Mock()
    mock_response.text = html

    with patch('server.requests.get', return_value=mock_response):
        client = app.test_client()
        resp = client.get('/api/meta?url=http://example.com')
        assert resp.status_code == 200
        assert resp.get_json() == {"description": "Test desc"}


def test_invalid_url_returns_400():
    client = app.test_client()
    resp = client.get('/api/meta?url=invalid-url')
    assert resp.status_code == 400

