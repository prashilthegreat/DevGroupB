import 'package:flutter/material.dart';
import 'advanced_search_widget.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SearchPage extends StatefulWidget {
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  bool isAdvancedSearch = false;
  bool isLoading = false;
  String? selectedBudget;
  String? selectedTeamSize;
  String? selectedCompanySize;
  String? selectedFinishTime;
  String _response = '';
  final TextEditingController _controller = TextEditingController();

  Future<void> _sendMessage() async {
    String prompt;
    String? prompt2;

    if (isAdvancedSearch) {
      prompt2 =
          '''I have a ${_getCompanySize(selectedCompanySize)}, with ${_getTeamSize(selectedTeamSize)} members and a budget of ${_getBudget(selectedBudget)}. I have ${_getFinishTime(selectedFinishTime)} to finish testing.''';
    }
    final String message = _controller.text;
    if (message.isEmpty) {
      return;
    }
    prompt =
        '''I will provide you a user input. The user will be describing their needs for a cloud testing provider. The following are the metrics to rank cloud testing service providers.
          Setup time: Duration to configure and prepare the testing environment. Lower the number of team members, higher the priority of setup time
          Tests per period: Total test cases / total time taken; measures efficiency. Based on finish time, team members
          Ease of use: User-friendliness based on feedback and experience. Based on company size and team members
          Cost: Total expense, including hidden costs. Lower the budget, higher the priority for cost
          Features: Range and quality of functionalities (integration, analytics, automation).
          
          Can you extract the metrics from the user's input and assign a rank from 1-5 for every single metric depending on the user's prompt? Don't need explanations, just ranks. The following is the user's prompt: ${isAdvancedSearch ? prompt2 : message}''';

    setState(() {
      isLoading = true;
    });

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
          {'role': 'user', 'content': prompt},
        ],
        'max_tokens': 100,
      }),
    );

    setState(() {
      isLoading = false;
      if (initialResponse.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(initialResponse.body);
        _response = data['choices'][0]['message']['content'];
      } else {
        _response = 'Error: ${initialResponse.reasonPhrase}';
      }
    });
  }

  String _getBudget(String? budget) {
    switch (budget) {
      case 'under_2000':
        return 'under \$2000';
      case '2000-10000':
        return '\$2000 - \$10000';
      case 'over_10000':
        return 'over \$10000';
      default:
        return 'an unknown budget';
    }
  }

  String _getTeamSize(String? teamSize) {
    switch (teamSize) {
      case 'less_than_5':
        return 'less than 5';
      case '5-10':
        return '5-10';
      case 'more_than_10':
        return 'more than 10';
      default:
        return 'an unknown number of';
    }
  }

  String _getCompanySize(String? companySize) {
    switch (companySize) {
      case 'startup':
        return 'startup';
      case 'mid_size':
        return 'mid-size company';
      case 'enterprise':
        return 'enterprise';
      default:
        return 'an unknown company size';
    }
  }

  String _getFinishTime(String? finishTime) {
    switch (finishTime) {
      case 'less_than_a_month':
        return 'less than a month';
      case '1-6_months':
        return '1-6 months';
      case 'more_than_6_months':
        return 'more than 6 months';
      default:
        return 'an unknown amount of time';
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
                setState(() {});
              },
              decoration: const InputDecoration(
                labelText: 'Prompt Search',
                border: OutlineInputBorder(),
              ),
              enabled: !isAdvancedSearch,
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
            if (isAdvancedSearch)
              AdvancedSearchWidget(
                selectedBudget: selectedBudget,
                selectedTeamSize: selectedTeamSize,
                selectedCompanySize: selectedCompanySize,
                selectedFinishTime: selectedFinishTime,
                onBudgetChanged: (value) {
                  setState(() {
                    selectedBudget = value;
                  });
                },
                onTeamSizeChanged: (value) {
                  setState(() {
                    selectedTeamSize = value;
                  });
                },
                onCompanySizeChanged: (value) {
                  setState(() {
                    selectedCompanySize = value;
                  });
                },
                onFinishTimeChanged: (value) {
                  setState(() {
                    selectedFinishTime = value;
                  });
                },
              ),
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton(
                onPressed: _sendMessage,
                child: const Text('Search'),
              ),
            ),
            const SizedBox(height: 24),
            if (isLoading)
              const Center(
                child: CircularProgressIndicator(),
              )
            else ...[
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
          ],
        ),
      ),
    );
  }
}
