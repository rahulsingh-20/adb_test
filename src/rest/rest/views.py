from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging
from .services import TodoService
from .exceptions import DatabaseError

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = TodoService.get_all_todos()
            return Response(todos, status=status.HTTP_200_OK)
        except DatabaseError as e:
            logging.error(f"Error fetching todos: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            todo_data = request.data
            inserted_id = TodoService.add_todo(todo_data)
            return Response({"message": "Todo item added successfully", "id": inserted_id}, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            logging.error(f"Error adding todo item: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            