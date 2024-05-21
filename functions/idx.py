import os
import csv
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from .login import *  # Your existing login function
from .login import login
import logging
from selenium.webdriver.remote.remote_connection import LOGGER
import traceback


LOGGER.setLevel(logging.WARNING)

def read_active_options(csv_file_path):
    active_options = []
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['Active?'].strip().lower() == 'yes':
                active_options.append(row['Name'].strip())  # Adjust 'Option' if your column name differs
    return active_options

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

    if not Select(select_element).is_multiple:
        print(f"Skipping {header} as it doesn't support multiple selections")  # Debugging output
        recursive_option_combinations(driver, wait, header_texts, current_index + 1, current_combination, idx_data_file_path)
        return

    select = Select(select_element)
    options = [option.text for option in select.options]
    last_option_text = None  # Track the last selected option text

    for option_text in options:
        if last_option_text:  # Deselect the last selected option before selecting a new one
            select.deselect_by_visible_text(last_option_text)
        
        select.select_by_visible_text(option_text)
        print(f"Selected: {option_text} from {header}")  # Debugging output
        last_option_text = option_text  # Update the last selected option

        if current_index + 1 < len(header_texts):
            wait_for_next_dropdown_to_refresh(driver, wait, current_index, header_texts)
            time.sleep(1)  # Adjust delay as necessary

        next_combination = current_combination.copy()
        next_combination.append(option_text)
        recursive_option_combinations(driver, wait, header_texts, current_index + 1, next_combination, idx_data_file_path)
    
    if not options:
        print(f"No options in {header}, moving to next dropdown")  # Debugging output
        recursive_option_combinations(driver, wait, header_texts, current_index + 1, current_combination + [''], idx_data_file_path)

def process_idx(directory, encoded_folder, base_dir):
    print("Starting IDX processing for: " + directory)
    driver = login(directory)  # Your existing login function
    wait = WebDriverWait(driver, 10)

    if driver is None:
        print("Login failed, cannot proceed with IDX processing.")
        return {'status': 'error', 'message': 'Login failed'}

    # Reading active options from CSV files
    main_options_path = os.path.join(base_dir, encoded_folder, 'main_options.csv')
    other_options_path = os.path.join(base_dir, encoded_folder, 'other_options.csv')
    main_active_options = read_active_options(main_options_path)
    other_active_options = read_active_options(other_options_path)
    all_active_options = main_active_options + other_active_options

    print(main_active_options)

    # Convert all_active_options to a JavaScript array string for injection
    js_options_array = str(all_active_options).replace("'", '"')

    time.sleep(1)  # Adjust delay as necessary

    try:
        driver.get(f"http://{directory}.realgeeks.com/admin/content/contentpage/add/")
        time.sleep(5)
        
        openUp = wait.until(EC.presence_of_element_located((By.ID, "fieldsetcollapser3")))
        openUp.click()

        createSearch = wait.until(EC.presence_of_element_located((By.ID, "search-id_open")))
        createSearch.click()
        time.sleep(2)
        
        modal = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'ReactModal__Content')))

        # Modified JavaScript script using all_active_options for dynamic selection
        js_script = f"""
        var activeOptions = {js_options_array};
        var matchingElements = [];
        var allElements = document.querySelectorAll('.ReactModal__Content ul li');
        allElements.forEach(function(el) {{
            var text = el.innerText.replace('+', '').trim(); // Remove "+" and then trim whitespace
            if (activeOptions.includes(text)) {{
                matchingElements.push(el);
            }}
        }});
        return matchingElements;
        """


        # Execute the modified JavaScript and interact with matching elements
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

        # Start recursive option combinations building
        recursive_option_combinations(driver, wait, clicked_texts, 0, [], idx_data_file_path)

        return {'status': 'success', 'message': 'IDX data processed successfully'}
    except Exception as ex:
        print(f"Error during IDX processing: {ex}")
        return {'status': 'error', 'message': f'Error occurred: {ex}'}
    finally:
        driver.quit()  # Ensure the driver is closed after the session