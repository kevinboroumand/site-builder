ChatGPT 3.5

User
import os
import csv
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from login import login  # Your existing login function
import logging
from selenium.webdriver.remote.remote_connection import LOGGER

LOGGER.setLevel(logging.WARNING)

def get_dropdown_options(select_element):
    select = Select(select_element)
    return [option.text for option in select.options if option.text.strip()]

def wait_for_next_dropdown_to_refresh(driver, wait, current_index, header_texts):
    if current_index + 1 < len(header_texts):
        next_header = header_texts[current_index + 1]
        dynamic_li_xpath = f"//li[contains(., '{next_header}') and not(contains(., '+'))]"
        wait.until(EC.visibility_of_element_located((By.XPATH, dynamic_li_xpath)))

def recursive_option_combinations(driver, wait, header_texts, current_index, current_combination, idx_data_file_path):
    if current_index >= len(header_texts):
        with open(idx_data_file_path, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(current_combination)
            print(f"Combination written: {current_combination}")  # Debugging output
        return

    header = header_texts[current_index]
    dynamic_li_xpath = f"//li[contains(., '{header}') and not(contains(., '+'))]"
    dynamic_li = wait.until(EC.visibility_of_element_located((By.XPATH, dynamic_li_xpath)))
    select_element = dynamic_li.find_element(By.TAG_NAME, 'select')

    options = get_dropdown_options(select_element)
    if options:
        for option_index, option_text in enumerate(options):
            Select(select_element).select_by_visible_text(option_text)
            print(f"Selected: {option_text} from {header}")  # Debugging output

            if current_index + 1 < len(header_texts):
                # Introduce delay and wait for the next dropdown to refresh
                wait_for_next_dropdown_to_refresh(driver, wait, current_index, header_texts)
                time.sleep(0.5)  # Adjust this delay as necessary

            next_combination = current_combination.copy()
            next_combination.append(option_text)
            recursive_option_combinations(driver, wait, header_texts, current_index + 1, next_combination, idx_data_file_path)
    else:
        print(f"No options in {header}, moving to next dropdown")  # Debugging output
        recursive_option_combinations(driver, wait, header_texts, current_index + 1, current_combination + [''], idx_data_file_path)

def process_idx(directory, encoded_folder, base_dir):
    print("Starting IDX processing for: " + directory)
    driver = login(directory)  # Make sure the login function is defined elsewhere
    wait = WebDriverWait(driver, 10)

    if driver is None:
        print("Login failed, cannot proceed with IDX processing.")
        return {'status': 'error', 'message': 'Login failed'}

    time.sleep(1)

    try:
        driver.get(f"http://www.{directory}.realgeeks.com/admin/content/contentpage/add/")
        time.sleep(1)
        
        openUp = wait.until(EC.presence_of_element_located((By.ID, "fieldsetcollapser3")))
        openUp.click()

        createSearch = wait.until(EC.presence_of_element_located((By.ID, "search-id_open")))
        createSearch.click()
        time.sleep(2)
        
        modal = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'ReactModal__Content')))
        # JavaScript to find elements with specific background color
        js_script = """
        var matchingElements = [];
        var allElements = document.querySelectorAll('.ReactModal__Content ul li');
        allElements.forEach(function(el) {
            var style = window.getComputedStyle(el);
            if (style.background.includes('rgba(168, 228, 177, 0.6)') && !el.innerText.includes('Polygon')) {
                matchingElements.push(el);
            }
        });
        return matchingElements;
        """

        # Execute the JavaScript and click on the matching elements
        matching_elements = driver.execute_script(js_script)
        clicked_texts = []
        for element in matching_elements:
            text_without_plus = element.text.replace('+', '')
            clicked_texts.append(text_without_plus)
            driver.execute_script("arguments[0].click();", element)
            time.sleep(0.5)  # Adjust timing if necessary
        
        # Initialize CSV with headers
        idx_data_file_path = os.path.join(base_dir, encoded_folder, 'IDX-Data.csv')
        with open(idx_data_file_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(clicked_texts)  # Write headers to CSV

        # Start the recursive combination building
        recursive_option_combinations(driver, wait, clicked_texts, 0, [], idx_data_file_path)

        return {'status': 'success', 'message': 'IDX data processed successfully'}
        
    except Exception as ex:
        print(f"Error during IDX processing: {ex}")
        return {'status': 'error', 'message': f'Error occurred: {ex}'}
    finally:
        driver.quit()  # Ensure the driver is closed after the session

# Ensure login, WebDriverWait, and any other required functions are defined elsewhere in the code