from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
from flask import Response
import os
import csv
import shutil
from datetime import datetime
from urllib.parse import quote_plus, unquote_plus
import logging
import pandas as pd
from functions import *

app = Flask(__name__, template_folder='templates')

logging.basicConfig(level=logging.DEBUG)
app.logger.setLevel(logging.DEBUG)

# Disable session management
app.config['SESSION_TYPE'] = 'null'

# Set a dummy secret key to suppress the warning
app.config['SECRET_KEY'] = 'dummy_secret_key'

progress_percentage = 0

def get_progress_percentage():
    global progress_percentage
    return progress_percentage

@app.route('/progress', methods=['GET'])
def progress():
    global progress_percentage
    return jsonify({'progress': progress_percentage})

############################################
# Homepage
############################################
@app.route('/')
def home():
    base_dir = 'Site Builder/Projects'  # Update this path if needed
    sorted_project_folders = get_sorted_project_folders(base_dir)
    return render_template('home.html', sorted_project_folders=sorted_project_folders)


############################################
# Create a new project
############################################
@app.route('/create')
def create():
    return render_template('create.html')

############################################
# All projects page
############################################
@app.route('/allprojects')
def all_projects():
    base_dir = 'Site Builder/Projects'  # Update this path if needed
    sorted_project_folders = get_sorted_project_folders(base_dir)
    return render_template('allprojects.html', sorted_project_folders=sorted_project_folders)


