from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

def login(directory, headless=False):
    username = REDACTED;
    password = REDACTED;
    chromedriver_path = '/Users/kevinboroumand/Library/CloudStorage/OneDrive-Personal/repos/Site Builder/Chrome Driver/chromedriver'
    
    chrome_options = Options()
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--remote-debugging-port=9222')  # Choose a different port if needed
    if headless:
        chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')  # Bypass OS security model, recommended for Linux
    chrome_options.add_argument('--disable-dev-shm-usage')  # Overcome limited resource problems

    # Instantiate the WebDriver with the Chrome Driver and options
    driver = webdriver.Chrome(service=Service(chromedriver_path), options=chrome_options)
    wait = WebDriverWait(driver, 10)

    try:
        # Navigate to the login page
        driver.get(f"https://{directory}.realgeeks.com/admin")

        # Login process
        user_input = wait.until(EC.presence_of_element_located((By.ID, "si-email")))
        pass_input = wait.until(EC.presence_of_element_located((By.ID, "si-password")))
        user_input.send_keys(username)
        pass_input.send_keys(password)
        submit_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "log-in")))
        submit_button.click()

        # Add any post-login checks here if necessary to ensure login was successful

        return driver
    except Exception as e:
        print(f"Login failed: {e}")
        driver.quit()  # Ensure the driver is quit properly to avoid resource leaks
        return None
