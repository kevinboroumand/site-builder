document.addEventListener('DOMContentLoaded', function () {
    if ($('#main_state').length > 0) {
        var mainStateDropdown = document.getElementById('main_state');

        // Array of US states
        var usStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

        // Array of Canadian provinces
        var canadianProvinces = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"];

        // Add US states to dropdown
        usStates.forEach(function (state) {
            var option = document.createElement('option');
            option.text = state;
            option.value = state;
            mainStateDropdown.add(option);
        });

        // Add Canadian provinces to dropdown
        canadianProvinces.forEach(function (province) {
            var option = document.createElement('option');
            option.text = province;
            option.value = province;
            mainStateDropdown.add(option);
        });
    }

    if ($('#projectForm').length > 0) {
        // Function to validate form
        function validateForm() {
            var project_id = document.getElementById('project_id').value;
            var website = document.getElementById('website').value;
            var directory = document.getElementById('directory').value;
            var first_name = document.getElementById('first_name').value;
            var last_name = document.getElementById('last_name').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            var brokerage = document.getElementById('brokerage').value;
            var main_area = document.getElementById('main_area').value;
            var main_state = document.getElementById('main_state').value;

            if (!project_id || !website || !directory || !first_name || !last_name || !email || !phone || !brokerage || !main_area || !main_state) {
                document.getElementById('error-message').style.display = 'block';
                return false; // Prevent form submission
            }

            return true; // Allow form submission
        }

        // Store initial form data
        var initialFormData = $('#projectForm').serialize();

        // Function to check if form data has changed
        function hasFormDataChanged() {
            return $('#projectForm').serialize() !== initialFormData;
        }

        // Enable the update button if form data has changed
        $('input').on('input', function () {
            if (hasFormDataChanged()) {
                $('#updateBtn').prop('disabled', false);
            } else {
                $('#updateBtn').prop('disabled', true);
            }
        });

        // Submit form when button is clicked
        $('#updateBtn').click(function () {
            if (hasFormDataChanged()) {
                $('#projectForm').submit();
            }
        });
    }
    
});
        
// Loading spinner
function toggleSpinner(show) {
    const spinner = document.getElementById('progress-options');
    spinner.style.display = show ? 'block' : 'none';
}


