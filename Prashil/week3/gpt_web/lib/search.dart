import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Search App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SearchPage(),
    );
  }
}

class SearchPage extends StatefulWidget {
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  bool isAdvancedSearch = false;
  String? promptSearch;
  String? selectedBudget;
  String? selectedTeamSize;
  String? selectedCompanySize;
  String _response = '';
  final TextEditingController _controller = TextEditingController();

  Future<void> _sendMessage() async {
    final String message = _controller.text;
    if (message.isEmpty) {
      return;
    }

    const String prompt =
        '''I will provide you a user input. The user will be describing their needs for a cloud testing provider. The following are the metrics to rank cloud testing service providers.
        Setup time: Duration to configure and prepare the testing environment.
        Tests per period: Total test cases / total time taken; measures efficiency.
        Ease of use: User-friendliness based on feedback and experience.
        Cost: Total expense, including hidden costs.
        Features: Range and quality of functionalities (integration, analytics, automation).
        
        Can you extract the metrics from the user's input and assign a rank from 1-5 for every single metric depending on the user's prompt? Don't need explanations just ranks The following is the users' prompt:''';

    // Replace with your OpenAI API key
    const String apiKey =
        'sk-L8uJwocC1CHLHcKkRdnDgciOuGT34U2oI4IIiXyoYDT3BlbkFJms-ghW_wMHq4aEOYMyE4SRRdmz1WJBTFR1xlnlf7MA';
    const String apiUrl = 'https://api.openai.com/v1/chat/completions';

    final initialResponse = await http.post(
      Uri.parse(apiUrl),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $apiKey',
      },
      body: json.encode({
        'model': 'gpt-3.5-turbo',
        'messages': [
          {'role': 'system', 'content': 'You are a helpful assistant.'},
          {'role': 'user', 'content': "$prompt\n$message"},
        ],
        'max_tokens': 100,
      }),
    );

    if (initialResponse.statusCode == 200) {
      final Map<String, dynamic> data = json.decode(initialResponse.body);
      final String result = data['choices'][0]['message']['content'];
      print(data['choices']);
      print(result);
      setState(() {
        _response = result;
      });
    } else {
      print(initialResponse.body);
      setState(() {
        _response = 'Error: ${initialResponse.reasonPhrase}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Search App'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _controller,
              onChanged: (value) {
                setState(() {
                  promptSearch = value;
                });
              },
              decoration: const InputDecoration(
                labelText: 'Prompt Search',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Advanced Search'),
                Switch(
                  value: isAdvancedSearch,
                  onChanged: (value) {
                    setState(() {
                      isAdvancedSearch = value;
                    });
                  },
                ),
              ],
            ),
            if (isAdvancedSearch) ...[
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Budget',
                  border: OutlineInputBorder(),
                ),
                value: selectedBudget,
                items: const [
                  DropdownMenuItem(
                      value: 'under_2000', child: Text('Under \$2000')),
                  DropdownMenuItem(
                      value: '2000-10000', child: Text('\$2000 - \$10000')),
                  DropdownMenuItem(
                      value: 'over_10000', child: Text('Over \$10000')),
                ],
                onChanged: (value) {
                  setState(() {
                    selectedBudget = value;
                  });
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Team Size',
                  border: OutlineInputBorder(),
                ),
                value: selectedTeamSize,
                items: const [
                  DropdownMenuItem(
                      value: 'less_than_5', child: Text('Less than 5')),
                  DropdownMenuItem(value: '5-10', child: Text('5-10')),
                  DropdownMenuItem(
                      value: 'more_than_10', child: Text('More than 10')),
                ],
                onChanged: (value) {
                  setState(() {
                    selectedTeamSize = value;
                  });
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Company Size',
                  border: OutlineInputBorder(),
                ),
                value: selectedCompanySize,
                items: const [
                  DropdownMenuItem(value: 'startup', child: Text('Startup')),
                  DropdownMenuItem(value: 'mid_size', child: Text('Mid Size')),
                  DropdownMenuItem(
                      value: 'enterprise', child: Text('Enterprise')),
                ],
                onChanged: (value) {
                  setState(() {
                    selectedCompanySize = value;
                  });
                },
              ),
            ],
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: _sendMessage,
                child: const Text('Search'),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Response:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: SingleChildScrollView(
                child: Text(
                  _response,
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
