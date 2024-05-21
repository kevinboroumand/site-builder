import os
import csv
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from .login import login  # Your existing login function
import logging
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote.remote_connection import LOGGER
from selenium import webdriver

LOGGER.setLevel(logging.WARNING)

def gatheroptions(directory, encoded_folder, base_dir):
    driver = login(directory, headless=True)  # Make sure the login function is defined elsewhere
    wait = WebDriverWait(driver, 10)
    

    if driver is None:
        return {'status': 'error', 'message': 'Login failed'}

    time.sleep(2)

    try:
        driver.get(f"http://www.{directory}.realgeeks.com/admin/content/contentpage/add/")
        time.sleep(1)
        
        openUp = wait.until(EC.presence_of_element_located((By.ID, "fieldsetcollapser3")))
        openUp.click()

        createSearch = wait.until(EC.presence_of_element_located((By.ID, "search-id_open")))
        createSearch.click()
        time.sleep(5)
        
        modal = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'ReactModal__Content')))
        
        # JavaScript to find main areas elements with specific background color and remove the plus sign
        script_main_areas = """
        var matchingElements = [];
        var allElements = document.querySelectorAll('.ReactModal__Content ul li');
        allElements.forEach(function(el) {
            var style = window.getComputedStyle(el);
            if (style.background.includes('rgba(168, 228, 177, 0.6)')){
                var name = el.textContent.trim().replace('+', '');  // Remove the plus sign
                matchingElements.push(name);
            }
        });
        return matchingElements;
        """
        
        # JavaScript to find other options elements with different background color and remove the plus sign
        script_other_options = """
        var matchingElements = [];
        var allElements = document.querySelectorAll('.ReactModal__Content ul li');
        allElements.forEach(function(el) {
            var style = window.getComputedStyle(el);
            if (!style.background.includes('rgba(168, 228, 177, 0.6)')){
                var name = el.textContent.trim().replace('+', '');  // Remove the plus sign
                matchingElements.push(name);
            }
        });
        return matchingElements;
        """

        # Execute the JavaScript and get the matching elements for main options
        main_options = driver.execute_script(script_main_areas)
        print("Main Options:", main_options)

        # Execute the JavaScript and get the matching elements for other options
        other_options = driver.execute_script(script_other_options)
        print("Other Options:", other_options)

        # Save main options to CSV
        main_csv_filename = os.path.join(base_dir, encoded_folder, 'main_options.csv')
        print(main_csv_filename)
        with open(main_csv_filename, 'w', newline='', encoding='utf-8') as main_csvfile:
            main_writer = csv.writer(main_csvfile)
            main_writer.writerow(['Name', 'Active?'])
            for name in main_options:
                main_writer.writerow([name, 'No'])
        print("Main Options saved to CSV")

        # Save other options to CSV
        other_csv_filename = os.path.join(base_dir, encoded_folder, 'other_options.csv')
        with open(other_csv_filename, 'w', newline='', encoding='utf-8') as other_csvfile:
            other_writer = csv.writer(other_csvfile)
            other_writer.writerow(['Name', 'Active?'])
            for name in other_options:
                other_writer.writerow([name, 'No'])
        print("Other Options saved to CSV")


        return {'status': 'success', 'message': 'Gathering IDX options processed successfully'}
        
    except Exception as ex:
        return {'status': 'error', 'message': f'Error occurred: {ex}'}
    
    finally:
        driver.quit()  # Ensure the driver is closed after the session
