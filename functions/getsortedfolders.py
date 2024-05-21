import os
import csv
from datetime import datetime
from urllib.parse import quote_plus
import logging
from selenium.webdriver.remote.remote_connection import LOGGER

LOGGER.setLevel(logging.WARNING)


############################################
# Function to check if a directory contains projectinfo.csv
############################################
def is_project(directory):
    return os.path.exists(os.path.join(directory, 'projectinfo.csv'))


def get_sorted_project_folders(base_dir):
    projects_dir = os.path.join(base_dir)
    project_folders = [folder for folder in os.listdir(projects_dir) if os.path.isdir(os.path.join(projects_dir, folder)) and is_project(os.path.join(projects_dir, folder))]

    project_dates = {}
    for folder in project_folders:
        project_path = os.path.join(projects_dir, folder)
        project_info_file = os.path.join(project_path, 'projectinfo.csv')
        if os.path.exists(project_info_file):
            with open(project_info_file, 'r') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    date_edited = None
                    date_created = None
                    if 'Date Edited' in row and row['Date Edited']:
                        try:
                            date_edited = datetime.strptime(row['Date Edited'], '%Y-%m-%d %H:%M:%S')
                            edited_formatted = date_edited.strftime('%m/%d/%y, %I:%M%p')
                        except ValueError:
                            edited_formatted = None
                    else:
                        edited_formatted = None

                    if 'Date Created' in row and row['Date Created']:
                        try:
                            date_created = datetime.strptime(row['Date Created'], '%Y-%m-%d %H:%M:%S')
                            created_formatted = date_created.strftime('%m/%d/%y, %I:%M%p')
                        except ValueError:
                            created_formatted = None
                    else:
                        created_formatted = None

                    project_dates[folder] = (date_edited, date_created)

    sorted_project_folders = sorted(
        project_folders, 
        key=lambda x: (
            project_dates.get(x, (None, datetime.min))[0] or datetime.max,
            project_dates.get(x, (None, datetime.min))[1] or datetime.min
        ), 
        reverse=True
    )

    encoded_project_folders = []
    for folder in sorted_project_folders:
        edited_date = project_dates[folder][0]
        edited = edited_date.strftime('%Y-%m-%d %H:%M:%S') if edited_date else None
        encoded_project_folders.append((folder, quote_plus(folder), edited))

    return encoded_project_folders

