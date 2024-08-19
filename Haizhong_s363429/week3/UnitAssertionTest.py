import unittest

def add(x, y):
    return x + y

class TestNumber(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(3, 2), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(2, 4), 6)

if __name__ == '__main__':
    unittest.main()
