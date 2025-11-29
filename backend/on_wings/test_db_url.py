import dj_database_url
import pprint

# Simulate a Supabase URL with options
url = "postgres://user:pass@host:6543/db?options=project%3Dsupa-project-id"

print(f"Testing URL: {url}")
config = dj_database_url.parse(url)
print("Parsed config:")
pprint.pprint(config)
