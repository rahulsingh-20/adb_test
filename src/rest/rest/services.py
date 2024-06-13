from .repositories import TodoRepository
from .exceptions import DatabaseError

class TodoService:

    @staticmethod
    def get_all_todos():
        try:
            todos = TodoRepository.find_all()
            for todo in todos:
                todo['_id'] = str(todo['_id'])
            return todos
        except DatabaseError as e:
            raise e

    @staticmethod
    def add_todo(todo_data):
        try:
            inserted_id = TodoRepository.insert(todo_data)
            return str(inserted_id)
        except DatabaseError as e:
            raise e
            
