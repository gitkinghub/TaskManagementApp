# Task Management Application - Backend

## Overview

This is the backend for a Task Management Application built with Django and Django REST Framework. It provides APIs for user registration, authentication, task management, and user profile management.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.8 or higher
- pip (Python package installer)
- virtualenv (optional but recommended for creating a virtual environment)

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/task-management-backend.git
   cd task-management-backend

   or you can choose to donwload the zip code

2. Create and activate a virtual environment (optional but recommended):
   python -m venv env

   # On Windows:

   .\env\Scripts\activate

   # On macOS/Linux:

   source env/bin/activate

3. Install dependencies:
   pip install -r 'your packages here'
   These are just some of them:

   - pip install django
   - pip install django-cors-headers
   - pip install djangorestframework
   - pip install dj-database-url
   - pip install django-rest-knox

4. Set up the database:

   - python manage.py makemigrations
   - python manage.py migrate

5. Create a superuser (optional):
   python manage.py createsuperuser

6. Run the development server:

   - python manage.py runserver

   The backend server will be running at http://127.0.0.1:8000/.

## API Endpoints

Authentication

- Register: POST /api/register/
- Login: POST /api/login/
- Logout: POST /api/logout/

User Profile

- Get User Profile: GET /api/user/
- Update User Profile: PUT /api/user/
- Change Password: PATCH /api/user/

Tasks

- List Tasks: GET /api/tasks/
- Create Task: POST /api/tasks/
- Retrieve Task: GET /api/tasks/<id>/
- Update Task: PATCH /api/tasks/<id>/
- Delete Task: DELETE /api/tasks/<id>/

## Running Tests

To run the tests for the application, use the following command:
python manage.py test

This will run all the unit tests and ensure that everything is functioning correctly.

## Contributing

Contributions to this project are welcome only after request approval. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/AmazingFeature)
3. Make your changes
4. Commit your changes (git commit -m 'Add some AmazingFeature')
5. Push to the branch (git push origin feature/AmazingFeature)
6. Open a Pull Request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
