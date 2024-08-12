import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TodoModel(),
      child: MaterialApp(
        title: 'Flutter To-Do App',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: TodoListScreen(),
      ),
    );
  }
}

class TodoModel extends ChangeNotifier {
  final List<TodoItem> _items = [];

  List<TodoItem> get items => _items;

  void addItem(String task) {
    _items.add(TodoItem(task));
    notifyListeners();
  }

  void toggleItemDone(int index) {
    _items[index].toggleDone();
    notifyListeners();
  }

  void removeItem(int index) {
    _items.removeAt(index);
    notifyListeners();
  }
}

class TodoItem {
  String task;
  bool isDone;

  TodoItem(this.task) : isDone = false;

  void toggleDone() {
    isDone = !isDone;
  }
}

class TodoListScreen extends StatelessWidget {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('To-Do List'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      labelText: 'Enter a task',
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.add),
                  onPressed: () {
                    final task = _controller.text;
                    if (task.isNotEmpty) {
                      Provider.of<TodoModel>(context, listen: false)
                          .addItem(task);
                      _controller.clear();
                    }
                  },
                ),
              ],
            ),
          ),
          Expanded(
            child: Consumer<TodoModel>(
              builder: (context, todoModel, child) {
                return ListView.builder(
                  itemCount: todoModel.items.length,
                  itemBuilder: (context, index) {
                    final item = todoModel.items[index];
                    return ListTile(
                      title: Text(
                        item.task,
                        style: TextStyle(
                          decoration:
                              item.isDone ? TextDecoration.lineThrough : null,
                        ),
                      ),
                      leading: Checkbox(
                        value: item.isDone,
                        onChanged: (bool? value) {
                          todoModel.toggleItemDone(index);
                        },
                      ),
                      trailing: IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () {
                          todoModel.removeItem(index);
                        },
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
