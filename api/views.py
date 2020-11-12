from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['POST'])
    def login(self, request):

        username = request.data['username']
        password = request.data['password']

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                message = {'message': 'Invalid Password or Username.'}
                return Response(message, status=status.HTTP_200_OK)

            serializer = UserSerializer(user, many=False)
            token = Token.objects.get(user=user)
            message = {'message': 'LOGGED_IN',
                       'user': serializer.data, 'token': token.key}
            return Response(message, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        print(request.data)

        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        first_name = request.data['first_name']
        last_name = request.data['last_name']

        if not username or not password or not email or not last_name:
            message = {'message': "Please Enter All Valid Fields"}
            return Response(message, status=status.HTTP_200_OK)

        search_username = User.objects.filter(username=username)

        if search_username:
            message = {'message': "Username Already Exists"}
            return Response(message, status=status.HTTP_200_OK)

        if len(password) < 8:
            message = {'message': "Password Must Be Longer Than 8 Characters"}
            return Response(message, status=status.HTTP_200_OK)

        if "@" not in email or ".com" not in email:
            message = {'message': "Enter A Valid Email"}
            return Response(message, status=status.HTTP_200_OK)

        user = User.objects.create_user(
            username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        serializer = UserSerializer(user, many=False)
        token = Token.objects.create(user=user)
        message = {'message': "User Created",
                   'user': serializer.data, 'token': token.key}
        return Response(message, status=status.HTTP_200_OK)

    @action(detail=False, methods=['PUT'])
    def change_password(self, request, pk='username'):
        password = request.data['password']
        username = request.data['username']

        if len(password) < 8:
            message = {'message': "Password Must Be Longer Than 8 Characters"}
            return Response(message, status=status.HTTP_200_OK)

        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
        token = Token.objects.get(user=user)
        message = {'message': "Password Successfully Changed",
                   'token': token.key}
        return Response(message, status=status.HTTP_200_OK)


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk='title'):
        # print(request.data['stars'])
        if 'stars' in request.data:

            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            # user = User.objects.get(id=1)
            print(movie.title)
            print(user.groups)

            try:
                rating = Rating.objects.get(user=user.id, movie=movie.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating Updated',
                            'response': serializer.data, 'user': user.username}
                return Response(response, status=status.HTTP_200_OK)
                ############################################################
                ###################### VIDEO 36 ###########################
                ############################################################
            except:
                rating = Rating.objects.create(
                    user=user, movie=movie, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating Created',
                            'response': serializer.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {'message': 'you need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        response = {'message': 'You cannot UPDATE ratings like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'You cannot CREATE ratings like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
