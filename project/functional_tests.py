

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# TODO
# test sign up, but have to delete the user that is created
# as a logged in user, go to create new poll and submit that form
# voting for a current poll
# can test alot of these just based on the success message

class PollsterTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_login(self):
        driver = self.driver
        driver.get("http://localhost:80/login")

        username = driver.find_element_by_name("username")
        password = driver.find_element_by_name("password")

        username.send_keys("danielcodes")
        password.send_keys("hello123")

        driver.find_element_by_css_selector(".button[type='submit']").click()

        self.assertIn("Welcome to Pollster", driver.page_source)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
