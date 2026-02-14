from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class AccountTests(APITestCase):
    def test_registration(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('register')
        data = {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpassword123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_login(self):
        """
        Ensure we can login and get a token.
        """
        # Create user first
        user = User.objects.create_user(username='testuser', password='testpassword123')
        
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'testpassword123'}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        
    def test_login_invalid_credentials(self):
        """
        Ensure login fails with wrong credentials.
        """
        User.objects.create_user(username='testuser', password='testpassword123')
        
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
