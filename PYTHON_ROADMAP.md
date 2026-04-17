# Python Learning Roadmap

## Phase 1: Foundations (Day 1–30)

### Week 1: Basics
- [ ] Installing Python 3.x, setting up VS Code with Python extension
- [ ] `print()`, `input()`, comments
- [ ] Variables and data types: `int`, `float`, `str`, `bool`
- [ ] Type conversion: `int()`, `float()`, `str()`
- [ ] f-strings, `.format()`, string concatenation
- [ ] Operators: arithmetic, comparison, logical, assignment, membership (`in`, `not in`)
- [ ] Conditionals: `if`, `elif`, `else`, ternary expression
- [ ] Loops: `for`, `while`, `break`, `continue`, `pass`
- [ ] `range()`, `enumerate()`, `zip()`

### Week 2: Functions & Data Structures
- [ ] Functions: `def`, `return`, parameters, default values
- [ ] `*args` and `**kwargs`
- [ ] Lambda functions: `lambda`
- [ ] `map()`, `filter()`, `reduce()`
- [ ] Lists: creation, indexing, slicing, methods
- [ ] List comprehensions
- [ ] Tuples: creation, unpacking, immutability
- [ ] Strings: methods, slicing, immutability

### Week 3: Collections
- [ ] Dictionaries: creation, methods, iteration, nesting
- [ ] Dictionary comprehensions
- [ ] Sets: creation, operations (union, intersection, difference)
- [ ] `collections` module: `Counter`, `defaultdict`, `deque`, `OrderedDict`
- [ ] Nested data structures

### Week 4: More Fundamentals
- [ ] Recursion in Python
- [ ] `sys.setrecursionlimit()`
- [ ] Sorting: `sorted()`, `.sort()`, `key` parameter, `reverse`
- [ ] Custom sorting with `lambda`
- [ ] String manipulation deep dive
- [ ] List comprehensions (advanced with conditions)

---

## Phase 2: Intermediate (Day 31–60)

### Week 5-6: OOP
- [ ] Classes and objects, `__init__`, `self`
- [ ] Instance variables vs class variables
- [ ] Methods: instance, class (`@classmethod`), static (`@staticmethod`)
- [ ] Properties: `@property`, getter/setter
- [ ] `__str__`, `__repr__`
- [ ] Inheritance: single, multiple
- [ ] Method Resolution Order (MRO)
- [ ] `super()`
- [ ] Polymorphism, method overriding
- [ ] Abstract Base Classes (`abc` module)
- [ ] Dunder/magic methods: `__len__`, `__getitem__`, `__eq__`, `__lt__`
- [ ] Encapsulation: name mangling (`_`, `__`)

### Week 7-8: Advanced Features
- [ ] File I/O: `open()`, `read()`, `write()`, `with` statement
- [ ] CSV file handling
- [ ] JSON file handling
- [ ] Exception handling: `try`, `except`, `finally`, `else`
- [ ] Custom exceptions
- [ ] Decorators: basic, with arguments, `functools.wraps`
- [ ] Generators: `yield`, generator expressions
- [ ] Iterators: `__iter__`, `__next__`
- [ ] `itertools`: permutations, combinations, product, chain
- [ ] Modules and packages
- [ ] Virtual environments: `venv`
- [ ] `pip` and requirements.txt

---

## Phase 3: Advanced (Day 61–90)

### Week 9-10: Advanced Python
- [ ] Regular expressions: `re` module
- [ ] `match()`, `search()`, `findall()`, `sub()`, `compile()`
- [ ] Advanced OOP: mixins, multiple inheritance patterns
- [ ] Design patterns: Singleton, Factory, Observer
- [ ] Context managers: `__enter__`, `__exit__`, `contextlib`
- [ ] Type hints and `typing` module
- [ ] `dataclasses`

### Week 11-13: Concurrency & Project
- [ ] Threading: `threading` module
- [ ] Multiprocessing: `multiprocessing` module
- [ ] `concurrent.futures`
- [ ] List/dict/set comprehensions mastery
- [ ] `functools`: `partial`, `lru_cache`
- [ ] Unit testing: `unittest`, `pytest` basics
- [ ] **Project:** Build a complete Python application

---

## Key Python Programs to Build

1. Calculator with error handling
2. Number guessing game
3. Contact book (dictionary-based)
4. Student grade manager
5. Bank account system (OOP)
6. File-based todo list app
7. CSV data analyzer
8. Web scraper (using `requests` + `BeautifulSoup`)
9. CLI tool with `argparse`
10. Final project (your choice)

---

## Common Python Interview Topics
- Mutable vs immutable types
- List vs tuple vs set vs dict — when to use?
- `is` vs `==`
- Shallow copy vs deep copy
- GIL (Global Interpreter Lock)
- Decorators and closures
- Generators vs iterators
- `*args` vs `**kwargs`
- List comprehension vs map/filter
- `__init__` vs `__new__`
