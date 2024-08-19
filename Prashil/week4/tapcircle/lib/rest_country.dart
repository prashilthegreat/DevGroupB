import 'dart:convert'; // For JSON decoding
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart'; // For launching URLs

void main() {
  runApp(CountriesApp());
}

class CountriesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Countries Info',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CountriesListScreen(),
    );
  }
}

class CountriesListScreen extends StatefulWidget {
  @override
  _CountriesListScreenState createState() => _CountriesListScreenState();
}

class _CountriesListScreenState extends State<CountriesListScreen> {
  List<dynamic> countries = [];
  bool isLoading = true;
  bool isAscending = true;
  String sortingCriterion = 'Population'; // Default sorting criterion

  @override
  void initState() {
    super.initState();
    fetchCountries();
  }

  Future<void> fetchCountries() async {
    final response =
        await http.get(Uri.parse('https://restcountries.com/v3.1/all'));

    if (response.statusCode == 200) {
      setState(() {
        countries = jsonDecode(response.body);
        _sortCountries(); // Initial sorting
        isLoading = false;
      });
    } else {
      throw Exception('Failed to load countries');
    }
  }

  void _sortCountries() {
    setState(() {
      countries.sort((a, b) {
        if (sortingCriterion == 'Population') {
          int populationA = a['population'] ?? 0;
          int populationB = b['population'] ?? 0;
          return isAscending
              ? populationA.compareTo(populationB)
              : populationB.compareTo(populationA);
        } else if (sortingCriterion == 'Area') {
          double areaA = a['area']?.toDouble() ?? 0.0;
          double areaB = b['area']?.toDouble() ?? 0.0;
          return isAscending ? areaA.compareTo(areaB) : areaB.compareTo(areaA);
        }
        return 0;
      });
    });
  }

  void _showCountryDialog(BuildContext context, dynamic country) {
    final countryName = country['name']['common'];
    final officialName = country['name']['official'] ?? 'N/A';
    final population = country['population'].toString();
    final capitalCity =
        country['capital'] != null && country['capital'].isNotEmpty
            ? country['capital'][0]
            : 'N/A';
    final region = country['region'] ?? 'N/A';
    final subregion = country['subregion'] ?? 'N/A';
    final area = country['area'].toString();
    final flagUrl = country['flags']['png'];
    final googleSearchUrl = 'https://www.google.com/search?q=$countryName';

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(countryName),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Image.network(
                  flagUrl,
                  width: 100,
                  height: 100,
                  fit: BoxFit.fill,
                ),
                const SizedBox(height: 10),
                Text('Official Name: $officialName'),
                Text('Capital: $capitalCity'),
                Text('Population: $population'),
                Text('Region: $region'),
                Text('Subregion: $subregion'),
                Text('Area: $area sq.km'),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Close'),
            ),
            TextButton(
              onPressed: () async {
                if (await canLaunch(googleSearchUrl)) {
                  await launch(googleSearchUrl);
                }
              },
              child: Text('Search in Google'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Countries Info'),
        actions: [
          DropdownButton<String>(
            value: sortingCriterion,
            icon: Icon(Icons.sort, color: Colors.white),
            dropdownColor: Colors.blue,
            underline: SizedBox(), // Removes the underline from the dropdown
            items: <String>['Population', 'Area'].map((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value, style: TextStyle(color: Colors.black)),
              );
            }).toList(),
            onChanged: (String? newValue) {
              setState(() {
                sortingCriterion = newValue!;
                _sortCountries(); // Sort again when changing the criterion
              });
            },
          ),
          IconButton(
            icon: Icon(isAscending ? Icons.arrow_upward : Icons.arrow_downward),
            onPressed: () {
              setState(() {
                isAscending = !isAscending;
                _sortCountries(); // Sort again when changing the order
              });
            },
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: countries.length,
              itemBuilder: (context, index) {
                final country = countries[index];
                final countryName = country['name']['common'];
                final population = country['population'].toString();
                final flagUrl = country['flags']['png'];
                final capitalCity =
                    country['capital'] != null && country['capital'].isNotEmpty
                        ? country['capital'][0]
                        : 'N/A';
                final area = country['area']?.toString() ?? 'N/A';

                return ListTile(
                  leading: Image.network(
                    flagUrl,
                    width: 70,
                    height: 50,
                    fit: BoxFit.cover,
                  ),
                  title: Text(countryName),
                  subtitle: Text(
                      'Population: $population\nArea: $area sq.km\nCapital: $capitalCity'),
                  onTap: () {
                    _showCountryDialog(context, country);
                  },
                );
              },
            ),
    );
  }
}
