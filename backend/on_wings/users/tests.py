from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_login_user(self):
        self.client.post(self.register_url, self.user_data)
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'testpassword123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)

    def test_login_invalid_credentials(self):
        self.client.post(self.register_url, self.user_data)
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_invalid_email(self):
        User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        response = self.client.post(self.register_url, {
            'username': 'testuser2',
            'email': 'test@example.com',
            'password': 'testpassword'
        })
        if response.status_code != status.HTTP_400_BAD_REQUEST:
            print(f"Invalid Email Test Failed. Status: {response.status_code}, Data: {response.data}")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_create_user_sanitization(self):
        response = self.client.post(self.register_url, {
            'username': '<b>bolduser</b>',
            'email': 'sanitized@example.com',
            'password': 'testpassword',
            'first_name': '<script>alert("xss")</script>John',
            'last_name': 'Doe<h1>Header</h1>'
        })
        if response.status_code != status.HTTP_201_CREATED:
            print(f"Sanitization Test Failed. Status: {response.status_code}, Data: {response.data}")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email='sanitized@example.com')
        self.assertEqual(user.username, 'bolduser')
        self.assertEqual(user.first_name, 'John')
        self.assertEqual(user.last_name, 'DoeHeader')
