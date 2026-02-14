import sys
try:
    import rest_framework
    print(f"Successfully imported rest_framework version: {rest_framework.VERSION}")
    print(f"Location: {rest_framework.__file__}")
except ImportError as e:
    print(f"Error importing rest_framework: {e}")
    sys.exit(1)
