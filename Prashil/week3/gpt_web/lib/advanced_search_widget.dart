import 'package:flutter/material.dart';

class AdvancedSearchWidget extends StatelessWidget {
  final String? selectedBudget;
  final String? selectedTeamSize;
  final String? selectedCompanySize;
  final String? selectedFinishTime;
  final ValueChanged<String?> onBudgetChanged;
  final ValueChanged<String?> onTeamSizeChanged;
  final ValueChanged<String?> onCompanySizeChanged;
  final ValueChanged<String?> onFinishTimeChanged;

  const AdvancedSearchWidget({
    Key? key,
    this.selectedBudget,
    this.selectedTeamSize,
    this.selectedCompanySize,
    this.selectedFinishTime,
    required this.onBudgetChanged,
    required this.onTeamSizeChanged,
    required this.onCompanySizeChanged,
    required this.onFinishTimeChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 16),
        DropdownButtonFormField<String>(
          decoration: const InputDecoration(
            labelText: 'Budget',
            border: OutlineInputBorder(),
          ),
          value: selectedBudget,
          items: const [
            DropdownMenuItem(value: 'under_2000', child: Text('Under \$2000')),
            DropdownMenuItem(
                value: '2000-10000', child: Text('\$2000 - \$10000')),
            DropdownMenuItem(value: 'over_10000', child: Text('Over \$10000')),
          ],
          onChanged: onBudgetChanged,
        ),
        const SizedBox(height: 16),
        DropdownButtonFormField<String>(
          decoration: const InputDecoration(
            labelText: 'Team Size',
            border: OutlineInputBorder(),
          ),
          value: selectedTeamSize,
          items: const [
            DropdownMenuItem(value: 'less_than_5', child: Text('Less than 5')),
            DropdownMenuItem(value: '5-10', child: Text('5-10')),
            DropdownMenuItem(
                value: 'more_than_10', child: Text('More than 10')),
          ],
          onChanged: onTeamSizeChanged,
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
            DropdownMenuItem(value: 'enterprise', child: Text('Enterprise')),
          ],
          onChanged: onCompanySizeChanged,
        ),
        const SizedBox(height: 16),
        DropdownButtonFormField<String>(
          decoration: const InputDecoration(
            labelText: 'Finish Time',
            border: OutlineInputBorder(),
          ),
          value: selectedFinishTime,
          items: const [
            DropdownMenuItem(
                value: 'less_than_a_month', child: Text('Less than a month')),
            DropdownMenuItem(value: '1-6_months', child: Text('1-6 months')),
            DropdownMenuItem(
                value: 'more_than_6_months', child: Text('More than 6 months')),
          ],
          onChanged: onFinishTimeChanged,
        ),
      ],
    );
  }
}