############################################
# Submit form to create a new project
############################################
@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        # Extract form data
        project_id = request.form['project_id']
        website = request.form['website']
        directory = request.form['directory']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        phone = request.form['phone']
        brokerage = request.form['brokerage']
        main_area = request.form['main_area']
        main_state = request.form['main_state']

        # Specify a relative path for the 'Projects' directory
        base_dir = 'Site Builder/Projects'  # Update this path if needed
        projects_dir = os.path.join(base_dir)

        # Ensure the 'Projects' directory exists
        os.makedirs(projects_dir, exist_ok=True)

        # Create project directory name
        project_dir_name = f"{first_name} {last_name} — {website}, #{project_id}"

        # Check if project directory already exists
        project_dir = os.path.join(projects_dir, project_dir_name)
        if os.path.exists(project_dir):
            return 'Project directory already exists. No action taken.'

        # Since directory doesn't exist, create it now
        os.makedirs(project_dir, exist_ok=True)

        # Initialize site_files directory
        site_files_dir = os.path.join(project_dir, 'site_files')
        css_dir = os.path.join(site_files_dir, 'css')
        js_dir = os.path.join(site_files_dir, 'js')
        html_dir = os.path.join(site_files_dir, 'html')

        # Ensure the css and js directories exist
        os.makedirs(css_dir, exist_ok=True)
        os.makedirs(js_dir, exist_ok=True)

        # Ensure the html directory exists
        os.makedirs(html_dir, exist_ok=True)

        # Update the file creation list with corrected paths
        files_to_create = [
            os.path.join(project_dir, 'projectinfo.csv'), 
            os.path.join(project_dir, 'IDX-Data.csv'), 
            os.path.join(project_dir, 'page-creation.csv'), 
            os.path.join(project_dir, 'page-creation-criteria.csv'), 
            os.path.join(project_dir, 'main-pages.csv'), 
            os.path.join(project_dir, 'actions.csv'),
            os.path.join(js_dir, 'main-head.js'),
            os.path.join(js_dir, 'main-footer.js'),
            os.path.join(js_dir, 'main-bodyclose.js'),
            os.path.join(js_dir, 'custom.js'),
            os.path.join(css_dir, 'main.css'),
            os.path.join(css_dir, 'custom.css'),
            os.path.join(html_dir, 'home.html'),
            os.path.join(html_dir, 'selling.html'),
            os.path.join(html_dir, 'buying.html'),
            os.path.join(html_dir, 'footer.html'),
            os.path.join(html_dir, 'sidebar.html'),
            os.path.join(html_dir, 'blog.html')
        ]

        # Copy template files for css and js
        default_dir = 'Site Builder//default_site_files'  # Update this path if needed
        for file_path in files_to_create:
            file_name = os.path.basename(file_path)
            if file_name.endswith('.css') or file_name.endswith('.js') or file_name.endswith('.html'):
                template_file_path = os.path.join(default_dir, file_name)
                shutil.copy(template_file_path, file_path)

        # Write form data to projectinfo.csv
        project_info_file = os.path.join(project_dir, 'projectinfo.csv')
        with open(project_info_file, 'w', newline='') as csvfile:
            fieldnames = ['Project ID', 'Website', 'Directory', 'First Name', 'Last Name', 'Email', 'Phone', 'Brokerage', 'Main Area', 'Main State', 'Date Created', 'Date Edited']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            # Write header row
            writer.writeheader()

            # Write form data
            writer.writerow({
                'Project ID': project_id,
                'Website': website,
                'Directory': directory,
                'First Name': first_name,
                'Last Name': last_name,
                'Email': email,
                'Phone': phone,
                'Brokerage': brokerage,
                'Main Area': main_area,
                'Main State': main_state,
                'Date Created': datetime.now().strftime('%Y-%m-%d %H:%M:%S PST'),
                'Date Edited': ''
            })

        # Create other CSV files
        for csv_file in ['IDX-Data.csv', 'page-creation.csv', 'page-creation-criteria.csv', 'main-pages.csv', 'actions.csv']:
            csv_path = os.path.join(project_dir, csv_file)
            with open(csv_path, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([])  # Write an empty row to create the CSV file

        return 'Form submitted successfully. Project directory and files created.'




############################################
# Project page
############################################
@app.route('/project/<path:encoded_folder>')
def project(encoded_folder):
    # Decode the encoded folder name
    project_folder = unquote_plus(encoded_folder)

    # Your base directory where projects are stored
    base_dir = 'Site Builder/Projects'

    # Construct the full path to the projectinfo.csv file for the requested project
    csv_file_path = os.path.join(base_dir, project_folder, 'projectinfo.csv')

    project_data = {}
    if os.path.exists(csv_file_path):
        # Open and read the CSV file
        with open(csv_file_path, mode='r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                project_data = row  # Assuming there's only one row of data per project
                break  # Exit the loop after reading the first row

    # Construct the full path to the IDX-Data.csv file for the requested project
    idx_data_file_path = os.path.join(base_dir, project_folder, 'IDX-Data.csv')
    
    # Check if the IDX-Data.csv file has any content at all
    idx_data_empty = True
    if os.path.exists(idx_data_file_path):
        # Check if file size is greater than 0 to determine if it's not empty
        if os.path.getsize(idx_data_file_path) > 0:
            idx_data_empty = False

    app.logger.debug(f"IDX Data Empty: {idx_data_empty}")

    # Determine the completion status based on IDX data presence
    completion_status = "Completed" if not idx_data_empty else "Not Completed"
    # Inside the project route function
    flash(idx_data_file_path, 'idx_data_file_path')  # Ensure idx_data_file_path is not None here
    return render_template('project.html', project_data=project_data, project_id=encoded_folder, idx_data_empty=idx_data_empty, completion_status=completion_status)

############################################
# Route for processing IDX data
############################################
@app.route('/process_idx/<directory>', methods=['POST'])
def process_idx_route(directory):
    base_dir = 'Site Builder/Projects'
    encoded_folder = request.args.get('encoded_folder')
    print("Encoded folder received:", encoded_folder)
    # Call the process_idx function with the directory and path to the idx-data.csv file
    result = process_idx(directory, encoded_folder, base_dir)
    return jsonify({'result': result, 'reload': True})

############################################
# Route for grabbing IDX options
############################################
@app.route('/gatheroptions/<directory>', methods=['POST'])
def gather_options_route(directory):
    base_dir = 'Site Builder/Projects'
    encoded_folder = request.args.get('encoded_folder')
    print("Encoded folder received:", encoded_folder)

    # Use your gatheroptions function to process and save the options
    result = gatheroptions(directory, encoded_folder, base_dir)

    # Paths to the CSV files where options are saved
    main_options_path = os.path.join(base_dir, encoded_folder, 'main_options.csv')
    other_options_path = os.path.join(base_dir, encoded_folder, 'other_options.csv')

    # Read options from the CSV files
    main_options, other_options = [], []
    try:
        with open(main_options_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                main_options.append(row['Name'])
    except FileNotFoundError:
        print("Main options CSV file not found.")

    try:
        with open(other_options_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                other_options.append(row['Name'])
    except FileNotFoundError:
        print("Other options CSV file not found.")

    # Send the options back to the client
    return jsonify({
        'result': result,  # This contains the status and message from the gatheroptions function
        'reload': False,  # Indicate whether the client should reload or not
        'main_options': main_options,
        'other_options': other_options
    })

############################################
# Route for checking options
############################################
@app.route('/checkoptions/<directory>', methods=['GET'])
def check_options(directory):
    # Log the received directory for debugging
    print("Directory received:", directory)

    base_dir = 'Site Builder/Projects'
    encoded_folder = request.args.get('encoded_folder')
    print("Encoded folder received:", encoded_folder)

    # Paths to the CSV files
    main_options_path = os.path.join(base_dir, encoded_folder, 'main_options.csv')
    other_options_path = os.path.join(base_dir, encoded_folder, 'other_options.csv')

  # Adjusted to read and return active status
    main_options, other_options = [], []
    if os.path.exists(main_options_path):
        with open(main_options_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                main_options.append({'Name': row['Name'], 'Active?': row['Active?']})

    if os.path.exists(other_options_path):
        with open(other_options_path, mode='r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                other_options.append({'Name': row['Name'], 'Active?': row['Active?']})

    return jsonify({
        'main_options': main_options,
        'other_options': other_options
    })
############################################
# Function to update project info and rename its parent folder
############################################
def update_project_info(project_id, updated_data):
    # Decode the encoded folder name
    project_folder = unquote_plus(project_id)

    # Your base directory where projects are stored
    base_dir = 'Site Builder/Projects'

    # Ensure required fields for folder renaming are in updated_data
    required_fields = ['First Name', 'Last Name', 'Website']
    if not all(key in updated_data for key in required_fields):
        print("Updated data must include 'First Name', 'Last Name', and 'Website'.")
        return

    updated = False  # Flag to track if the project info has been updated

    for root, dirs, files in os.walk(base_dir):
        if 'projectinfo.csv' in files:
            csv_file_path = os.path.join(root, 'projectinfo.csv')
            # Temporarily store updated rows
            updated_rows = []
            with open(csv_file_path, 'r', newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    if row['Project ID'] == project_folder:
                        # Update each field in the row with corresponding updated data
                        for key, value in updated_data.items():
                            if key != 'Date Created':  # Exclude 'Date Created' from being updated
                                row[key] = value
                        updated = True
                    updated_rows.append(row)

            if updated:
                # Rewrite the CSV with updated data
                with open(csv_file_path, 'w', newline='') as csvfile:
                    writer = csv.DictWriter(csvfile, fieldnames=reader.fieldnames)
                    writer.writeheader()
                    writer.writerows(updated_rows)
                    
                # Construct the new folder name
                first_name = updated_data['First Name']
                last_name = updated_data['Last Name']
                website = updated_data['Website']
                project_dir_name = f"{first_name} {last_name} — {website}, #{project_id}"
                new_folder_path = os.path.join(base_dir, project_dir_name)

                # Rename the folder to reflect changes
                current_folder_path = os.path.dirname(csv_file_path)
                try:
                    os.rename(current_folder_path, new_folder_path)
                    print(f"Folder renamed to '{project_dir_name}' successfully.")
                except OSError as e:
                    print(f"Failed to rename folder: {e}")
                    
                print("Project info updated successfully.")
                return

    if not updated:
        print("Project ID not found in any 'projectinfo.csv'.")

############################################
# Route for updating option status
############################################
@app.route('/update_option_status', methods=['POST'])
def update_option_status():
    encoded_folder = request.args.get('encoded_folder')
    option_name = request.args.get('option_name')
    status = request.args.get('status')
    option_type = request.args.get('option_type')  # Receive option_type as a query parameter

    # Determine the correct CSV file path based on option_type
    if option_type == 'main':
        csv_file_path = os.path.join('Site Builder/Projects', encoded_folder, 'main_options.csv')
    elif option_type == 'other':
        csv_file_path = os.path.join('Site Builder/Projects', encoded_folder, 'other_options.csv')
    else:
        return jsonify({'status': 'error', 'message': 'Invalid option type'})

    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path)
        # Update the 'Active?' column for the row with the matching 'Name'
        df.loc[df['Name'] == option_name, 'Active?'] = status
        # Write the changes back to the CSV file
        df.to_csv(csv_file_path, index=False)
        return jsonify({'status': 'success', 'message': 'Option status updated successfully'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})


############################################
# Route for updating project
############################################
@app.route('/update_project/<path:project_id>', methods=['POST'])
def update_project(project_id):
    if request.method == 'POST':
        # Read form data
        updated_data = {
            'Project ID': request.form['Project ID'],
            'Website': request.form['Website'],
            'Directory': request.form['Directory'],
            'First Name': request.form['First Name'],
            'Last Name': request.form['Last Name'],
            'Email': request.form['Email'],
            'Phone': request.form['Phone'],
            'Brokerage': request.form['Brokerage'],
            'Main Area': request.form['Main Area'],
            'Main State': request.form['Main State'],
            'Date Created': '',  # Assume this gets correctly updated elsewhere if needed
            'Date Edited': datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Capture current edit time
        }

        # Update project info
        update_project_info(project_id, updated_data)

        # Construct the unique identifier or directory name for redirection
        # This needs to match how you generate URLs for project pages on the homepage
        project_directory_name = updated_data['First Name'] + " " + updated_data['Last Name'] + " — " + updated_data['Website'] + ", #" + updated_data['Project ID']
        encoded_folder = quote_plus(project_directory_name)  # Encode to match URL format

        # Redirect back to the project page using the encoded directory name or unique identifier
        return redirect(url_for('project', encoded_folder=encoded_folder))


############################################
# Run the app
############################################
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)