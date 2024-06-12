from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todo_collection = db['todos']  # assuming the collection is named 'todos'

class TodoListView(APIView):

    def get(self, request):
        try:
            # Fetch all todo items from the MongoDB collection
            todos = list(todo_collection.find())
            # Convert ObjectId to string for JSON serialization
            for todo in todos:
                todo['_id'] = str(todo['_id'])
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            logging.error(f"Error fetching todos: {str(e)}")
            return Response({"error": "Failed to fetch todo items"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            # Parse the request data
            todo_data = request.data
            # Insert the todo item into the MongoDB collection
            result = todo_collection.insert_one(todo_data)
            return Response({"message": "Todo item added successfully", "id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error(f"Error adding todo item: {str(e)}")
            return Response({"error": "Failed to add todo item"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

