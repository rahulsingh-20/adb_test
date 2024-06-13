import logging
from pymongo import MongoClient
from .config import Config
from .exceptions import DatabaseError

db = MongoClient(Config.MONGO_URI)[Config.DATABASE_NAME]
todo_collection = db[Config.COLLECTION_NAME]

class TodoRepository:

    @staticmethod
    def find_all():
        try:
            todos = list(todo_collection.find())
            return todos
        except Exception as e:
            logging.error(f"Error fetching todos: {str(e)}")
            raise DatabaseError("Failed to fetch todos")

    @staticmethod
    def insert(todo_data):
        try:
            result = todo_collection.insert_one(todo_data)
            return result.inserted_id
        except Exception as e:
            logging.error(f"Error adding todo item: {str(e)}")
            raise DatabaseError("Failed to add todo item")
            