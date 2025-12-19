#!/usr/bin/env python3
"""
Portfolio Website Backend API Testing Script
Tests all CRUD operations for the portfolio website backend APIs
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://nextfolio-12.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.admin_token = None
        self.test_results = []
        self.created_review_id = None
        
    def log_result(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_admin_login_correct(self):
        """Test admin login with correct credentials"""
        try:
            response = requests.post(
                f"{self.base_url}/auth/login",
                json={"username": "admin", "password": "admin"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('token'):
                    self.admin_token = data['token']
                    self.log_result("Admin Login (Correct)", True, "Successfully logged in with correct credentials", data)
                    return True
                else:
                    self.log_result("Admin Login (Correct)", False, "Login response missing success or token", data)
                    return False
            else:
                self.log_result("Admin Login (Correct)", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Admin Login (Correct)", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_login_incorrect(self):
        """Test admin login with incorrect credentials"""
        try:
            response = requests.post(
                f"{self.base_url}/auth/login",
                json={"username": "admin", "password": "wrongpassword"},
                timeout=10
            )
            
            if response.status_code == 401:
                data = response.json()
                if 'error' in data:
                    self.log_result("Admin Login (Incorrect)", True, "Correctly rejected invalid credentials", data)
                    return True
                else:
                    self.log_result("Admin Login (Incorrect)", False, "Missing error message in response", data)
                    return False
            else:
                self.log_result("Admin Login (Incorrect)", False, f"Expected 401, got HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Admin Login (Incorrect)", False, f"Exception: {str(e)}")
            return False
    
    def test_create_blog_review(self):
        """Test creating a blog review (requires admin authentication)"""
        if not self.admin_token:
            self.log_result("Create Blog Review", False, "No admin token available")
            return False
            
        try:
            review_data = {
                "type": "blog",
                "title": "My First Blog Post",
                "image": "https://example.com/blog-image.jpg",
                "description": "This is a comprehensive blog post about web development best practices."
            }
            
            response = requests.post(
                f"{self.base_url}/reviews",
                json=review_data,
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('type') == 'blog':
                    self.created_review_id = data['id']
                    self.log_result("Create Blog Review", True, "Successfully created blog review", data)
                    return True
                else:
                    self.log_result("Create Blog Review", False, "Response missing required fields", data)
                    return False
            else:
                self.log_result("Create Blog Review", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Create Blog Review", False, f"Exception: {str(e)}")
            return False
    
    def test_create_movie_review(self):
        """Test creating a movie review"""
        if not self.admin_token:
            self.log_result("Create Movie Review", False, "No admin token available")
            return False
            
        try:
            review_data = {
                "type": "movie",
                "title": "The Matrix",
                "image": "https://example.com/matrix-poster.jpg",
                "description": "A groundbreaking sci-fi film that redefined cinema."
            }
            
            response = requests.post(
                f"{self.base_url}/reviews",
                json=review_data,
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('type') == 'movie':
                    self.log_result("Create Movie Review", True, "Successfully created movie review", data)
                    return True
                else:
                    self.log_result("Create Movie Review", False, "Response missing required fields", data)
                    return False
            else:
                self.log_result("Create Movie Review", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Create Movie Review", False, f"Exception: {str(e)}")
            return False
    
    def test_create_book_review(self):
        """Test creating a book review"""
        if not self.admin_token:
            self.log_result("Create Book Review", False, "No admin token available")
            return False
            
        try:
            review_data = {
                "type": "book",
                "title": "Clean Code",
                "image": "https://example.com/clean-code-cover.jpg",
                "description": "A handbook of agile software craftsmanship by Robert C. Martin."
            }
            
            response = requests.post(
                f"{self.base_url}/reviews",
                json=review_data,
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('type') == 'book':
                    self.log_result("Create Book Review", True, "Successfully created book review", data)
                    return True
                else:
                    self.log_result("Create Book Review", False, "Response missing required fields", data)
                    return False
            else:
                self.log_result("Create Book Review", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Create Book Review", False, f"Exception: {str(e)}")
            return False
    
    def test_create_product_review(self):
        """Test creating a product review"""
        if not self.admin_token:
            self.log_result("Create Product Review", False, "No admin token available")
            return False
            
        try:
            review_data = {
                "type": "product",
                "title": "MacBook Pro M3",
                "image": "https://example.com/macbook-pro.jpg",
                "description": "Latest MacBook Pro with M3 chip - excellent performance for development."
            }
            
            response = requests.post(
                f"{self.base_url}/reviews",
                json=review_data,
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('type') == 'product':
                    self.log_result("Create Product Review", True, "Successfully created product review", data)
                    return True
                else:
                    self.log_result("Create Product Review", False, "Response missing required fields", data)
                    return False
            else:
                self.log_result("Create Product Review", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Create Product Review", False, f"Exception: {str(e)}")
            return False
    
    def test_fetch_all_reviews(self):
        """Test fetching all reviews"""
        try:
            response = requests.get(f"{self.base_url}/reviews", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Fetch All Reviews", True, f"Successfully fetched {len(data)} reviews", {"count": len(data)})
                    return True
                else:
                    self.log_result("Fetch All Reviews", False, "Response is not a list", data)
                    return False
            else:
                self.log_result("Fetch All Reviews", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Fetch All Reviews", False, f"Exception: {str(e)}")
            return False
    
    def test_fetch_reviews_by_type(self):
        """Test fetching reviews filtered by type"""
        types_to_test = ['blog', 'movie', 'book', 'product']
        all_passed = True
        
        for review_type in types_to_test:
            try:
                response = requests.get(f"{self.base_url}/reviews?type={review_type}", timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if isinstance(data, list):
                        # Check if all returned reviews have the correct type
                        correct_type = all(review.get('type') == review_type for review in data)
                        if correct_type:
                            self.log_result(f"Fetch {review_type.title()} Reviews", True, f"Successfully fetched {len(data)} {review_type} reviews", {"count": len(data)})
                        else:
                            self.log_result(f"Fetch {review_type.title()} Reviews", False, "Some reviews have incorrect type", data)
                            all_passed = False
                    else:
                        self.log_result(f"Fetch {review_type.title()} Reviews", False, "Response is not a list", data)
                        all_passed = False
                else:
                    self.log_result(f"Fetch {review_type.title()} Reviews", False, f"HTTP {response.status_code}", response.text)
                    all_passed = False
                    
            except Exception as e:
                self.log_result(f"Fetch {review_type.title()} Reviews", False, f"Exception: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_update_review(self):
        """Test updating a review (requires admin authentication)"""
        if not self.admin_token:
            self.log_result("Update Review", False, "No admin token available")
            return False
            
        if not self.created_review_id:
            self.log_result("Update Review", False, "No review ID available for update")
            return False
            
        try:
            update_data = {
                "type": "blog",
                "title": "My Updated Blog Post",
                "image": "https://example.com/updated-blog-image.jpg",
                "description": "This is an updated comprehensive blog post about advanced web development practices."
            }
            
            response = requests.put(
                f"{self.base_url}/reviews/{self.created_review_id}",
                json=update_data,
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_result("Update Review", True, "Successfully updated review", data)
                    return True
                else:
                    self.log_result("Update Review", False, "Response missing success field", data)
                    return False
            else:
                self.log_result("Update Review", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Update Review", False, f"Exception: {str(e)}")
            return False
    
    def test_delete_review(self):
        """Test deleting a review (requires admin authentication)"""
        if not self.admin_token:
            self.log_result("Delete Review", False, "No admin token available")
            return False
            
        if not self.created_review_id:
            self.log_result("Delete Review", False, "No review ID available for deletion")
            return False
            
        try:
            response = requests.delete(
                f"{self.base_url}/reviews/{self.created_review_id}",
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_result("Delete Review", True, "Successfully deleted review", data)
                    return True
                else:
                    self.log_result("Delete Review", False, "Response missing success field", data)
                    return False
            else:
                self.log_result("Delete Review", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Delete Review", False, f"Exception: {str(e)}")
            return False
    
    def test_fetch_about_content(self):
        """Test fetching about content"""
        try:
            response = requests.get(f"{self.base_url}/about", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'content' in data:
                    self.log_result("Fetch About Content", True, "Successfully fetched about content", data)
                    return True
                else:
                    self.log_result("Fetch About Content", False, "Response missing content field", data)
                    return False
            else:
                self.log_result("Fetch About Content", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Fetch About Content", False, f"Exception: {str(e)}")
            return False
    
    def test_update_about_content(self):
        """Test updating about content (requires admin authentication)"""
        if not self.admin_token:
            self.log_result("Update About Content", False, "No admin token available")
            return False
            
        try:
            update_data = {
                "content": "Welcome to my updated portfolio! I'm a full-stack developer passionate about creating amazing web experiences."
            }
            
            response = requests.put(
                f"{self.base_url}/about",
                json=update_data,
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_result("Update About Content", True, "Successfully updated about content", data)
                    return True
                else:
                    self.log_result("Update About Content", False, "Response missing success field", data)
                    return False
            else:
                self.log_result("Update About Content", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Update About Content", False, f"Exception: {str(e)}")
            return False
    
    def test_analytics_tracking(self):
        """Test analytics tracking"""
        try:
            track_data = {"page": "home"}
            
            response = requests.post(
                f"{self.base_url}/analytics/track",
                json=track_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_result("Analytics Tracking", True, "Successfully tracked page view", data)
                    return True
                else:
                    self.log_result("Analytics Tracking", False, "Response missing success field", data)
                    return False
            else:
                self.log_result("Analytics Tracking", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Analytics Tracking", False, f"Exception: {str(e)}")
            return False
    
    def test_fetch_analytics(self):
        """Test fetching analytics (requires admin authentication)"""
        if not self.admin_token:
            self.log_result("Fetch Analytics", False, "No admin token available")
            return False
            
        try:
            response = requests.get(
                f"{self.base_url}/analytics",
                headers={"Authorization": self.admin_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['totalViews', 'totalVisits', 'pageViews', 'recentViews']
                if all(field in data for field in required_fields):
                    self.log_result("Fetch Analytics", True, "Successfully fetched analytics data", data)
                    return True
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_result("Fetch Analytics", False, f"Missing required fields: {missing_fields}", data)
                    return False
            else:
                self.log_result("Fetch Analytics", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_result("Fetch Analytics", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Portfolio Website Backend API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        tests = [
            self.test_admin_login_correct,
            self.test_admin_login_incorrect,
            self.test_create_blog_review,
            self.test_create_movie_review,
            self.test_create_book_review,
            self.test_create_product_review,
            self.test_fetch_all_reviews,
            self.test_fetch_reviews_by_type,
            self.test_update_review,
            self.test_fetch_about_content,
            self.test_update_about_content,
            self.test_analytics_tracking,
            self.test_fetch_analytics,
            self.test_delete_review,  # Delete last to clean up
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                if test():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL: {test.__name__} - Unexpected error: {str(e)}")
                failed += 1
        
        print("=" * 60)
        print(f"📊 Test Results Summary:")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
        
        return passed, failed, self.test_results

if __name__ == "__main__":
    tester = PortfolioAPITester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)