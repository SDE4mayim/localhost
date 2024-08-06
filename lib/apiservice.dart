import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<Authentication> fetchUser(String username, String password) async {
  final response = await http.post(
    Uri.parse('http://10.0.2.2:8070/api/auth/login'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'user_name': username,
      'password' : password,
    }),
  );
  final responseJson = jsonDecode(response.body);
  if (response.statusCode == 200 || response.statusCode == 500 ) {
    // If the server did return a 201 CREATED response,
    // then parse the JSON.
    return Authentication.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 201 CREATED response,
    // then throw an exception.

    throw Exception('Error: 404');
  }
}

class Authentication {
  final String userId;
  final String message;
  final String token;

  const Authentication({
    required this.userId,
    required this.message,
    required this.token,
  });

  factory Authentication.fromJson(Map<String, dynamic> json) {
    return Authentication(
      userId: json['username'].toString(),
      message: json['message'].toString(),
      token: json['token'].toString(),
    );
  }
}










